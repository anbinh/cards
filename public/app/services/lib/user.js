'use strict';


module.exports = function(m) {
    m.factory('userService', ['$resource',
        function($resource) {

            return $resource('/api/users/:id', null, {
                'update': {
                    method: 'PUT'
                },
                'login': {
                    method: 'POST',
                    'url': '/api/users/login',
                },
                'adminLogin': {
                    method: 'POST',
                    'url': '/api/users/admin-login',
                },
                'get': {
                    method: 'GET'
                },
                'dealers': {
                    method: 'GET',
                    'url': '/api/users/dealers',
                    isArray: true
                },
                'profile': {
                    method: 'GET',
                    'url': '/api/users/profile/:id'
                },
                'guestsSellingCards': {
                    method: 'GET',
                    'url': '/api/users/guests/sell_cards',
                    isArray: true
                },
                'guestsBuyingCards': {
                    method: 'GET',
                    'url': '/api/users/guests/buy_cards',
                    isArray: true
                },
                'inventory': {
                    method: 'GET',
                    'url': '/api/users/inventory',
                    isArray: true
                },
                'inventoryByRetailer': {
                    method: 'GET',
                    'url': '/api/users/inventory_by_retailer',
                    isArray: true
                },
                'cards': {
                    method: 'GET',
                    'url': '/api/users/cards',
                    isArray: true
                },
                'soldCards': {
                    method: 'GET',
                    'url': '/api/users/sold-cards',
                    isArray: true
                },
                'pendingCards': {
                    method: 'GET',
                    'url': '/api/users/pending-cards',
                    isArray: true
                },
                'forgetPassword': {
                    method: 'POST',
                    'url': '/api/users/forget-password',
                },
                'resetPassword': {
                    method: 'POST',
                    'url': '/api/users/reset-password',
                },
                'pay': {
                    method: 'POST',
                    'url': '/api/users/pay-order',
                },
                'sellCards': {
                    method: 'POST',
                    'url': '/api/users/sell-cards',
                },
                'getOrdersByUserId': {
                    method: 'GET',
                    'url': '/api/users/orders/:id',
                    isArray: true
                },
                'getSoldCardsByUserId': {
                    method: 'GET',
                    'url': '/api/users/sold-cards-list/:id',
                    isArray: true
                }
            });
        }
    ]);
};