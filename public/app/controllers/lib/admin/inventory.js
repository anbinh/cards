'use strict';


module.exports = function(m) {
    m.controller('AdminInventoryController', function($scope, $rootScope, store, $location, storeService, authService, $timeout, CardList) {


        authService.adminAuthenticate();

        $rootScope.$broadcast('CHANGE_SIDEBAR_ITEM', 'inventory', '');

        $scope.cards = CardList;


        $timeout(function() {
            $('#datatable-default').dataTable();
        });

    });
};