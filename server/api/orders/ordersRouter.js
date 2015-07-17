'use strict';

var express = require('express');
var router = express.Router();


// /orders
router.get('/:id', function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('SELECT * from orders where id = ?', [req.params.id], function(err, rows) {
            if (err) return next(err);

            rows[0].billingUser = JSON.parse(rows[0].billing_user);
            rows[0].cards = JSON.parse(rows[0].cards);
            delete rows[0].billing_user;
            res.json(rows[0])
        });

    });

});

// get all orders
router.get('/', function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('SELECT * from orders', [], function(err, rows) {
            if (err) return next(err);

            for (var i = 0; i < rows.length; i++) {
                rows[i].billingUser = JSON.parse(rows[i].billing_user);
                rows[i].cards = JSON.parse(rows[i].cards);
                delete rows[i].billing_user;
                delete rows[i].billingUser.reset_token;
            };

            res.json(rows)
        });

    });

});





module.exports = router;