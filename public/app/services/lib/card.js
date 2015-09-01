'use strict';


module.exports = function(m) {
    m.factory('cardService', ['$resource',
        function($resource) {

            return $resource('/api/cards/:id', null, {
                'inquiry': {
                    method: 'POST',
                    'url': '/api/cards/inquiry'
                }

            });
        }
    ]);
};