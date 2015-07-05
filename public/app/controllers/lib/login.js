'use strict';


module.exports = function(m) {
    m.controller('LoginController', ['$scope', '$location', '$routeParams', 'authService', 'store', 'userService',
        function($scope, $location, $routeParams, authService, store, userService) {


            $scope.login = function() {
                userService.login($scope.user, function(ret) {

                    console.log(ret);
                    store.set('user', ret);
                    window.location = '/profile';
                }, function(err) {
                    swal('Error', err.data.message, 'error');
                });
            };
        }
    ]);
};