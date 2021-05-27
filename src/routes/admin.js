const express = require('express');
const AuthController = require('../controllers/AuthController');
const {noLogged, logged} = require('../helpers/auth');

const routes = express.Router();

routes.get('/admin', logged, AuthController.admin);


module.exports = routes;