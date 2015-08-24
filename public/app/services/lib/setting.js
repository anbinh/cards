'use strict';


module.exports = function(m) {
    m.factory('settingService', ['$resource',
        function($resource) {

            return $resource('/api/settings/:id', null, {
                'get': {
                    method: 'GET',
                    'url': '/api/settings/:id'
                },
                'query': {
                    method: 'GET',
                    isArray: true,
                    'url': '/api/settings'
                },
                'update': {
                    method: 'PUT'
                },
            });
        }
    ]);
};