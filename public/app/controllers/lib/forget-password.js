'use strict';


module.exports = function(m) {
    m.controller('ForgetPasswordController', ['$scope', '$location', '$routeParams', 'authService', 'store', 'userService',
        function($scope, $location, $routeParams, authService, store, userService) {

            $scope.forgetPassword = function() {

                userService.forgetPassword({
                    email: $scope.email
                }, function(ret) {
                    console.log(ret);
                    $scope.email = '';
                    swal({
                        title: 'Done',
                        text: 'An email to reset your password has been sent to your email',
                        type: 'success',
                        showCancelButton: true,
                        confirmButtonText: 'Go To Homepage',
                        closeOnConfirm: false,
                        confirmButtonColor: '#08C',
                    }, function() {
                        window.location = '/';
                    });
                }, function(err) {
                    swal('Error', err.data.message, 'error');
                });
            };

        }
    ]);
};