'use strict';

var express = require('express');
var router = express.Router();

var StoresCat = {
    "target": "B",
    "walmart": "B",
    "marshalls": "B",
    "tj-maxx": "B",
    "cvs": "B",
    "sears": "B",
    "babies-r-us": "B",
    "office-depot": "B",
    "pet-co": "B",
    "walgreens": "B",
    "staples": "B",
    "pet-smart": "B",
    "advance-auto-parts": "B",
    "brookstone": "B",
    "kmart": "B",
    "rite-aid": "B",
    "auto-zone": "B",
    "office-max": "B",
    "family-dollar": "B",
    "macys": "C",
    "bloomingdales": "C",
    "old-navy": "C",
    "gap": "C",
    "victorias-secret": "C",
    "nordstrom": "C",
    "american-eagle": "C",
    "jcpenney": "C",
    "dsw": "C",
    "forever-21": "C",
    "ross": "C",
    "nike": "C",
    "express": "C",
    "h-and-m": "C",
    "lane-bryant": "C",
    "pac-sun": "C",
    "lord-and-taylor": "C",
    "neiman-marcus": "C",
    "lands-end": "C",
    "famous-footwear": "C",
    "abercrombie-and-fitch": "C",
    "i-tunes": "E",
    "amazon": "E",
    "best-buy": "E",
    "game-stop": "E",
    "toys-r-us": "E",
    "amc-theatres": "E",
    "fandango": "E",
    "regal-cinemas": "E",
    "regal-entertainment": "E",
    "hyatt-hotels": "E",
    "southwest-airlines": "E",
    "apple": "E",
    "dicks-sporting-goods": "E",
    "sports-authority": "E",
    "bass-pro-shops": "E",
    "starbucks": "F",
    "applebees": "F",
    "outback-steakhouse": "F",
    "dunkin-donuts": "F",
    "tgi-fridays": "F",
    "mcdonalds": "F",
    "whole-foods": "F",
    "chilis-restaurants": "F",
    "darden-restaurants": "F",
    "red-lobster": "F",
    "flemings": "F",
    "cold-stone-creamery": "F",
    "ihop": "F",
    "subway": "F",
    "ruths-chris-steak-house": "F",
    "panera-bread": "F",
    "chipotle": "F",
    "macaroni-grill": "F",
    "coffee-bean-and-tea-leaf": "F",
    "dominos-pizza": "F",
    "smoothie-king": "F",
    "home-depot": "H",
    "lowes": "H",
    "sephora": "H",
    "kohls": "H",
    "bath-and-body-works": "H",
    "home-goods": "H",
    "bed-bath-and-beyond": "H",
    "pottery-barn": "H",
    "shell": "H",
    "crate-and-barrel": "H",
    "michaels": "H",
    "bp-amoco": "H",
    "williams-sonoma": "H",
    "buybuy-baby": "H"
};


// Get all store
router.get('/', function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('select max(id) as id from cards group by store_id', [], function(err, rows) {
            if (err) return next(err);


            var ids = [];
            for (var i = 0; i < rows.length; i++) {
                ids.push(rows[i].id);
            };

            ids = ids.join(",");

            // console.log(ids);

            connection.query('select stores.id, stores.name as name, stores.limit as store_limit, cards.discount, stats.gcg_buy,stats.gogo_discount_extra, stats.fixed_discount from cards LEFT JOIN stores ON stores.id = cards.store_id   LEFT JOIN stats ON stats.id=cards.store_id where cards.id in ( ' + ids + ' ) order by store_id DESC', [], function(err, rows) {
                if (err) return next(err);

                var stores = [];
                for (var i = 0; i < rows.length; i++) {
                    var store = rows[i];
                    if (store.fixed_discount > 0) {
                        store.discount = store.fixed_discount;
                    }

                    store.name = store.name.trim();


                    if (StoresCat[store.name] != undefined) {
                        store.category = StoresCat[store.name];
                    }




                    store.gogo_discount = (parseFloat(store.discount)) + parseFloat(store.gogo_discount_extra);


                    if (parseFloat(store.gcg_buy) != 0) {
                        store.gogo_buy = parseFloat(store.gcg_buy) + 1;
                        var t = Math.floor((100 - store.gogo_discount - parseFloat(store.gogo_buy)) * 100) / 100;
                        store.spread = Math.floor(t / (100 - store.gogo_discount) * 100000) / 1000;

                        // console.log("t init",store.gogo_discount,store.gogo_buy ,t);
                    } else {
                        store.gogo_buy = 1;
                        store.spread = "";
                    }


                    stores.push(store);


                };

                res.json(stores);
            });


        });

    });
});


