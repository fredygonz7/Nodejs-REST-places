/**
 * los modelos se crean en 2 pasos
 * 1 el esquema toda la informacion que se guarda en la db 
 *   atributos, validaciones, metodos, ..
 * 2 
 */

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

let placeSchema = new mongoose.Schema({
    title: {
        type: String,
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
    closeHour: Number
});

placeSchema.plugin(mongoosePaginate);

let Place = mongoose.model('Place', placeSchema);

module.exports = Place;