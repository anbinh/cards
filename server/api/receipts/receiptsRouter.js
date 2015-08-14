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

// get all orders
router.get('/', function(req, res, next) {

    // console.log(req.query);
    req.getConnection(function(err, connection) {
        if (err) return next(err);

        console.log(req.query);
        var query;
        // if the query object is empty
        if (Object.getOwnPropertyNames(req.query).length === 0) {
            //is empty
            query = 'SELECT * from receipts ORDER BY  created_date DESC';
        } else {
            query = 'SELECT * from receipts WHERE ? ORDER BY  created_date DESC';
        }

        connection.query(query, [req.query], function(err, rows) {
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


router.get('/put-to-inventory/:id', function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);

        connection.query('select * from receipts where id = ?', [req.params.id], function(err, rows) {
            if (err) return next(err);


            if (rows.length === 0) {
                res.json({
                    status: 'fail',
                    message: 'No receipt found'
                });
                return;
            }

            var receipt = {
                id: rows[0].id,
                user_id: rows[0].user_id,
                total_amount: rows[0].total_amount,
                total_cards: rows[0].total_cards,
                billingUser: JSON.parse(rows[0].billing_user),
                total_face_value: rows[0].total_face_value,
                average_percentage: rows[0].average_percentage,
                created_date: rows[0].created_date,
                status: rows[0].status,
                payment: rows[0].payment
            };


            if (receipt.status !== 'pending') {
                res.json({
                    status: 'fail',
                    message: 'The receipt\'s status is ok already'
                });
            } else {
                // continue
                // 






                // getting store list
                connection.query('select * from sold_cards where receipt_id = ? ', [receipt.id], function(err, rows) {
                    if (err) return next(err);


                    receipt.cards = JSON.parse(JSON.stringify(rows));

                    var receiptStores = {};
                    var storeList = [];
                    for (var i = 0; i < rows.length; i++) {
                        var card = rows[i];
                        // only select pending cards
                        if (card.status === 'pending') {
                            if (receiptStores[card.store_id]) {
                                receiptStores[card.store_id] += 1;
                            } else {
                                receiptStores[card.store_id] = 1;
                            }

                            if (storeList.indexOf(card.store_id) === -1) {
                                storeList.push(card.store_id);
                            }
                        }

                    };

                    if (storeList.length > 0) {
                        // getting store limit
                        connection.query('select * from stores where id IN (?)', [storeList], function(err, rows) {
                            if (err) return next(err);

                            var stores = JSON.parse(JSON.stringify(rows));

                            var query;



                            query = 'SELECT count(store_id) as count, store_name, store_id from sold_cards LEFT JOIN receipts ON receipts.id = sold_cards.receipt_id  where sold = 0 and sold_cards.status = "ok" and store_id in (?) group by store_id ';
                            connection.query(query, [storeList], function(err, rows) {
                                if (err) return next(err);

                                var storeInventories = rows;

                                // set the default to zero
                                for (var i = 0; i < stores.length; i++) {
                                    stores[i].inventory = 0;
                                    stores[i].name = stores[i].name.trim();
                                };

                                for (var i = 0; i < stores.length; i++) {
                                    var store = stores[i];

                                    for (var j = 0; j < storeInventories.length; j++) {
                                        var storeInventory = storeInventories[j];
                                        if (storeInventory.store_id === store.id) {
                                            stores[i].inventory = storeInventory.count;
                                            // console.log(storeInventory, store);
                                        }
                                    };
                                };

                                var ret = {
                                    store_limits: stores,
                                    receipt_stores: receiptStores
                                }

                                console.log(ret);



                                // check if we can add inventory
                                var canAddToInventory = true;
                                var msg;
                                for (var i = 0; i < stores.length; i++) {

                                    if (canAddToInventory === true) {
                                        var store = stores[i];
                                        var currentNCards = receiptStores[store.id];
                                        if (store.inventory + currentNCards > store.limit) {
                                            canAddToInventory = false;
                                            msg = 'Cannot change the status of ' + currentNCards;
                                            msg += ' card(s) of the store: ' + store.name.replace('-', ' ').toUpperCase();
                                            msg += '. Current limit: ' + store.limit;
                                            msg += '. Current inventory: ' + store.inventory;

                                        }
                                    }

                                };

                                if (canAddToInventory === false) {
                                    res.json({
                                        status: 'fail',
                                        message: msg
                                    });
                                } else {

                                    // we can add all pending cards of the receipt

                                    connection.query('update sold_cards set status = "ok" where receipt_id = ?', [receipt.id], function(err, rows) {
                                        if (err) return next(err);

                                        connection.query('update receipts set status = "ok" where id = ?', [receipt.id], function(err, rows) {
                                            if (err) return next(err);


                                            receipt.status = 'ok';
                                            res.render('emails/sell-order', receipt, function(err, final_html) {
                                                if (err) throw err;

                                                var title;
                                                if (receipt.status === 'ok') {
                                                    title = 'Your Sell Order';
                                                } else {
                                                    title = 'Your Pending Sell Order';
                                                }

                                                // setup e-mail data with unicode symbols
                                                var mailOptions = {
                                                    from: 'Cardslyce <admin@cardslyce.com>', // sender address
                                                    to: receipt.billingUser.email, // list of receivers
                                                    subject: title, // Subject line
                                                    text: title, // plaintext body
                                                    html: final_html // html body
                                                };

                                                transporter.sendMail(mailOptions, function(error, info) {
                                                    if (error) {
                                                        return console.log(error);
                                                    }
                                                    console.log('Message sent: ', info);

                                                });

                                                res.json({
                                                    status: 'ok'
                                                });

                                            });
                                        });
                                    });
                                }

                            });




                        });
                    } else {
                        // all the cards of the receipt has the status of OK
                        connection.query('update receipts set status = "ok" where id = ?', [receipt.id], function(err, rows) {
                            if (err) return next(err);

                            receipt.status = 'ok';
                            res.render('emails/sell-order', receipt, function(err, final_html) {
                                if (err) throw err;

                                var title;
                                if (receipt.status === 'ok') {
                                    title = 'Your Sell Order';
                                } else {
                                    title = 'Your Pending Sell Order';
                                }

                                // setup e-mail data with unicode symbols
                                var mailOptions = {
                                    from: 'Cardslyce <admin@cardslyce.com>', // sender address
                                    to: receipt.billingUser.email, // list of receivers
                                    subject: title, // Subject line
                                    text: title, // plaintext body
                                    html: final_html // html body
                                };

                                transporter.sendMail(mailOptions, function(error, info) {
                                    if (error) {
                                        return console.log(error);
                                    }
                                    console.log('Message sent: ', info);

                                });

                                res.json({
                                    status: 'ok'
                                });

                            });
                        });
                    }



                });
            }


        })

    });

});




module.exports = router;