/* GET /featured store. */
router.get('/featured', function(req, res, next) {
    var data = [{
        name: "Gamestop",
        discount: 10
    }, {
        name: "AMC",
        discount: 20,
    }, {
        name: "Bestbuy",
        discount: 14
    }, {
        name: "Apple",
        discount: 18
    }, {
        name: "Home Depot",
        discount: 30
    }, {
        name: "Alamo",
        discount: 13
    }];
    res.json(data);
});


router.get('/stats', function(req, res, next) {

    var result = {

        cards: {
            available: 0,
            sold: 0
        },
        guests: {

        }
    };

    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('select count(sold) as count,sold,status from sold_cards group by sold , status', [], function(err, rows) {
            if (err) return next(err);

            for (var i = 0; i < rows.length; i++) {
                if (rows[i].sold === 0) {
                    result.cards.available += rows[i].count;

                    if (rows[i].status === 'pending') {
                        result.cards.pending = rows[i].count;
                    }
                }

                if (rows[i].sold === 1) {
                    result.cards.sold = rows[i].count
                }
            };

            connection.query('select count(role) as count,role from users where id <>0  group by role', [], function(err, rows) {

                for (var i = 0; i < rows.length; i++) {
                    if (rows[i].role === 'user') {
                        result.users = rows[i].count
                    }

                    if (rows[i].role === 'dealer') {
                        result.dealers = rows[i].count
                    }
                };

                connection.query('select sum(total_amount) as revenue from orders', [], function(err, rows) {

                    result.revenue = rows[0].revenue;

                    connection.query('select sum(value*gogo_buy/100) as expense from sold_cards where status ="ok" ', [], function(err, rows) {

                        result.expense = rows[0].expense;

                        result.profit = result.revenue - result.expense;

                        connection.query('select count(id) as count from orders where user_id=0', [], function(err, rows) {

                            result.guests.buy_cards = rows[0].count;

                            connection.query('select count(id) as count from receipts where user_id=0', [], function(err, rows) {

                                result.guests.sell_cards = rows[0].count;

                                connection.query("select count(*) as count from (select 1 from sold_cards LEFT JOIN users ON users.id = sold_cards.sold_to_user where users.role='user' and sold_cards.sold_to_user <> 0 and sold_cards.sold=1 group by sold_cards.sold_to_user ) as me", [], function(err, rows) {

                                    result.users_buying = rows[0].count;

                                    connection.query("select count(*) as count from (select 1 from sold_cards LEFT JOIN users ON users.id = sold_cards.user_id where users.role='user' and sold_cards.user_id <> 0 group by sold_cards.user_id ) as me", [], function(err, rows) {

                                        result.users_selling = rows[0].count;

                                        connection.query("select count(*) as count from (select 1 from sold_cards LEFT JOIN users ON users.id = sold_cards.user_id where users.role='dealer' and sold_cards.user_id <> 0 group by sold_cards.user_id ) as me", [], function(err, rows) {

                                            result.dealers_selling = rows[0].count;

                                            connection.query("select count(*) as count from (select 1 from sold_cards LEFT JOIN users ON users.id = sold_cards.sold_to_user where users.role='dealer' and sold_cards.sold_to_user <> 0 and sold_cards.sold=1 group by sold_cards.sold_to_user ) as me", [], function(err, rows) {

                                                result.dealers_buying = rows[0].count;



                                                // calculate average margin, discount, profit
                                                connection.query('SELECT sum((gogo_buy*value/100)) as total_bought from sold_cards  where sold = 1', [], function(err, rows) {
                                                    if (err) return next(err);

                                                    var total_bought = rows[0].total_bought;

                                                    connection.query('SELECT sum(total_amount) as total_sold,sum(average_percentage)/count(id) as average_discount from orders ', [], function(err, rows) {
                                                        if (err) return next(err);

                                                        var total_sold = rows[0].total_sold;
                                                        var average_discount = rows[0].average_discount;

                                                        connection.query('SELECT count(id) as total_order from orders  ', [], function(err, rows) {
                                                            if (err) return next(err);

                                                            var total_order = rows[0].total_order;


                                                            result.average_margin = (total_sold - total_bought) / total_sold * 100;
                                                            result.average_profit = (total_sold - total_bought) / total_order;
                                                            result.average_discount = average_discount;

                                                            res.json(result);
                                                        });


                                                    });
                                                });


                                            });
                                        });
                                    });
                                });
                            });


                        });

                    });

                });


            });




        });

    });
});

