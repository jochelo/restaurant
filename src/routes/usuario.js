const express = require('express');
const UsuarioController = require('../controllers/UsuarioController');
const {noLogged, logged} = require('../helpers/auth');

const routes = express.Router();

routes.get('/create-usuario', logged, UsuarioController.create);

routes.post('/store-usuario', logged, UsuarioController.store);

module.exports = routes;