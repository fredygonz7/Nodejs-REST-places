var createError = require('http-errors');
var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
var logger = require('morgan'); // registrar todas las petitiones en un log
var bodyParser = require('body-parser'); // enviar archivos json

const Place = require('./models/Place');

const db = require('./config/database');

db.connect();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

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

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.post('/places', (req, res) => {
  Place.create({
    // title: "Abarrotes El Ajonjoli",
    // description: "Lorem Ipsum",
    // acceptsCreditCard: true,
    // openHour: 6,
    // closeHour: 18
    title: req.body.title,
    description: req.body.description,
    acceptsCreditCard: req.body.acceptsCreditCard,
    openHour: req.body.openHour,
    closeHour: req.body.closeHour
  }).then(doc => {
    res.json(doc)
  }).catch(err => {
    console.log(err);
    res.json(err);
  });
});

app.get('/places', (req, res) => {
  Place.find({})
    .then(docs => {
      res.json(docs);
    }).catch(err => {
      console.log(err);
      res.json(err);
    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
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
