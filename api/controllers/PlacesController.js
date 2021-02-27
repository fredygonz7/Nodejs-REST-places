/**
 * Controlador Places
 * 
 */

// importar el modelo
const Place = require('../models/Place');

// importar configuracion
const upload = require('../config/upload');

// importar el controlador
const helpers = require('./helpers');

validParams = [
    'title', 'description', 'address', 'acceptsCreditCard',
    'openHour', 'closeHour'
];

// Middleware para búsquedas individuales 
function find(req, res, next) {
    // Place.findById(req.params.id)
    Place.findOne({ slug: req.params.id })
        .then(place => {
            req.place = place;
            // mainObj se usa para validar que los sitios sean propios
            req.mainObj = place;
            next();
        }).catch(err => {
            console.log(err);
            next(err);
        });
}

// obtener todos los sitios
function index(req, res) {
    // Place.find({})
    Place.paginate({}, { page: req.query.page || 1, limit: 5, sort: { '_id': -1 } })
        .then(docs => {
            res.json(docs);
        }).catch(err => {
            console.log(err);
            res.json(err);
        });
}
function create(req, res, next) {
    // crear un sitio
    let params = helpers.buildParams(validParams, req.body);
    // console.log('req.user.id',req.user.id);
    params['_user'] = req.user.id;
    Place.create( params )
        .then(doc => {
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
}
function update(req, res) {
    // actualizar un registro
    const params = helpers.buildParams(validParams, req.body);

    req.place = Object.assign(req.place, params);
    // Object.assign(target , source) 
    // copia todos las propiedades de la fuente(source) al objetivo (target) 
    req.place.save().then(doc => {
        res.json(doc);
    }).catch(err => {
        console.log(err);
        res.json(err);
    });
}
function destroy(req, res) {
    // eliminar un sitio
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
        const files = ['avatar', 'cover'];
        promises = [];

        files.forEach(imageType => {
            if (req.files && req.files[imageType]) {
                const path = req.files[imageType][0].path;
                promises.push(req.place.updateImage(path, imageType));
            } else {
                // res.json({
                //     error: 'File not found'
                // });
                console.log("req.file", req.files);
                console.log('File not found')
            }

        });
        Promise.all(promises)
            .then(result => {
                console.log(result);
                res.json(req.place);
            }).catch(err => {
                console.log(err);
                res.json(err);
            })
    } else {
        // en caso de que no se pueda procesar o subir la imagen
        // 422 no se pudo procesar la entidad
        res.status(422).json({
            error: req.error || 'Could not save place'
        });
    }
}

// index : index
// shorthand property
module.exports = {
    index, create, show, update, destroy, find,
    multerMiddleware, saveImage
};