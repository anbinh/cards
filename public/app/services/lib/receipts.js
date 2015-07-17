'use strict';

module.exports = function(m) {
    m.factory('receiptService', ['$resource',
        function($resource) {

            return $resource('/api/receipts/:id', null, {
                'get': {
                    method: 'GET',
                    'url': '/api/receipts/:id'
                }

            });
        }
    ]);
};