'use strict';
var m = angular.module('ht.services', []);


// factories
require('./lib/store')(m);
require('./lib/user')(m);
require('./lib/auth')(m);
require('./lib/order')(m);
require('./lib/receipts')(m);
require('./lib/selling_cards')(m);
require('./lib/utils')(m);
require('./lib/setting')(m);
require('./lib/card')(m);
require('./lib/transactions')(m);

module.exports = m;