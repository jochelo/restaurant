const Usuario = require('../models/Usuario');
const moment = require('moment');

const UsuarioController = {};

UsuarioController.index = async (req, res) => {
    const usuarios = await Usuario.get();
    // res.render('', {usuarios});
}

UsuarioController.create = async (req, res) => {
    res.render('usuario/usuario-create');
}

UsuarioController.store = async (req, res) => {
    const data = req.body;
    // data.fecha = moment().format('YYYY-MM-DD HH:mm:ss');
    try {
        await Usuario.create(data);
        res.redirect('/');
    } catch (e) {
        console.error(e);
    }
}

module.exports = UsuarioController;