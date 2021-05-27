const express = require('express');
const AuthController = require('../controllers/AuthController');

const routes = express.Router();

routes.post('/auth', AuthController.auth);
routes.get('/logout', AuthController.logout);

module.exports = routes;