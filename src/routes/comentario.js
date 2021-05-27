const express = require('express');
const ComentarioController = require('../controllers/ComentarioController');

const routes = express.Router();

routes.post('/store-comentario', ComentarioController.store);

module.exports = routes;