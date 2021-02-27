// import express from 'express';
const express = require('express');
let router = express.Router();

const authenticateOwner = require('../middleware/authenticateOwner');
const favoritesController = require('../controllers/FavoritesController');

const jwtMiddleware = require('express-jwt');
const jwtSecret = require('../config/secrets').jwtSecret;
// como se configuro que las peticiones get no requieren jwt, 
// se agregara la verificación de manera individual
router.route('/')
    .post(favoritesController.create)
    .get(
        jwtMiddleware({ secret: jwtSecret, algorithms: ['HS256'] }),
        favoritesController.index
    );

router.route('/:id')
    .delete(favoritesController.find, authenticateOwner, favoritesController.destroy)

module.exports = router;