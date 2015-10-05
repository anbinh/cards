'use strict';

module.exports = function(m) {
    m.factory('transactionService', ['$resource',
        function($resource) {

            return $resource('/api/transactions/:id', null, {


            });
        }
    ]);
};