router.get('/highest-payout', function(req, res, next) {

    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('select stats.id,gcg_buy,stores.name from stats LEFT JOIN stores on stores.id = stats.id order by gcg_buy DESC limit 4', [], function(err, rows) {
            if (err) return next(err);
            var ret = [];

            for (var i = 0; i < rows.length; i++) {
                var stat = {
                    name: rows[i].name.trim(),
                    payout: rows[i].gcg_buy + 1
                };

                ret.push(stat);
            };

            res.json(ret);
        });

    });
});

router.get('/popular-bought', function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('select count(store_id) as count,store_name from sold_cards where status = "ok" group by store_id order by count desc limit 10', [], function(err, rows) {
            if (err) return next(err);
            res.json(rows);
        });

    });
});



router.get('/popular-sold', function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('select count(store_id) as count,store_name from sold_cards where sold=1 group by store_id order by count desc limit 10', [], function(err, rows) {
            if (err) return next(err);
            res.json(rows);
        });

    });
});

router.get('/average', function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('SELECT sum((gogo_buy*value/100)) as total_bought from sold_cards  where sold = 1', [], function(err, rows) {
            if (err) return next(err);

            var total_bought = rows[0].total_bought;

            connection.query('SELECT sum(total_amount) as total_sold,sum(average_percentage)/count(id) as average_discount from orders ', [], function(err, rows) {
                if (err) return next(err);

                var total_sold = rows[0].total_sold;
                var average_discount = rows[0].average_discount;

                connection.query('SELECT count(id) as total_order from orders  ', [], function(err, rows) {
                    if (err) return next(err);

                    var total_order = rows[0].total_order;

                    var ret = {
                        total_bought: total_bought,
                        total_sold: total_sold,
                        average_margin: (total_sold - total_bought) / total_sold * 100,
                        average_profit: (total_sold - total_bought) / total_order,
                        average_discount: average_discount
                    }
                    res.json(ret);
                });


            });
        });

    });
});

router.get('/date-ranges', function(req, res, next) {

    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('select min(created_date) as min_date, max(created_date) as max_date from sold_cards JOIN receipts ON receipts.id = sold_cards.receipt_id', [], function(err, rows) {
            if (err) return next(err);


            res.json(rows[0]);
        });

    });
});

