'use strict';
var m = angular.module('ht.controllers', []);


// controllers
require('./lib/home')(m);
require('./lib/store-list')(m);
require('./lib/sell-cards')(m);
require('./lib/sell-cards-card-info')(m);
require('./lib/sell-cards-customer-info')(m);
require('./lib/checkout')(m);
require('./lib/review_order')(m);
require('./lib/login')(m);
require('./lib/register')(m);
require('./lib/profile')(m);
require('./lib/profile-edit')(m);
require('./lib/profile-order-list')(m);
require('./lib/profile-order-detail')(m);
require('./lib/forget-password')(m);
require('./lib/reset-password')(m);
require('./lib/shopping-cart')(m);
require('./lib/store-detail')(m);
require('./lib/header')(m);


module.exports = m;