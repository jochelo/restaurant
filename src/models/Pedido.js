const db = require('../db');
const Pedido = {};

Pedido.get = async () => {
    return await db.query(`select p.id, c.NIT as 'nit', c.nombre as 'cliente', fecha_pedido, total from pedidos p, clientes c where p.cliente_id=c.id`);
};

Pedido.getClientes = async (nit) => {
    return await db.query(`select * from clientes where NIT like '%${nit}%'`);
};

Pedido.getPedidoPlatos = async (id) => {
    return await db.query(`select pp.id, nombre, precio, cantidad, sub_total, pedido_id from pedido_platos pp, platos p where pedido_id=? and pp.plato_id=p.id`,[id]);
};


Pedido.findCliente = async (id) => {
    return await db.query(`select * from clientes where id=?`, [id]);
};

Pedido.find = async (id) => {
    return await db.query(`select * from pedidos where id=?`, [id]);
};

Pedido.findLastId = async () => {
    return await db.query(`select max(id) as "id" from pedidos`);
};

Pedido.create = async (data) => {

    try {
        const insertar = await db.query(`insert into pedidos set ?`, [data]);
        if (insertar === 'error') {
            console.error('ERROR');
        } else {
            return insertar;
        }
    } catch (e) {
        console.error(e);
    }
};

Pedido.createPedidoPlato = async (data) => {
    await db.query(`insert into pedido_platos set ?`, [data]);
}

Pedido.createCliente = async (data) => {

    try {
        const insertar = await db.query(`insert into clientes set ?`, [data]);
        if (insertar === 'error') {
            console.error('ERROR');
        } else {
            return insertar;
        }
    } catch (e) {
        console.error(e);
    }
};

Pedido.update = async (id, data) => {
    try {
        const actualizar = await db.query(`update platos set ? where id=?`, [data, id]);
        if (actualizar === 'error') {
            console.error('ERROR');
        } else {
            return actualizar;
        }
    } catch (e) {
        console.error(e);
    }
};

Pedido.delete = async (id) => {
    return await db.query(`delete from platos where id=?`, [id]);
};

module.exports = Pedido;