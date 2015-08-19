'use strict';


module.exports = function(m) {
    m.factory('orderService', ['$resource',
        function($resource) {

            return $resource('/api/orders/:id', null, {
                'get': {
                    method: 'GET',
                    'url': '/api/orders/:id'
                },
                'query': {
                    method: 'GET',
                    isArray: true,
                    'url': '/api/orders'
                },
                'sendGiftCards': {
                    method: 'GET',
                    'url': '/api/orders/giftcards/:id'
                }

            });
        }
    ]);
};