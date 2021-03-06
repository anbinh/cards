'use strict';

var express = require('express');
var router = express.Router();



// /selling-cards
router.get('/:id', function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('SELECT receipts.*,sold_cards.*, receipts.id as receipt_id from receipts LEFT JOIN sold_cards ON sold_cards.receipt_id = receipts.id  where receipts.id =  ?', [req.params.id], function(err, rows) {
            if (err) return next(err);
            rows[0].billingUser = JSON.parse(rows[0].billing_user);
            delete rows[0].billing_user;

            var receipt = {
                id: rows[0].id,
                user_id: rows[0].user_id,
                total_amount: rows[0].total_amount,
                total_cards: rows[0].total_cards,
                total_face_value: rows[0].total_face_value,
                average_payout: rows[0].average_payout,
                store_list: rows[0].store_list,
                created_date: rows[0].created_date,
                billingUser: rows[0].billingUser,
                payment: rows[0].payment,
                status: rows[0].status
            };

            var cards = [];
            for (var i = 0; i < rows.length; i++) {
                var item = rows[i];
                var card = {
                    id: rows[i].id,
                    receipt_id: rows[i].receipt_id,
                    value: rows[i].value,
                    gogo_buy: rows[i].gogo_buy,
                    number: rows[i].number,
                    pin: rows[i].pin,
                    dealer_code: rows[i].dealer_code,
                    store_id: rows[i].store_id,
                    store_name: rows[i].store_name,
                    pay_by: rows[i].pay_by,
                    bought_value: rows[i].bought_value,
                    payout: rows[i].payout,
                    status: rows[i].status,
                    balance: rows[i].balance

                };
                cards.push(card);
            };
            receipt.cards = cards;



            res.json(receipt);
        });

    });

});

router.get('/put-to-inventory/:cardId/:storeId', function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);

        console.log(req.params);

        // check inventory and limit
        connection.query('select count(*) as inventory, stores.limit from sold_cards JOIN stores ON stores.id = sold_cards.store_id where sold = 0 and status = "ok" and store_id = ' + req.params.storeId, function(err, rows) {
            var currentInventory = rows[0].inventory;
            var limit = rows[0].limit;

            console.log(rows);

            // check whether we can add the current pending card to inventory
            if (currentInventory + 1 <= limit) {
                // we can add the card to the inventory
                connection.query('update sold_cards set status = "ok" where store_id = ? and id = ?', [req.params.storeId, req.params.cardId], function(err, rows) {
                    res.json({
                        status: 'ok'
                    });
                });
            } else {
                res.json({
                    status: 'fail',
                    message: 'The inventory is full for the current store'
                });
            }


        });

    });

});




module.exports = router;