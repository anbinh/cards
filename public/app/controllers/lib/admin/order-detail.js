'use strict';


module.exports = function(m) {
    m.controller('AdminOrderDetailController', function($scope, $rootScope, store, $location, storeService, authService, $timeout, OrderDetail) {

        authService.adminAuthenticate();

        $rootScope.$broadcast('CHANGE_SIDEBAR_ITEM', 'cards', 'sold_cards');


        console.log(OrderDetail);

        $scope.order = OrderDetail;

        if ($scope.order.billingUser.id === 0) {
            $scope.order.billingUser.role = 'Guest';
            $scope.order.billingUser.className = 'label-warning';
        } else {
            if ($scope.order.billingUser.role === '' || $scope.order.billingUser.role === undefined) {
                $scope.order.billingUser.role = 'Regular User';
                $scope.order.billingUser.className = 'label-primary';
            } else {
                if ($scope.order.billingUser.role === 'user') {
                    $scope.order.billingUser.role = 'Regular User';
                    $scope.order.billingUser.className = 'label-primary';
                }
            }
        }

        $timeout(function() {
            $('#datatable-default').dataTable();
        });

    });
};