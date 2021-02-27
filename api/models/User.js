const mongoose = require('mongoose');
const mongooseBcrypt = require('mongoose-bcrypt');
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
userSchema.post('save', function(user, next) {
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

/**
 * agrega un campo encriptado llamado password (cuando guardemos un password este sera encriptado)
 * con unos metodos verifyPassword(password,callback), verifyPasswordSync(password)
 * y static method encryptPassword(password,callback)
 */
userSchema.plugin(mongooseBcrypt);

const User = mongoose.model('User', userSchema);

module.exports = User;