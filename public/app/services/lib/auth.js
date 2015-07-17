'use strict';


module.exports = function(m) {

    m.factory('authService', ['store', '$location', 'userService', '$modal', '$http',
        function(store, $location, userService, $modal, $http) {



            var login = function(callback) {

            };


            // 
            var logout = function(callback) {

            };

            var auth = function() {

            };

            var adminAuthenticate = function() {

                console.log('CURRENT LOGGINED USER', store.get('user'));
                if (store.get('admin')) {
                    return true;
                } else {
                    window.location = '/admin-login/#/'
                    return false;
                }
            };

            var isAuthenticated = function() {

                console.log('CURRENT LOGGINED USER', store.get('user'));
                if (store.get('user')) {
                    return true;
                } else {
                    return false;
                }
            };



            return {
                'login': login,
                'logout': logout,
                'auth': auth,
                'adminAuthenticate': adminAuthenticate,

            };
        }
    ]);
};