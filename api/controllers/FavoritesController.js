const FavoritePlace = require('../models/FavoritePlace');

const buildParams = require('./helpers').buildParams;

const validParams = ['_place'];

function find(req, res, next) {
    FavoritePlace.findById(req.params.id)
        .then(fav => {
            req.favorite = fav;
            // mainObj se usa para validar que los sitios sean propios
            req.mainObj = fav;
            next();
        }).catch(next);
        // al pasar la funcion next sin ejecutar,
        // se pasan los errores de catch y automanticamente nuestra app tendra un error
}
function index(req, res) {
    FavoritePlace.paginate({}, { page: req.query.page || 1, limit: 5, sort: { '_id': -1 } })
        .then(docs => {
            res.json(docs);
        }).catch(err => {
            console.log(err);
            res.json(err);
        });
}
function create(req, res) {
    // crear un sitio en favoritos
    let params = buildParams(validParams, req.body);
    // console.log('req.user.id',req.user.id);
    params['_user'] = req.user.id;
    FavoritePlace.create(params)
        .then(doc => {
            res.json(doc)
            // req.place = doc;
            // next();
        }).catch(err => {
            // console.log(err);
            res.status(422).json({ err });
            // next(err);
        });
}
function destroy(req, res) {
    req.favorite.remove()
        .then(doc => {
            // res.json(doc.title);
            res.json({});
        }).catch(err => {
            res.status(500).json({ err });
        });
}

module.exports = {find, create, destroy, index}