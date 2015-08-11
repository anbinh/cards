'use strict';

var express = require('express');
var router = express.Router();


// get all orders
router.get('/', function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('SELECT * from receipts ORDER BY created_date DESC', [], function(err, rows) {
            if (err) return next(err);

            for (var i = 0; i < rows.length; i++) {
                rows[i].billingUser = JSON.parse(rows[i].billing_user);
                delete rows[i].billing_user;
            };


            res.json(rows)
        });

    });

});

router.get('/:id', function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('SELECT * from receipts where id = ?', [req.params.id], function(err, rows) {
            if (err) return next(err);

            rows[0].billingUser = JSON.parse(rows[0].billing_user);
            delete rows[0].billing_user;

            var receipt = rows[0];
            connection.query('SELECT * from sold_cards where receipt_id = ?', [receipt.id], function(err, cards) {
                receipt.cards = cards;

                res.json(receipt);
            });


        });

    });

});




module.exports = router;