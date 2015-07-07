'use strict';


module.exports = function(m) {
    m.controller('LoginController', ['$scope', '$location', '$routeParams', 'authService', 'store', 'userService',
        function($scope, $location, $routeParams, authService, store, userService) {

            console.log('LOGIN', $routeParams);

            $scope.login = function() {
                userService.login($scope.user, function(ret) {

                    console.log(ret);
                    store.set('user', ret);


                    if ($routeParams.forward_url !== '' && $routeParams.forward_url != undefined) {
                        console.log('$routeParams.forward_url', atob($routeParams.forward_url));
                        window.location = atob($routeParams.forward_url);
                    } else {
                        window.location = '/profile/';
                    }

                }, function(err) {
                    swal('Error', err.data.message, 'error');
                });
            };
        }
    ]);
};