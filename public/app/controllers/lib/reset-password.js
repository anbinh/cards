'use strict';


module.exports = function(m) {
    m.controller('ResetPasswordController', ['$scope', '$location', '$routeParams', 'authService', 'store', 'userService',
        function($scope, $location, $routeParams, authService, store, userService) {



            $scope.resetPassword = function() {
                if ($scope.password !== $scope.password2) {
                    swal('Error!', 'Your password does not match', 'error');
                    return;
                }


                userService.resetPassword({
                    token: $routeParams.token,
                    password: $scope.password
                }, function(ret) {
                    console.log(ret);

                    $scope.password = '';
                    $scope.password2 = '';
                    swal({
                        title: 'Done',
                        text: 'Your password has been reset',
                        type: 'success',
                        showCancelButton: true,
                        confirmButtonText: 'Login',
                        closeOnConfirm: false,
                        confirmButtonColor: '#08C',
                    }, function() {
                        window.location = '/login/';
                    });

                }, function(err) {
                    swal('Error', err.data.message, 'error');
                });
            };

        }
    ]);
};