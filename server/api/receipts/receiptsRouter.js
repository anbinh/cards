'use strict';

var express = require('express');
var router = express.Router();


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

            var receipt = rows[0];



            if (receipt.status !== 'pending') {
                res.json({
                    status: 'fail',
                    message: 'The receipt\'s status is ok already'
                });
            } else {
                // continue
                // 


                // getting store list
                connection.query('select * from sold_cards where receipt_id = ? and status = "pending"', [receipt.id], function(err, rows) {
                    if (err) return next(err);

                    var receiptStores = {};
                    var storeList = [];
                    for (var i = 0; i < rows.length; i++) {
                        var card = rows[i];
                        if (receiptStores[card.store_id]) {
                            receiptStores[card.store_id] += 1;
                        } else {
                            receiptStores[card.store_id] = 1;
                        }

                        if (storeList.indexOf(card.store_id) === -1) {
                            storeList.push(card.store_id);
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

                                            res.json({
                                                status: 'ok'
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

                            res.json({
                                status: 'ok'
                            });
                        });
                    }



                });
            }


        })

    });

});




module.exports = router;