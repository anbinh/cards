'use strict';

var express = require('express');
var router = express.Router();



// get all settings
router.get('/', function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('SELECT * from settings', [], function(err, rows) {
            if (err) return next(err);

            res.json(rows)
        });

    });

});


router.put('/:id', function(req, res, next) {


    var dat = req.body;

    var updatedDat = {
        value: dat.value,
        description: dat.description,
    }
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('UPDATE settings SET  ? where id = ?', [updatedDat, req.params.id], function(err, rows) {
            if (err) return next(err);
            var rdat = rows[0];
            res.json(rdat);
        });

    });
});




module.exports = router;