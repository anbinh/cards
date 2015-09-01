'use strict';

var express = require('express');
var router = express.Router();

var sys = require('sys')
var exec = require('child_process').exec;
var child;

router.post('/inquiry', function(req, res, next) {
    var dat = req.body;

    // console.log('dat', dat);



    var commandLine = "php server/api/cards/inquiry.php " + dat.card_number + " ";
    commandLine += dat.retailer_id + " ";
    commandLine += dat.pin;


    // executes `pwd`
    child = exec(commandLine, function(error, stdout, stderr) {
        // sys.print('stdout: ' + stdout);
        sys.print('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);

            res.json({
                success: false,
                message: error
            })
        } else {
            var ret = JSON.parse(stdout);
            res.json(ret);
        }


    });
});

// 


module.exports = router;