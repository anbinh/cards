'use strict';


module.exports = function(m) {
    m.factory('storeService', ['$resource',
        function($resource) {

            return $resource('/api/stores/:id', null, {
                'featured': {
                    method: 'GET',
                    'url': '/api/stores/featured',
                    isArray: true
                },
                'bestSelling': {
                    method: 'GET',
                    'url': '/api/stores/best-selling',
                    isArray: true
                },
                'get': {
                    method: 'GET',
                    'url': '/api/stores/:id',
                    isArray: true
                }
            });
        }
    ]);
};