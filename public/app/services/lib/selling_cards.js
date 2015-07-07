'use strict';


module.exports = function(m) {
    m.factory('sellingCardsService', ['$resource',
        function($resource) {

            return $resource('/api/selling_cards/:id', null, {
                'get': {
                    method: 'GET',
                    'url': '/api/selling_cards/:id'
                }

            });
        }
    ]);
};