var express = require('express');
var path = require('path');
const headers = require('./middleware/headers');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cardsRouter = require('./routes/cards');

const auth = require('./middleware/auth');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(headers);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cards', auth, cardsRouter);

module.exports = app;
