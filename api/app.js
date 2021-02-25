/**
 * librerias externas
 */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
var logger = require('morgan'); // registrar todas las petitiones en un log
var bodyParser = require('body-parser'); // enviar archivos json

/**
 * rutas
 */
// var indexRouter = require('./routes/index');
const placesRouter = require('./routes/places');
const usersRouter = require('./routes/users');
const sessionsRouter = require('./routes/sessions');

/**
 * configuraciones de base de datos
 */
const db = require('./config/database');

db.connect();
var app = express();

// generar vistas
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/places', placesRouter);
app.use('/users', usersRouter);
app.use('/sessions', sessionsRouter);

// app.options('/', (req, res) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "PUT");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   res.status(204).send();
// });




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  res.json(err);
});
// ademas eliminamos la carpeta de views

module.exports = app;
