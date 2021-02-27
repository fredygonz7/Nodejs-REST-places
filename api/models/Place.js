/**
 * 1 el esquema de toda la informacion que se guarda en la db 
 *   atributos, validaciones, metodos, ..
 * 2 
 * mongoose libreria utilizada para la conexion a la db mongodb
 * Schema es lo que define la estructura de los documentos que 
 * se guardaran en la coleccion (de places) en mongodb
 */
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const uploader = require('./uploader');
const slugify = require('../plugins/slugify');

/**
 * Schema es lo que define la estructura de los documentos que
 * se guardaran en la coleccion (de places) en mongodb
 * contiene los atributos (tipo, validaciones)
 */
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
    address: String,
    coverImage: String,
    avatarImage: String,
    openHour: Number,
    closeHour: Number,
    slug: {
        type: String,
        unique: true
    },
    _user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});
// Los _Id que se asignan a los documentos, cuando se guardan son de tipo ObjectId, 
// así que es una mejor practica que sean de este tipo a que sea String.

// subir los archivos imagenes y ejecuta la funcion que guarda la ruta en el registro de la DB
placeSchema.methods.updateImage = function (path, imageType) {
    // primero sube la imagen a la nube
    return uploader(path)
        // segundo ejecuta la funcion que guarda la ruta en la DB
        .then(secure_url => this.saveImageUrl(secure_url, imageType));
}
// guardar en la DB la ruta de esos archivos
placeSchema.methods.saveImageUrl = function (secure_url, imageType) {
    this[imageType + 'Image'] = secure_url;
    return this.save();
}

// pre = antes de guardar ejecuta esta funcion 
// y el hook no termina hasta que la funcion next se ejecute
placeSchema.pre('save', function (next) {
    if (this.slug) return next();
    generateSlugAndContinue.call(this, 0, next);
});

function generateSlugAndContinue(count, next) {
    this.slug = slugify(this.title);
    if (count != 0)
    this.slug = this.slug+"-"+count;
    
    Place.validateSlugCount(this.slug).then(isValid => {
        if (!isValid)
        return generateSlugAndContinue.call(this, count+1, next);
        next();
    })
}

placeSchema.statics.validateSlugCount = function (slug) {
    return Place.count({  slug: slug })
        .then(count => {
            if (count > 0)
                return false;
            return true;
        })
}

placeSchema.plugin(mongoosePaginate);

let Place = mongoose.model('Place', placeSchema);

module.exports = Place;