'use strict';


module.exports = function(m) {
    m.controller('AdminLoginController', function($scope, $rootScope, store, $location, storeService, authService, userService) {

        $scope.login = function() {
            userService.adminLogin($scope.user, function(ret) {


                store.set('admin', ret);


                window.location = '/dashboard/#/';

            }, function(err) {
                swal('Error', err.data.message, 'error');
                $scope.user.username = '';
                $scope.user.password = '';
            });
        };
    });
};