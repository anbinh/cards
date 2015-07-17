'use strict';


module.exports = function(m) {
    m.controller('AdminDealersController', function($scope, $rootScope, store, $location, storeService, authService, $timeout, DealerList) {


        $rootScope.$broadcast('CHANGE_SIDEBAR_ITEM', 'customers', 'dealers');

        console.log(DealerList);

        $scope.dealers = DealerList;


        $timeout(function() {
            $('#datatable-default').dataTable();
        });

    });
};