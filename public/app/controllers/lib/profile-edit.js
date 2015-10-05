'use strict';


module.exports = function(m) {
    m.controller('ProfileEditController', ['$scope', '$location', '$routeParams', 'authService', 'store', 'userService',
        function($scope, $location, $routeParams, authService, store, userService) {

            if (!authService.isAuthenticated()) {
                window.location = '/unauthorized/';
            }

            $scope.user = store.get('user');
            console.log($scope.user, 'edit user');


            $scope.update = function(paymentForm) {
                console.log('user', $scope.user);

                console.log('payment', paymentForm);

                if (paymentForm.cardNumber.$valid === false) {
                    swal('Error', 'The card number is not valid', 'error');
                    return;
                }

                userService.update({
                    id: $scope.user.id
                }, $scope.user, function(ret) {
                    console.log('USER HAS BEEN UPDATED', ret);
                    store.set('user', ret);

                    window.location = '/profile/';

                }, function(err) {
                    swal('Error', err.data.message, 'error');
                });
            };
        }
    ]);
};