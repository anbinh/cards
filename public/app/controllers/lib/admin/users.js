'use strict';


module.exports = function(m) {
    m.controller('AdminUsersController', function($scope, $rootScope, store, $location, storeService, authService, $timeout, UserList) {


        authService.adminAuthenticate();

        $rootScope.$broadcast('CHANGE_SIDEBAR_ITEM', 'customers', 'users');

        console.log(UserList);

        $scope.users = UserList;


        $timeout(function() {
            $('#datatable-default').dataTable();
        });
    });
};