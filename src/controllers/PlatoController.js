const Plato = require('../models/Plato');

const PlatoController = {};

PlatoController.index = async (req, res) => {
    const platos = await Plato.get();
    res.render('plato/plato-index', {platos});
}

PlatoController.create = async (req, res) => {
    res.render('plato/plato-create');
}

PlatoController.store = async (req, res) => {
    const data = {
        nombre: req.body.nombre,
        precio: req.body.precio,
        foto: req.file.filename,
        descripcion: req.body.descripcion
    };
    try {
        await Plato.create(data);
        req.toastr.success('El plato a sido registrado exitosamente');
        res.redirect('/get-platos');
    } catch (e) {
        req.toastr.error('A ocurrido un error al registrar el plato', '¡ERROR!');
        console.error(e);
    }
}

PlatoController.edit = async (req, res) => {
    const plato = await Plato.find(req.params.id);
    res.render('plato/plato-edit', {plato: plato[0]});
}

PlatoController.update = async (req, res) => {
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
        await Plato.update(req.params.id, data);
        res.redirect('/get-platos');
    } catch (e) {
        console.error(e);
    }
}

PlatoController.delete = async (req, res) => {
    const plato = await Plato.delete(req.params.id);
    req.toastr.success('El plato a sido eliminado exitosamente', 'Plato eliminado');
    res.redirect('/get-platos');
}

module.exports = PlatoController;