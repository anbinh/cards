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
                'highestPayout': {
                    method: 'GET',
                    'url': '/api/stores/highest-payout',
                    isArray: true
                },
                'get': {
                    method: 'GET',
                    'url': '/api/stores/:id',
                    isArray: true
                },
                'stats': {
                    method: 'GET',
                    'url': '/api/stores/stats'
                },
                'popularBought': {
                    method: 'GET',
                    'url': '/api/stores/popular-bought',
                    isArray: true
                },
                'popularSold': {
                    method: 'GET',
                    'url': '/api/stores/popular-sold',
                    isArray: true
                },
                'average': {
                    method: 'GET',
                    'url': '/api/stores/average'
                }
            });
        }
    ]);
};