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

            connection.query('select stores.id, stores.name as name, cards.discount, stats.gcg_buy,stats.gogo_discount_extra, stats.fixed_discount from cards LEFT JOIN stores ON stores.id = cards.store_id   LEFT JOIN stats ON stats.id=cards.store_id where cards.id in ( ' + ids + ' ) order by store_id DESC', [], function(err, rows) {
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

router.get('/best-selling', function(req, res, next) {
    var data = [{
        name: "target",
        discount: 10
    }, {
        name: "walmart",
        discount: 20,
    }, {
        name: "bestbuy",
        discount: 14
    }, {
        name: "starbucks",
        discount: 18
    }];
    res.json(data);
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


                    // generate fake cards
                    var cardNo = Math.random() * 100 | 0;
                    var data = [];
                    for (var i = cardNo - 1; i >= 0; i--) {
                        var val = ((Math.random() * 50000 | 0) / 100) | 0;
                        var discount = store.gogo_discount;
                        var pay = (100 - discount) * val / 100;
                        var item = {
                            "store_id": store.id,
                            "name": store.name,
                            "type": "Physical",
                            "value": val,
                            "pay": pay,
                            "save": discount
                        }

                        data.push(item)
                    };


                    res.json(data);
                });
            });

            // console.log(ids);



        });

    });
});




module.exports = router;