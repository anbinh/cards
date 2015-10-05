'use strict';

var express = require('express');
var router = express.Router();



var nodemailer = require('nodemailer');

var mandrillTransport = require('nodemailer-mandrill-transport');

var transporter = nodemailer.createTransport(mandrillTransport({
    auth: {
        apiKey: 'vlLsAGje1Fx4XBS4pckTSQ'
    }
}));

var ADMIN_EMAIL = 'admin@cardslyce.com';

// get all transactions
router.get('/', function(req, res, next) {

    // console.log(req.query);
    req.getConnection(function(err, connection) {
        if (err) return next(err);

        console.log(req.query);
        var query;
        // if the query object is empty
        query = 'SELECT * from transactions';

        connection.query(query, [], function(err, rows) {
            if (err) return next(err);

            for (var i = 0; i < rows.length; i++) {
                rows[i].billingUser = JSON.parse(rows[i].billing_user);
                rows[i].cards = JSON.parse(rows[i].cards);
                rows[i].response = JSON.parse(rows[i].response);
                delete rows[i].billing_user;
            };


            res.json(rows)
        });

    });

});

router.get('/:id', function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('SELECT * from transactions where id = ?', [req.params.id], function(err, rows) {
            if (err) return next(err);

            rows[0].billingUser = JSON.parse(rows[0].billing_user);
            rows[0].cards = JSON.parse(rows[0].cards);
            rows[0].response = JSON.parse(rows[0].response);
            delete rows[0].billing_user;

            var receipt = rows[0];
            res.json(receipt);


        });

    });

});


module.exports = router;