const cloudinary = require('cloudinary');

const secrets = require('../config/secrets');

// se le pasa a cloudinary la información de acceso, el json que tenemos en los secretos
cloudinary.config(secrets.cloudinary);

// imagePath es donde se va a encontrar la imagen que se subira a la nube
// funcion que sube las imagenes a la nube
module.exports = function (imagePath) {
    // una promesa porque la subida puede tardar
    return new Promise((resolve, reject) => {
        // subir la imagen
        cloudinary.uploader.upload(imagePath, function (result) {
            console.log(result);
            // la promesa se resulve con la ruta de la imagen, para agregarla al elemento img
            if (result.secure_url) return resolve(result.secure_url);
            
            reject(new Error('Error con Cloudinary'));
        })
    })
} 