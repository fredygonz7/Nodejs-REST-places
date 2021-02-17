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
    coverImage: String,
    avatarImage: String,
    openHour: Number,
    closeHour: Number
});

// subir los archivos imagenes y ejecuta la funcion que guarda la ruta en el registro de la DB
placeSchema.methods.updateImage = function (path, imageType) {
    // primero sube la imagen a la nube
    return uploader(path)
        // segundo ejecuta la funcion que guarda la ruta en la DB
        .then(secure_url => this.saveImageUrl(secure_url, imageType));
}
// guardar en la DB la ruta de esos archivos
placeSchema.methods.saveImageUrl = function (secure_url, imageType) {
    this[imageType+'Image'] = secure_url;
    return this.save();
}

placeSchema.plugin(mongoosePaginate);

let Place = mongoose.model('Place', placeSchema);

module.exports = Place;