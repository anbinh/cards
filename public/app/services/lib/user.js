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
                'getOrdersByUserId': {
                    method: 'GET',
                    'url': '/api/users/orders/:id',
                    isArray: true
                },
            });
        }
    ]);
};