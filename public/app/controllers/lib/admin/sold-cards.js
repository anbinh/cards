'use strict';


module.exports = function(m) {
    m.controller('AdminSoldCardsController', function($scope, $rootScope, store, $location, storeService, authService, $timeout, Orders) {



        $rootScope.$broadcast('CHANGE_SIDEBAR_ITEM', 'cards', 'sold_cards');

        $scope.orders = Orders;

        for (var i = 0; i < $scope.orders.length; i = i + 1) {
            if ($scope.orders[i].billingUser.id === 0) {
                $scope.orders[i].billingUser.role = 'Guest';
                $scope.orders[i].billingUser.className = 'label-warning';
            } else {
                if ($scope.orders[i].billingUser.role === '' || $scope.orders[i].billingUser.role === undefined) {
                    $scope.orders[i].billingUser.role = 'User';
                    $scope.orders[i].billingUser.className = 'label-primary';
                } else {
                    if ($scope.orders[i].billingUser.role === 'user') {
                        $scope.orders[i].billingUser.role = 'User';
                        $scope.orders[i].billingUser.className = 'label-primary';
                    }
                }
            }
        };

        $scope.orderDetail = function(id) {
            $location.url('cards_sold/' + id);
        };

        $timeout(function() {
            $('#datatable-default').dataTable();
        });

    });
};