const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

const User = require('../models/User');

function authenticate(req, res, next) {
    User.findOne({ email: req.body.email })
        .then(user => {
            user.verifyPassword(req.body.password)
                .then(valid => {
                    if (valid) {
                        req.user = user;
                        next();
                    } else {
                        next(new Error('Invalid Credentials'));
                    }
                })
        }).catch(error => next(error));
}

function generateToken(req, res, next) {
    if (!req.user) return next();
    // si existe req.user almacenamos dentro la propiedad token el token generado
    // se puede almacenar varios datos, en este caso solo el id
    // lo segundo es el secreto con lo que se firman los tokens
    req.token = jwt.sign({ id: req.user._id }, secrets.jwtSecret);
    next();
}

function sendToken(req, res) {
    if (req.user) {
        res.json({
            user: req.user,
            jwt: req.token
        })
    } else {
        res.status(422).json({
            error: 'Could not create user'
        })
    }
}

module.exports = { authenticate, generateToken, sendToken}