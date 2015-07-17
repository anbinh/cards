'use strict';


module.exports = function(m) {
    m.controller('AdminDealersController', function($scope, $rootScope, store, $location, storeService, authService, $timeout, DealerList) {

        authService.adminAuthenticate();
        $rootScope.$broadcast('CHANGE_SIDEBAR_ITEM', 'customers', 'dealers');

        console.log(DealerList);

        $scope.dealers = DealerList;

        $scope.dealerDeatail = function(id) {
            $location.url('dealer-profile/' + id);
        }


        $timeout(function() {
            $('#datatable-default').dataTable();
        });

    });
};