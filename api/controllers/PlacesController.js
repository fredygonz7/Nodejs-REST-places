/**
 * Controlador Places
 * 
 */

// importar el modelo
const Place = require('../models/Place');

// obtener todos los sitios
function index(req, res) {
    // Place.find({})
    Place.paginate({}, { page: req.query.page || 1, limit: 5, sort: { '_id':1} })
        .then(docs => {
            res.json(docs);
        }).catch(err => {
            console.log(err);
            res.json(err);
        });
}
// crear un sitio
function create(req, res) {
    Place.create({
        // title: "Abarrotes El Ajonjoli",
        // description: "Lorem Ipsum",
        // acceptsCreditCard: true,
        // openHour: 6,
        // closeHour: 18
        title: req.body.title,
        description: req.body.description,
        acceptsCreditCard: req.body.acceptsCreditCard,
        openHour: req.body.openHour,
        closeHour: req.body.closeHour
    }).then(doc => {
        res.json(doc)
    }).catch(err => {
        console.log(err);
        res.json(err);
    });
}

// buscar un sitio
function show(req, res) {
    Place.findById(req.params.id)
        // Place.findOne({})
        .then(doc => {
            res.json(doc);
        }).catch(err => {
            console.log(err);
            res.json(err);
        });
}
// actualizar unh registro
function update(req, res) {
    // Place.findById(req.params.id)
    //ejecuta los "hups"
    //   .then(doc => {
    //     doc.title = req.body.title;
    //     doc.description = req.body.description;
    //     //...
    //     doc.save();
    //   }).catch(err => {
    //     console.log(err);
    //     res.json(err);
    //   });
    let attributes = [
        'title', 'description', 'acceptsCreditCard',
        'openHour', 'closeHour'];
    let placeParams = {};

    attributes.forEach(attr => {
        if (Object.prototype.hasOwnProperty.call(req.body, attr))
            placeParams[attr] = req.body[attr];
    });

    // Place.updateOne({ '_id': req.params.id },
    // Place.findOneAndUpdate({ '_id': req.params.id },
    Place.findByIdAndUpdate(req.params.id,
        placeParams, { new: true }
    ).then(doc => {
        res.json(doc);
    }).catch(err => {
        console.log(err);
        res.json(err);
    });
}
// eliminar un sitio
function destroy(req, res) {
    Place.findByIdAndRemove(req.params.id)
        .then(doc => {
            res.json(doc); // res.json({});
        }).catch(err => {
            console.log(err);
            res.json(err);
        });
}
// index : index
module.exports = { index, create, show, update, destroy };