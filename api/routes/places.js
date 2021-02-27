//const { Router } = require("express");
const express = require("express");
let router = express.Router();

const placesController = require('../controllers/PlacesController');

const authenticateOwner = require('../middleware/authenticateOwner');

router.route('/')
    // obtener todos los sitios
    .get(placesController.index)

    // crear un sitio
    .post(
        placesController.multerMiddleware(),
        placesController.create,
        placesController.saveImage
    );

router.route('/:id')
    // buscar un sitio
    // :comodines
    .get(placesController.find, placesController.show)

    // actualizar unh registro
    .put(placesController.find, authenticateOwner, placesController.update)

    // eliminar un sitio
    .delete(placesController.find, authenticateOwner, placesController.destroy);

module.exports = router;