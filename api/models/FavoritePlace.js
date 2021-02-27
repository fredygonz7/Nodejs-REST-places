/**
 * Relacion muchos a muchos 
 * Registro de sitios que le gustan a un usuario
 */
const mongoose = require('mongoose');

let favoriteSchema = new mongoose.Schema({
    _user: {
        type: mongoose.Schema.Types.ObjectId,
        ret: 'User',
        required: true
    },
    _place: {
        type: mongoose.Schema.Types.ObjectId,
        ret: 'Place',
        required: true
    }
});

const FavoritePlace = mongoose.model('FavoritePlace', favoriteSchema);

module.exports = FavoritePlace;