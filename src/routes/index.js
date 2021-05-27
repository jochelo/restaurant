const express = require('express');
const AppController = require('../controllers/AppController');
const ComentarioController = require('../controllers/ComentarioController');
const {noLogged, logged} = require('../helpers/auth');

const routes = express.Router();

routes.get('/', noLogged, AppController.index);
routes.get('/comments', noLogged, ComentarioController.index);
routes.get('/login', noLogged, AppController.login);

module.exports = routes;