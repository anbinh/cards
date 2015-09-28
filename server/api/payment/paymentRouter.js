'use strict';

var express = require('express');
var router = express.Router();
var crypto = require('crypto');

// var nodemailer = require('nodemailer');

// create reusable transporter object using SMTP transport
// var transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//         user: 'mygiftcards14@gmail.com',
//         pass: 'ilovecards'
//     }
// });

var nodemailer = require('nodemailer');

var mandrillTransport = require('nodemailer-mandrill-transport');

var transporter = nodemailer.createTransport(mandrillTransport({
    auth: {
        apiKey: 'vlLsAGje1Fx4XBS4pckTSQ'
    }
}));

var sys = require('sys')
var exec = require('child_process').exec;
var child;

var ADMIN_EMAIL = 'admin@cardslyce.com';
// var ADMIN_EMAIL = 'tinhoc@outlook.com';

/* GET /accepted . */
router.get('/accepted', function(req, res, next) {

    console.log(req.query);
    res.json({
        name: 'payment accepted',
        query: req.query
    });

});

/* GET /declined . */
router.get('/declined', function(req, res, next) {
    console.log(req.query);
    res.json({
        name: 'payment declined',
        query: req.query
    });

});




module.exports = router;