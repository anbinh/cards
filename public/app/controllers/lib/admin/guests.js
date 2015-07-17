'use strict';


module.exports = function(m) {
    m.controller('AdminGuestsController', function($scope, $rootScope, store, $location, storeService, authService, $timeout, GuestList, GuestType) {
        authService.adminAuthenticate();

        $rootScope.$broadcast('CHANGE_SIDEBAR_ITEM', 'customers', 'guests');

        $scope.users = GuestList;

        $scope.type = GuestType;

        $timeout(function() {
            $('#datatable-default').dataTable();
        });
    });
};