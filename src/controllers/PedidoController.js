const Pedido = require('../models/Pedido');
const Plato = require('../models/Plato');
const moment = require('moment');
const PDF = require('pdfkit-construct');
const {dateLit} = require('../helpers/handlebars');

const PedidoController = {};

PedidoController.indexClientes = async (req, res) => {
    const nit = req.params.nit;
    let cliente;
    if (nit === undefined) {
        clientes = await Pedido.getClientes('');
    } else {
        clientes = await Pedido.getClientes(nit);
    }
    res.render('pedido/cliente-index', {clientes});
}

PedidoController.index = async (req, res) => {
    const pedidos = await Pedido.get();
    res.render('pedido/pedido-index', {pedidos});
}

PedidoController.createCliente = async (req, res) => {
    res.render('pedido/cliente-create');
}

PedidoController.create = async (req, res) => {
    res.render('plato/plato-create');
}

PedidoController.getPlatosCliente = async (req, res) => {
    const platos = await Plato.get();
    const cliente = await Pedido.findCliente(req.params.id);
    res.render('pedido/pedido-create', {platos, cliente: cliente[0]});
}

PedidoController.storeCliente = async (req, res) => {
    const data = {
        nombre: req.body.nombre,
        NIT: req.body.nit
    }
    console.log(data);
    try {
        await Pedido.createCliente(data);
        res.redirect('/get-clientes');
    } catch (e) {
        console.error(e);
    }
}

PedidoController.store = async (req, res) => {

    req.body.pedidos = JSON.parse(req.body.pedidos);
    console.log(req.body);
    let total = 0;
    req.body.pedidos.map((pedido) => {
        total += pedido.subtotal;
    });

    const fecha = moment().format('YYYY-MM-DD HH:mm:ss');
    const data = {
        fecha_pedido: fecha,
        total,
        cliente_id: req.body.cliente_id
    }
    await Pedido.create(data);

    const id = await Pedido.findLastId();

    req.body.pedidos.map(async (pedido) => {
        const registro = {
            cantidad: pedido.cantidad,
            sub_total: pedido.subtotal,
            pedido_id: id[0].id,
            plato_id: pedido.id
        };
        await Pedido.createPedidoPlato(registro);
    });

    res.redirect('/get-pedidos');
}

PedidoController.edit = async (req, res) => {
    const plato = await Pedido.find(req.params.id);
    res.render('plato/plato-edit', {plato: plato[0]});
}

PedidoController.update = async (req, res) => {
    let data;
    if (req.file) {
        data = {
            nombre: req.body.nombre,
            precio: req.body.precio,
            foto: req.file.filename,
            descripcion: req.body.descripcion
        };
    } else {
        data = {
            nombre: req.body.nombre,
            precio: req.body.precio,
            descripcion: req.body.descripcion
        };
    }

    try {
        await Pedido.update(req.params.id, data);
        res.redirect('/get-platos');
    } catch (e) {
        console.error(e);
    }
}

PedidoController.delete = async (req, res) => {
    const plato = await Pedido.delete(req.params.id);
    res.redirect('/get-platos');
}

PedidoController.getFacturaPedido = async (req, res) => {

    let pedido = await Pedido.find(req.params.id);
    pedido = pedido[0];

    let cliente = await Pedido.findCliente(pedido.cliente_id);

    cliente = cliente[0];

    const doc = new PDF({bufferPage: true});

    const filename = `Factura${Date.now()}.pdf`;

    const stream = res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-disposition': `attachment;filename=${filename}`
    });
    doc.on('data', (data) => {stream.write(data)});
    doc.on('end', () => {stream.end()});

    const platos = await Pedido.getPedidoPlatos(pedido.id);
    let count = 1;
    const registros = platos.map( (plato) => {
        const registro = {
            nro: count,
            descripcion: plato.nombre,
            precio: plato.precio,
            cantidad: plato.cantidad,
            subtotal: plato.sub_total
        }
        count++;
        return registro;
    });

    doc.setDocumentHeader({
        height: '16%'
    }, () => {
        doc.fontSize(15).text(`FACTURA ${pedido.id}`, {
            width: 420,
            align: 'center'
        });

        doc.fontSize(12);

        doc.text(`NIT: ${cliente.NIT}`, {
            width: 420,
            align: 'left'
        });
        doc.text(`Sr(a). ${cliente.nombre}`, {
            width: 420,
            align: 'left'
        });
        doc.text(`fecha: ${dateLit(pedido.fecha_pedido)}`, {
            width: 420,
            align: 'left'
        });


    });

    doc.addTable([
        {key: 'nro', label: 'Nro', align: 'left'},
        {key: 'descripcion', label: 'Descripción', align: 'left'},
        {key: 'precio', label: 'Precio Unit', align: 'left'},
        {key: 'cantidad', label: 'Cantidad', align: 'left'},
        {key: 'subtotal', label: 'Sub Total', align: 'right'},
    ], registros, {
        border: null,
        width: "fill_body",
        striped: true,
        stripedColors: ["#f6f6f6", "#908d8d"],
        cellsPadding: 10,
        marginLeft: 45,
        marginRight: 45,
        headAlign: 'left'
    });
    doc.setDocumentFooter({
        height: '60%'
    }, () => {
        doc.fontSize(15).text(`TOTAL: ${pedido.total} Bs.`, doc.footer.x + 50, doc.footer.y + 10);
    });
    doc.render();
    doc.end();
}

module.exports = PedidoController;