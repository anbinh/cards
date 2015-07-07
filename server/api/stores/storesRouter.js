'use strict';

var express = require('express');
var router = express.Router();


// Get all store
router.get('/', function(req, res, next) {
    var data = [{
        "name": "target",
        "category": "B",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "walmart",
        "category": "B",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "marshalls",
        "category": "B",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "tj-maxx",
        "category": "B",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "cvs",
        "category": "B",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "sears",
        "category": "B",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "babies-r-us",
        "category": "B",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "office-depot",
        "category": "B",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "pet-co",
        "category": "B",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "walgreens",
        "category": "B",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "staples",
        "category": "B",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "pet-smart",
        "category": "B",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "advance-auto-parts",
        "category": "B",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "brookstone",
        "category": "B",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "kmart",
        "category": "B",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "rite-aid",
        "category": "B",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "auto-zone",
        "category": "B",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "office-max",
        "category": "B",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "family-dollar",
        "category": "B",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "macys",
        "category": "C",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "bloomingdales",
        "category": "C",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "old-navy",
        "category": "C",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "gap",
        "category": "C",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "victorias-secret",
        "category": "C",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "nordstrom",
        "category": "C",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "american-eagle",
        "category": "C",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "jcpenney",
        "category": "C",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "dsw",
        "category": "C",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "forever-21",
        "category": "C",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "ross",
        "category": "C",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "nike",
        "category": "C",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "express",
        "category": "C",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "h-and-m",
        "category": "C",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "lane-bryant",
        "category": "C",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "pac-sun",
        "category": "C",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "lord-and-taylor",
        "category": "C",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "neiman-marcus",
        "category": "C",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "lands-end",
        "category": "C",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "famous-footwear",
        "category": "C",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "abercrombie-and-fitch",
        "category": "C",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "i-tunes",
        "category": "E",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "amazon",
        "category": "E",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "best-buy",
        "category": "E",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "game-stop",
        "category": "E",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "toys-r-us",
        "category": "E",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "amc-theatres",
        "category": "E",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "fandango",
        "category": "E",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "regal-cinemas",
        "category": "E",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "regal-entertainment",
        "category": "E",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "hyatt-hotels",
        "category": "E",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "southwest-airlines",
        "category": "E",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "apple",
        "category": "E",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "dicks-sporting-goods",
        "category": "E",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "sports-authority",
        "category": "E",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "bass-pro-shops",
        "category": "E",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "starbucks",
        "category": "F",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "applebees",
        "category": "F",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "outback-steakhouse",
        "category": "F",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "dunkin-donuts",
        "category": "F",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "tgi-fridays",
        "category": "F",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "mcdonalds",
        "category": "F",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "whole-foods",
        "category": "F",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "chilis-restaurants",
        "category": "F",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "darden-restaurants",
        "category": "F",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "red-lobster",
        "category": "F",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "flemings",
        "category": "F",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "cold-stone-creamery",
        "category": "F",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "ihop",
        "category": "F",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "subway",
        "category": "F",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "ruths-chris-steak-house",
        "category": "F",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "panera-bread",
        "category": "F",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "chipotle",
        "category": "F",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "macaroni-grill",
        "category": "F",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "coffee-bean-and-tea-leaf",
        "category": "F",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "dominos-pizza",
        "category": "F",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "smoothie-king",
        "category": "F",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "home-depot",
        "category": "H",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "lowes",
        "category": "H",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "sephora",
        "category": "H",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "kohls",
        "category": "H",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "bath-and-body-works",
        "category": "H",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "home-goods",
        "category": "H",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "bed-bath-and-beyond",
        "category": "H",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "pottery-barn",
        "category": "H",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "shell",
        "category": "H",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "crate-and-barrel",
        "category": "H",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "michaels",
        "category": "H",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "bp-amoco",
        "category": "H",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "williams-sonoma",
        "category": "H",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }, {
        "name": "buybuy-baby",
        "category": "H",
        "discount": Math.random() * 80 | 0,
        "price": Math.random() * 300 | 0
    }];
    res.json(data);
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

    var cardNo = Math.random() * 100 | 0;
    var data = [];
    for (var i = cardNo - 1; i >= 0; i--) {
        var val = (Math.random() * 10000 | 0) / 100;
        var discount = (Math.random() * 2000 | 0) / 100;
        var pay = (val - discount) | 0;
        var item = {
            "name": storeName,
            "type": "Physical",
            "value": val,
            "pay": pay,
            "save": (((val - pay) / val) * 1000 | 0) / 10
        }

        data.push(item)
    };

    res.json(data);
});




module.exports = router;