const express = require('express');
const PlatoController = require('../controllers/PlatoController');
const {noLogged, logged} = require('../helpers/auth');
const {upload} = require('../helpers/uploadFile');

const routes = express.Router();

routes.get('/get-platos', logged, PlatoController.index);
routes.get('/create-plato', logged, PlatoController.create);
routes.post('/store-plato', [logged, upload('foto')], PlatoController.store);
routes.get('/edit-plato/:id', logged, PlatoController.edit);
routes.post('/update-plato/:id', [logged, upload('foto')], PlatoController.update);
routes.get('/delete-plato/:id', logged, PlatoController.delete);

module.exports = routes;