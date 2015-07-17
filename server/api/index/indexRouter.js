'use strict';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', {
        title: 'School Service App'
    });
});


/* GET project page. */
// for buying cards
router.get('/stores', function(req, res) {
    res.render('main', {
        route: "stores"
    });
});

router.get('/sell-cards', function(req, res) {
    res.render('main', {
        route: "sell-cards"
    });
});


router.get('/shopping-cart', function(req, res) {
    res.render('main', {
        route: "shopping-cart"
    });
});

router.get('/checkout', function(req, res) {
    res.render('main', {
        route: "checkout"
    });
});


router.get('/about-us', function(req, res) {
    res.render('about-us', {});
});

router.get('/terms-and-conditions', function(req, res) {
    res.render('tos', {});
});

router.get('/unauthorized', function(req, res) {
    res.render('unauthorized', {});
});

router.get('/values', function(req, res) {
    res.render('values', {});
});

router.get('/contact-us', function(req, res) {
    res.render('contact-us', {});
});

router.get('/login', function(req, res) {
    res.render('main', {
        route: 'login'
    });
});

router.get('/register', function(req, res) {
    res.render('main', {
        route: "register"
    });
});

router.get('/forget-password', function(req, res) {
    res.render('main', {
        route: "forget-password"
    });
});

router.get('/reset-password', function(req, res) {
    res.render('main', {
        route: "reset-password"
    });
});


router.get('/profile', function(req, res) {
    res.render('main', {
        route: "profile"
    });
});


router.get('/dashboard', function(req, res) {
    res.render('dashboard', {

    });
});

router.get('/admin-login', function(req, res) {
    res.render('admin_login', {

    });
});


module.exports = router;