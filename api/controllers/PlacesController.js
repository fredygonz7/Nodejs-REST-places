/**
 * Controlador Places
 * 
 */

// importar el modelo
const Place = require('../models/Place');

// importar configuracion
const upload = require('../config/upload');
// const { single } = require('../config/upload');

// importar el modelo
const uploader = require('../models/uploader');

// Middleware para búsquedas individuales 
function find(req, res, next) {
    Place.findById(req.params.id)
        .then(place => {
            req.place = place;
            next();
        }).catch(err => {
            console.log(err);
            next(err);
        });
}

// obtener todos los sitios
function index(req, res) {
    // Place.find({})
    Place.paginate({}, { page: req.query.page || 1, limit: 5, sort: { '_id': 1 } })
        .then(docs => {
            res.json(docs);
        }).catch(err => {
            console.log(err);
            res.json(err);
        });
}
function create(req, res, next) {
    // crear un sitio
    Place.create({
        title: req.body.title,
        description: req.body.description,
        acceptsCreditCard: req.body.acceptsCreditCard,
        openHour: req.body.openHour,
        closeHour: req.body.closeHour
    }).then(doc => {
        // res.json(doc)
        req.place = doc;
        next();
    }).catch(err => {
        // console.log(err);
        // res.json(err);
        next(err);
    });
}

function show(req, res) {
    // buscar un sitio
    res.json(req.place);
    // show pasa solo hacer render del middleware
    // Place.findById(req.params.id)
    //     // Place.findOne({})
    //     .then(doc => {
    //         res.json(doc);
    //     }).catch(err => {
    //         console.log(err);
    //         res.json(err);
    //     });
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

    // Place.findByIdAndUpdate(req.params.id,
    //     placeParams, { new: true }
    //)
    req.place = Object.assign(req.place, placeParams);
    // Object.assign(target , source) 
    // copia todos las propiedades de la fuente(source) al objetivo (target) 
    req.place.save().then(doc => {
        res.json(doc);
    }).catch(err => {
        console.log(err);
        res.json(err);
    });
}
// eliminar un sitio
function destroy(req, res) {
    // Place.findByIdAndRemove(req.params.id)
    req.place.remove()
        .then(doc => {
            res.json(doc.title); // res.json({});
        }).catch(err => {
            console.log(err);
            res.json(err);
        });
}
// lee los archivos del cliente
function multerMiddleware(params) {
    // upload.single para subir un solo archivo
    // return upload.single('avatar')
    // fields permite especificar una coleccion de nombres 
    // con los que vendran los archivos que esperamos recibir
    // maxCount indica la cantidad de archivos maximos que se pueden subir por peticion
    return upload.fields([
        { name: 'avatar', maxCount: 1 },
        { name: 'cover', maxCount: 1 }
    ])
}
// mueve la imagen a la nube
function saveImage(req, res) {
    if (req.place) {
        if (req.files && req.files.avatar) {
            const path = req.files.avatar[0].path;
            // uploader(path)
            req.place.updateAvatar(path)
                .then(result => {
                    console.log(result);
                    res.json(req.place);
                }).catch(err => {
                    console.log(err);
                    res.json(err);
                })
        } else {
            res.json({
                error: 'File not found'
            });
        }
    } else {
        // en caso de que no se pueda procesar o subir la imagen
        // 422 no se pudo procesar la entidad
        res.status(422).json({
            error: req.error || 'Cloud not save place'
        });
    }
}

// index : index
// shorthand property
module.exports = {
    index, create, show, update, destroy, find,
    multerMiddleware, saveImage
};