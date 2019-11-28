const express = require('express');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./config/database');
const cors = require('cors');
//const Sequelize = require('sequelize');


var hostRouter = require('./routes/host');
var usersRouter = require('./routes/users');
var visitorRouter = require('./routes/visitor');
var allRouter = require('./routes/all');




// test database connection
db.authenticate().then(() => console.log('Database connected ..67677..'))
.catch(err => console.log('Error: ' + err));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin :'http://localhost:3000'
}));

app.use('/host', hostRouter);
app.use('/users', usersRouter);
app.use('/visitor',visitorRouter);
app.use('/all',allRouter);

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
  res.render('error');
});

module.exports = app;
