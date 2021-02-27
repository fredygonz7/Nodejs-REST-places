// import express from 'express';
const express = require('express');
let router = express.Router();

const authenticateOwner = require('../middleware/authenticateOwner');
const favoritesController = require('../controllers/FavoritesController');

router.route('/')
    .post(favoritesController.create)
    // .get(favoritesController.index);

router.route('/:id')
    .delete(favoritesController.find, authenticateOwner, favoritesController.destroy)

module.exports = router;