/**
 * los modelos se crean en 2 pasos
 * 1 el esquema toda la informacion que se guarda en la db 
 *   atributos, validaciones, metodos, ..
 * 2 
 */

const mongoose = require('mongoogse');

let placeSchema = new mongoose.Schema({
    title: {
        String,
        required: true
    },
    description: String,
    acceptsCreditCard: {
        type: Boolean,
        default: false
    },
    converImage: String,
    avatarImage: String,
    openHour: Number,
    cleseHour: Number
});

let Place = mongoose.model('Place', placeSchema);

module.exports = Place;