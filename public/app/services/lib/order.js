'use strict';


module.exports = function(m) {
    m.factory('orderService', ['$resource',
        function($resource) {

            return $resource('/api/orders/:id', null, {
                'get': {
                    method: 'GET',
                    'url': '/api/orders/:id'
                }

            });
        }
    ]);
};