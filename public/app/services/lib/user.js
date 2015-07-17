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
                'get': {
                    method: 'GET'
                },
                'dealers': {
                    method: 'GET',
                    'url': '/api/users/dealers',
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