'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mysql = require('mysql');


var myConnection = require('express-myconnection');

var dbOptions = {
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
    database: "gift_cards",
    multipleStatements: true
};




var routes = require('./server/api/index/indexRouter');
var users = require('./server/api/users/usersRouter');
var orders = require('./server/api/orders/ordersRouter');
var receipts = require('./server/api/receipts/receiptsRouter');
var email = require('./server/api/email/emailRouter');
var stores = require('./server/api/stores/storesRouter');
var sellingCards = require('./server/api/selling_cards/sellingCardsRouter');
var settings = require('./server/api/settings/settingsRouter');
var cards = require('./server/api/cards/cardsRouter');
var payment = require('./server/api/payment/paymentRouter');
var transactions = require('./server/api/transactions/transactionsRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'server/shared'));
app.set('view engine', 'ejs');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(myConnection(mysql, dbOptions, 'pool'));

app.use('/', routes);
app.use('/api/users', users);
app.use('/api/orders', orders);
app.use('/api/receipts', receipts);
app.use('/api/email', email);
app.use('/api/stores', stores);
app.use('/api/selling_cards', sellingCards);
app.use('/api/settings', settings);
app.use('/api/cards', cards);
app.use('/api/payment', payment);
app.use('/api/transactions', transactions);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});



module.exports = app;