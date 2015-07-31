'use strict';


module.exports = function(m) {
    m.controller('AdminInventoryRetailerController', function($scope, $rootScope, store, $location, storeService, authService, $timeout, Retailers) {


        authService.adminAuthenticate();

        $rootScope.$broadcast('CHANGE_SIDEBAR_ITEM', 'inventory', '');

        $scope.retailers = Retailers;


        $timeout(function() {
            $('#datatable-default').dataTable();
        });

    });
};