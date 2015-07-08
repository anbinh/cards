'use strict';

var express = require('express');
var router = express.Router();
var crypto = require('crypto');

var nodemailer = require('nodemailer');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'mygiftcards14@gmail.com',
        pass: 'ilovecards'
    }
});

/* GET /users listing. */
router.get('/', function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('SELECT * from users', [], function(err, rows) {
            if (err) return next(err);

            res.json(rows)
        });

    });

});


/* GET /users/orders/:id listing. */
router.get('/orders/:id', function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('SELECT id, user_id, total_amount,total_cards,total_face_value,average_percentage,created_date from orders where user_id = ?', [req.params.id], function(err, rows) {
            if (err) return next(err);

            res.json(rows)
        });

    });

});

/* GET /users/sold-cards/:id listing. */
router.get('/sold-cards-list/:id', function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('SELECT id, user_id, total_amount,total_cards,total_face_value,average_payout,created_date, store_list from receipts where user_id = ?', [req.params.id], function(err, rows) {
            if (err) return next(err);

            res.json(rows)
        });

    });

});

/* POST /users */
router.post('/', function(req, res, next) {

    var dat = req.body;

    console.log("DATA IS", dat);

    dat.password = crypto.createHash('md5').update(dat.password).digest('hex');

    req.getConnection(function(err, connection) {
        if (err) return next(err);

        // check if user is unique
        connection.query('select count(id) as count from users where email = ?', [dat.email], function(err, rows) {
            if (err) return next(err);

            if (rows[0].count > 0) {

                res.statusCode = 400;
                res.json({
                    message: 'The user has existed'
                });

                return;
            }

            connection.query('INSERT INTO users SET ?', dat,
                function(err, result) {
                    if (err) return next(err);
                    if (result.affectedRows === 1) {
                        var userId = result.insertId;
                        connection.query('Select * from users where id = ' + userId, [], function(err, rows) {
                            if (err) return next(err);
                            var rdat = rows[0];

                            delete rdat.password;
                            res.json(rdat);
                        })
                    }
                }
            );

        });



    });
});


/* POST /users/login */
router.post('/login', function(req, res, next) {
    //
    //
    var dat = req.body;

    dat.password = crypto.createHash('md5').update(dat.password).digest('hex');

    req.getConnection(function(err, connection) {
        if (err) return next(err);


        console.log("find this info", dat);

        // check if user is unique
        connection.query('select * from users where email = ? and password = ?', [dat.email, dat.password], function(err, rows) {
            if (err) return next(err);

            if (rows.length === 1) {

                delete rows[0].password;
                delete rows[0].reset_token;

                res.json(rows[0]);

            } else {
                res.statusCode = 400;
                res.json({
                    message: 'Username and password cannot be found!'
                });

                return;
            }



        });



    });

});




/* GET /users/id */
router.get('/:id', function(req, res, next) {
    User.findById(req.params.id, function(err, post) {
        if (err) return next(err);
        res.json(post);
    });
});




