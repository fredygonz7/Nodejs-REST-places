const mongoose = require('mongoose');
const mongooseBcrypt = require('mongoose-bcrypt');
const FavoritePlace = require('./FavoritePlace');
const Place = require('./Place');

let userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    admin: {
        type: Boolean,
        default: false
    }
});

// hook que guarda el primer usuario como administrador
userSchema.post('save', function (user, next) {
    User.count({}).then(count => {
        if (count == 1) {
            User.updateOne({ '_id': user._id }, { admin: true })
                .then(result => {
                    next();
                })
        } else {
            next();
        }
    })
})

userSchema.virtual('places').get(function () {
    return Place.find({ '_user': this._id });
})

userSchema.virtual('favorites').get(function () {
    /**
     * obtiene todos los favoritos ({cuyo usuario sean _user= this._id},
     * {los campos que quiero que me devuelta}
     */
    return FavoritePlace.find({ '_user': this._id }, { '_place': true })
        .then(favs => {
            // placeIds arreglo de los id de los favoritos
            let placeIds = favs.map(fav => fav._place);
            // return los sitios favoritos (modelo Place)
            return Place.find({'_id':{$in: placeIds}})
        })
})

/**
 * agrega un campo encriptado llamado password (cuando guardemos un password este sera encriptado)
 * con unos metodos verifyPassword(password,callback), verifyPasswordSync(password)
 * y static method encryptPassword(password,callback)
 */
userSchema.plugin(mongooseBcrypt);

const User = mongoose.model('User', userSchema);

module.exports = User;