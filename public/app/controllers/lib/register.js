'use strict';


module.exports = function(m) {
    m.controller('RegisterController', ['$scope', '$location', '$routeParams', 'authService', 'store', 'userService', 'isDealer',
        function($scope, $location, $routeParams, authService, store, userService, isDealer) {


            $scope.isDealer = isDealer;

            $scope.signUp = function() {
                console.log('NEW USER', $scope.user);

                var user = angular.copy($scope.user);

                var UserService = userService;

                if (user.password !== user.password2) {
                    swal('Error!', 'Your password does not match', 'error');
                    return;
                }

                delete user.password2;

                if (isDealer === true) {
                    user.role = 'dealer';
                }

                var us = new UserService(user);
                us.$save(function(result) {
                    store.set('user', result);

                    window.location = '/profile';


                }, function(err) {
                    // console.log("ERRR", err);
                    swal('Error', err.data.message, 'error');
                });
            };
        }
    ]);
};