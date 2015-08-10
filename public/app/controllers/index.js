'use strict';
var m = angular.module('ht.controllers', []);


// controllers
require('./lib/home')(m);
require('./lib/store-list')(m);
require('./lib/sell-cards')(m);
require('./lib/sell-cards-card-info')(m);
require('./lib/sell-cards-customer-info')(m);
require('./lib/sell-cards-receipt')(m);

require('./lib/checkout')(m);
require('./lib/review_order')(m);
require('./lib/login')(m);
require('./lib/register')(m);
require('./lib/profile')(m);
require('./lib/profile-edit')(m);
require('./lib/profile-order-list')(m);
require('./lib/profile-order-detail')(m);
require('./lib/profile-sold-cards-list')(m);
require('./lib/profile-sold-cards-details')(m);
require('./lib/forget-password')(m);
require('./lib/reset-password')(m);
require('./lib/shopping-cart')(m);
require('./lib/store-detail')(m);
require('./lib/header')(m);

require('./lib/admin/index')(m);
require('./lib/admin/users')(m);
require('./lib/admin/guests')(m);
require('./lib/admin/dealers')(m);
require('./lib/admin/inventory')(m);
require('./lib/admin/inventory-retailer')(m);
require('./lib/admin/orders')(m);
require('./lib/admin/receipts')(m);
require('./lib/admin/sidebar')(m);
require('./lib/admin/order-detail')(m);
require('./lib/admin/receipt-detail')(m);
require('./lib/admin/login')(m);
require('./lib/admin/head')(m);
require('./lib/admin/cards')(m);
require('./lib/admin/sold_cards')(m);
require('./lib/admin/user-profile')(m);
require('./lib/admin/dealer-profile')(m);
require('./lib/admin/retailer-limit')(m);

module.exports = m;