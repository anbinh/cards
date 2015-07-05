'use strict';
var m = angular.module('ht.services', []);


// factories
require('./lib/store')(m);
require('./lib/user')(m);
require('./lib/auth')(m);
require('./lib/order')(m);



module.exports = m;