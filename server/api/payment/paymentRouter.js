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
// 
var request = require('request');

/* GET /accepted . */
router.get('/accepted', function(req, res, next) {

    console.log(req.query);
    res.json({
        name: 'payment accepted',
        type: 'accepted',
        query: req.query
    });

});

/* GET /declined . */
router.get('/declined', function(req, res, next) {
    console.log(req.query);
    res.json({
        name: 'payment declined',
        type: 'declined',
        query: req.query
    });

});

router.get('/test', function(req, res, next) {


    request({
        url: 'https://trans.pacepayment.com/cgi-bin/process.cgi', //URL to hit
        method: 'POST',
        //Lets post the following key/values as form
        form: {
            action: 'ns_quicksale_cc',
            acctid: 'PAB66',
            merchantpin: 'ZLWTH2IPZ8WBVYBZ2HH4MLVP7706PY0I',
            amount: '1.00',
            ccname: 'TonyTest',
            ccnum: '4111111111111111',
            expmon: '09',
            expyear: '2017',
            accepturl: 'http://cardslyce.com/api/payment/accepted',
            declineurl: 'http://cardslyce.com/api/payment/declined'
        }
    }, function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            console.log(response.statusCode, body);

            res.json(JSON.parse(body));
        }
    });

});






module.exports = router;