const { Router } = require("express");
const express = require("express");
let router = express.Router();

const PlacesController = require('../controllers/PlacesController');

router.route('/')
    // obtener todos los sitios
    .get(PlacesController.index)

    // crear un sitio
    .post(PlacesController.create);

router.route('/:id')
    // buscar un sitio
    // :comodines
    .get(PlacesController.show)

    // actualizar unh registro
    .put(PlacesController.update)

    // eliminar un sitio
    .delete(PlacesController.destroy);

module.exports = router;