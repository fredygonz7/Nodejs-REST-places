/**
 * los modelos se crean en 2 pasos
 * 1 el esquema toda la informacion que se guarda en la db 
 *   atributos, validaciones, metodos, ..
 * 2 
 */

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const uploader = require('./uploader');

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

// subir los archivos imagenes
placeSchema.methods.updateAvatar = function (path) {
    return uploader(path)
        .then(secure_url => this.saveAvatarUrl(secure_url));
}
// guardar en la DB la ruta de esos archivos
placeSchema.methods.saveAvatarUrl = function (secure_url) {
    this.avatarImage = secure_url;
    return this.save();
}

placeSchema.plugin(mongoosePaginate);

let Place = mongoose.model('Place', placeSchema);

module.exports = Place;