/* 

/* GET /users/by_id/:user_id */
router.get('/by_id/:user_id', function(req, res, next) {

    console.log("USER ID", req.params.user_id);
    User.findOne({
        user_id: req.params.user_id
    }, function(err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* GET /users/forget-password */
router.post('/forget-password', function(req, res, next) {

    var dat = req.body;

    req.getConnection(function(err, connection) {
        if (err) return next(err);


        console.log("find this info", dat);

        // check if user is unique
        connection.query('select * from users where email = ? ', [dat.email], function(err, rows) {
            if (err) return next(err);

            if (rows.length === 1) {

                dat.username = rows[0].username;

                var email = rows[0].email;

                var userId = rows[0].id;

                var token = crypto.randomBytes(16).toString('hex');



                connection.query('update  users SET  ? where id  = ?', [{
                        reset_token: token
                    },
                    userId
                ], function(err, result) {

                    if (err) return next(err);

                    dat.token = token;
                    dat.link = req.headers.origin + '/reset-password/#/' + token;

                    // console.log("SENT dat", dat);


                    res.render('emails/forget-password', dat, function(err, final_html) {
                        if (err) throw err;

                        // console.log("HEADER", req.headers);

                        // setup e-mail data with unicode symbols
                        var mailOptions = {
                            from: 'Gift Cards ✔ <schoolservice2@gmail.com>', // sender address
                            to: email, // list of receivers
                            subject: 'Reset your password!', // Subject line
                            text: 'Reset your password!', // plaintext body
                            html: final_html // html body
                        };

                        transporter.sendMail(mailOptions, function(error, info) {
                            if (error) {
                                return console.log(error);
                            }
                            console.log('Message sent: ' + info.response);



                        });

                        res.json({
                            "status": "sent"
                        });

                    });


                });

            } else {
                res.statusCode = 400;
                res.json({
                    message: 'This email has not registered!'
                });

                return;
            }



        });



    });

});

/* POST /users/reset-password */
router.post('/reset-password', function(req, res, next) {

    var dat = req.body;

    var token = dat.token;


    if (token === '') {
        res.statusCode = 400;
        res.json({
            message: 'Invalid Token'
        });

        return;
    }

    req.getConnection(function(err, connection) {
        if (err) return next(err);


        console.log("find this info", dat);

        // check if user is unique
        connection.query('select * from users where reset_token = ? ', [token], function(err, rows) {
            if (err) return next(err);

            if (rows.length === 1) {

                var user = rows[0];

                var userId = user.id;

                dat.password = crypto.createHash('md5').update(dat.password).digest('hex');

                // update password
                connection.query('update users SET  ? where id  = ?', [{
                        password: dat.password,
                        reset_token: ''
                    },
                    userId
                ], function(err, result) {

                    if (err) return next(err);

                    delete rows[0].password;
                    res.json(rows[0]);

                });

            } else {
                res.statusCode = 400;
                res.json({
                    message: 'Invalid Token'
                });

                return;
            }



        });



    });

});

/* POST /users/pay-order */
router.post('/pay-order', function(req, res, next) {

    var dat = req.body;


    req.getConnection(function(err, connection) {
        if (err) return next(err);


        // console.log("find this info", dat);
        // 


        var myCards = [];
        for (var i = 0; i < dat.cards.length; i++) {
            myCards.push(dat.cards[i].id);
        };

        console.log(myCards);

        var sql = "SELECT count(*) as count from sold_cards where id in ( " + myCards.join(',') + " ) and sold = 0";

        // checking if all the buying cards are valid
        connection.query(sql, [], function(err, result) {

            if (err) return next(err);

            console.log('result', result);

            // check if all the card can be bought by user
            if (result[0].count !== dat.cards.length) {
                res.statusCode = 400;
                res.json({
                    message: 'Invalid order, please clear your cart and make a new purchase'
                });

                return;
            };



            var myLocalCards = JSON.parse(JSON.stringify(dat.cards));

            dat.billing_user = JSON.stringify(dat.billing_user);
            dat.cards = JSON.stringify(dat.cards);

            connection.query('INSERT INTO orders SET ?', dat, function(err, result) {

                if (err) return next(err);

                if (result.affectedRows === 1) {
                    var orderId = result.insertId;
                    connection.query('Select * from orders where id = ' + orderId, [], function(err, rows) {
                        if (err) return next(err);

                        var order = {
                            id: rows[0].id,
                            user_id: rows[0].user_id,
                            total_amount: rows[0].total_amount,
                            total_cards: rows[0].total_cards,
                            billingUser: JSON.parse(rows[0].billing_user),
                            cards: JSON.parse(rows[0].cards),
                            total_face_value: rows[0].total_face_value,
                            average_percentage: rows[0].average_percentage
                        };

                        var cardSql = '';

                        for (var i = 0; i < myLocalCards.length; i++) {
                            var cardId = myLocalCards[i].id;
                            var sql = "Update sold_cards set sold = 1, sold_to_user = " + dat.user_id + " , order_id = " + orderId + " WHERE id = " + cardId + ";";
                            cardSql += sql;
                        };

                        // console.log(cardSql);


                        connection.query(cardSql, [], function(err, rows) {
                            if (err) return next(err);

                            res.json(order);
                        });




                    })
                }

            });

        });





    });

});

/* POST /users/sell-cards */
router.post('/sell-cards', function(req, res, next) {

    var dat = req.body;


    req.getConnection(function(err, connection) {
        if (err) return next(err);


        // console.log("find this info", dat);

        dat.billing_user = JSON.stringify(dat.billing_user);


        var tempCards = JSON.parse(JSON.stringify(dat.cards));

        delete dat.cards;

        connection.query('INSERT INTO receipts SET ?', dat, function(err, result) {

            if (err) return next(err);

            if (result.affectedRows === 1) {
                var orderId = result.insertId;
                connection.query('Select * from receipts where id = ' + orderId, [], function(err, rows) {
                    if (err) return next(err);

                    var receipt = {
                        id: rows[0].id,
                        user_id: rows[0].user_id,
                        total_amount: rows[0].total_amount,
                        total_cards: rows[0].total_cards,
                        billingUser: JSON.parse(rows[0].billing_user),
                        cards: tempCards,
                        total_face_value: rows[0].total_face_value,
                        average_percentage: rows[0].average_percentage
                    };
                    // 
                    var receiptId = rows[0].id;


                    var insertedCard = [];
                    for (var i = 0; i < receipt.cards.length; i++) {
                        receipt.cards[i].receipt_id = receiptId;
                        var card = receipt.cards[i];
                        var item = [card.receipt_id, card.gogo_buy, card.number, card.pin, card.store_id, card.store_name, card.value, receipt.user_id, 0, null, null];
                        insertedCard.push(item);

                    };

                    // console.log('inserted cards', insertedCard);

                    connection.query('INSERT INTO sold_cards (receipt_id,gogo_buy,number,pin,store_id,store_name,value,user_id,sold,sold_to_user,order_id) VALUES ?', [insertedCard], function(err, ret) {
                        if (err) return next(err);
                        res.json(receipt);

                    });



                })
            }

        });



    });

});


/* PUT /users/:id */
router.put('/:id', function(req, res, next) {

    var dat = req.body;

    req.getConnection(function(err, connection) {
        if (err) return next(err);


        console.log("find this info", dat);

        // check if user is unique
        connection.query('update  users SET  ? where id  = ?', [dat, req.params.id], function(err, result) {
            if (err) return next(err);

            var userId = dat.id;
            connection.query('Select * from users where id = ' + userId, [], function(err, rows) {
                if (err) return next(err);
                var rdat = rows[0];

                delete rdat.password;
                res.json(rdat);
            })




        });



    });
});



/* DELETE /users/:id */
router.delete('/:id', function(req, res, next) {
    User.findByIdAndRemove(req.params.id, req.body, function(err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;