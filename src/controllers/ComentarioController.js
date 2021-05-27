const Comentario = require('../models/Comentario');
const moment = require('moment');

const ComentarioController = {};

ComentarioController.index = async (req, res) => {
    const comentarios = await Comentario.get();
    res.render('comment', {comentarios});
}

ComentarioController.store = async (req, res) => {
    const data = req.body;
    data.fecha = moment().format('YYYY-MM-DD HH:mm:ss');
    try {
        await Comentario.create(data);
        res.redirect('/comments');
    } catch (e) {
        console.error(e);
    }
}

module.exports = ComentarioController;