'use strict';

var express = require('express');
var router = express.Router();



// /orders
router.get('/:id', function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('SELECT * from selling_cards where id = ?', [req.params.id], function(err, rows) {
            if (err) return next(err);

            rows[0].billingUser = JSON.parse(rows[0].billing_user);
            rows[0].cards = JSON.parse(rows[0].cards);
            delete rows[0].billing_user;
            res.json(rows[0])
        });

    });

});

module.exports = router;