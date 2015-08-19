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

router.get('/giftcards/:id', function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('SELECT * from orders where id = ?', [req.params.id], function(err, rows) {
            if (err) return next(err);

            rows[0].billingUser = JSON.parse(rows[0].billing_user);
            rows[0].cards = JSON.parse(rows[0].cards);
            delete rows[0].billing_user;
            delete rows[0].cards;

            var order = rows[0];

            connection.query('select * from sold_cards where order_id = ? ', [req.params.id], function(err, rows) {
                if (err) return next(err);

                order.cards = rows;

                res.render('emails/giftcards', order, function(err, final_html) {
                    if (err) throw err;

                    // setup e-mail data with unicode symbols
                    var mailOptions = {
                        from: 'Cardslyce <admin@cardslyce.com>', // sender address
                        to: order.billingUser.email, // list of receivers
                        subject: 'Your Gift Cards!', // Subject line
                        text: 'Your Gift Cards!', // plaintext body
                        html: final_html // html body
                    };

                    transporter.sendMail(mailOptions, function(error, info) {
                        if (error) {
                            // return console.log(error);
                            res.json(error)
                        } else {
                            res.json(order)
                        }
                        console.log('Message sent: ', info);


                    });

                });
            });




        });

    });

});

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