router.get('/limits', function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('select * from stores', function(err, rows) {
            if (err) return next(err);


            var stores = JSON.parse(JSON.stringify(rows));


            var query;


            query = 'SELECT count(store_id) as count, store_name, store_id from sold_cards LEFT JOIN receipts ON receipts.id = sold_cards.receipt_id  where sold = 0 and sold_cards.status = "ok" group by store_id ';

            req.getConnection(function(err, connection) {
                if (err) return next(err);
                connection.query(query, [], function(err, rows) {
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

                    res.json(stores)
                });

            });
        });

    });
});

// get all cards from a store
router.get('/:name', function(req, res, next) {
    var storeName = req.params.name;

    console.log("mewerwer");


    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('select * from stores where name = ?', [storeName], function(err, rows) {
            if (err) return next(err);



            // var storeId = rows[0].id
            // 
            // res.json(rows);


            if (rows.length == 0) {
                res.statusCode = 400;
                res.json({
                    message: 'No store found'
                });

                return;
            }

            var storeId = rows[0].id;

            connection.query('select max(id) as id from cards where store_id = ?', [storeId], function(err, rows) {
                if (err) return next(err);

                var cardId = rows[0].id;
                connection.query('select stores.id, stores.name as name, cards.discount, stats.gcg_buy,stats.gogo_discount_extra, stats.fixed_discount from cards LEFT JOIN stores ON stores.id = cards.store_id   LEFT JOIN stats ON stats.id=cards.store_id where cards.id = ? order by store_id DESC', [cardId], function(err, rows) {
                    if (err) return next(err);

                    var stores = [];
                    for (var i = 0; i < rows.length; i++) {
                        var store = rows[i];
                        if (store.fixed_discount > 0) {
                            store.discount = store.fixed_discount;
                        }

                        store.name = store.name.trim();


                        if (StoresCat[store.name] != undefined) {
                            store.category = StoresCat[store.name];
                        }

                        store.gogo_discount = (parseFloat(store.discount)) + parseFloat(store.gogo_discount_extra);

                        if (parseFloat(store.gcg_buy) != 0) {
                            store.gogo_buy = parseFloat(store.gcg_buy) + 1;
                            var t = Math.floor((100 - store.gogo_discount - parseFloat(store.gogo_buy)) * 100) / 100;
                            store.spread = Math.floor(t / (100 - store.gogo_discount) * 100000) / 1000;

                            // console.log("t init",store.gogo_discount,store.gogo_buy ,t);
                        } else {
                            store.gogo_buy = 1;
                            store.spread = "";
                        }

                        stores.push(store);
                    };

                    var store = stores[0];


                    connection.query('select * from sold_cards where store_id = ? and sold = 0 and status = "ok" ', [storeId], function(err, rows) {
                        if (err) return next(err);

                        var data = [];

                        for (var i = rows.length - 1; i >= 0; i--) {
                            var val = rows[i].value;
                            var discount = store.gogo_discount;
                            var pay = (100 - discount) * val / 100;

                            // 6% above the original bought value
                            var minimum_pay = rows[i].bought_value * 1.061;
                            var stopLoss = false;
                            if (pay < minimum_pay) {
                                pay = minimum_pay;
                                discount = 100 - pay / val * 100;
                                stopLoss = true;
                            }

                            var item = {
                                "id": rows[i].id,
                                "store_id": store.id,
                                "name": store.name,
                                "type": "Physical",
                                "value": val,
                                "pay": pay,
                                "save": discount,
                                "stop_loss": stopLoss
                            }

                            data.push(item)
                        };

                        res.json(data);

                    });


                });
            });

            // console.log(ids);



        });

    });
});


router.put('/:id', function(req, res, next) {

    var dat = req.body;

    req.getConnection(function(err, connection) {
        if (err) return next(err);

        var updatedDat = {
            limit: dat.limit
        }

        connection.query('UPDATE stores SET  ? where id = ?', [updatedDat, req.params.id], function(err, rows) {
            if (err) return next(err);
            var rdat = rows[0];
            res.json(rdat);
        });

    });
});



module.exports = router;