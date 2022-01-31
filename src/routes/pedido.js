const express = require('express');
const PedidoController = require('../controllers/PedidoController');
const {noLogged, logged} = require('../helpers/auth');
const {upload} = require('../helpers/uploadFile');

const routes = express.Router();

routes.get('/get-pedidos', logged, PedidoController.index);


routes.get('/get-clientes', logged, PedidoController.indexClientes);
routes.get('/get-clientes/:nit', logged, PedidoController.indexClientes);
// routes.get('/get-pedidos', logged, PedidoController.index);
routes.get('/create-cliente', logged, PedidoController.createCliente);
routes.post('/store-cliente', logged, PedidoController.storeCliente);

routes.get('/get-platos-cliente/:id', logged, PedidoController.getPlatosCliente);
routes.post('/store-pedido', logged, PedidoController.store);

routes.get('/get-factura-pedido/:id', logged, PedidoController.getFacturaPedido);




module.exports = routes;