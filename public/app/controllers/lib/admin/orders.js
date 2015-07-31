'use strict';


module.exports = function(m) {
    m.controller('AdminOrdersController', function($scope, $rootScope, store, $location, storeService, authService, $timeout, Orders) {

        authService.adminAuthenticate();



        $rootScope.$broadcast('CHANGE_SIDEBAR_ITEM', 'cards', 'orders');

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

            var cards = $scope.orders[i].cards;
            var storeList = [];

            for (var j = 0; j < cards.length; j = j + 1) {
                if (storeList.indexOf(cards[j].name) === -1) {
                    storeList.push(cards[j].name);
                }
            }

            $scope.orders[i].storeList = storeList;

        }

        console.log('order', $scope.orders);

        $scope.goToOrderDetail = function(id) {
            $location.url('orders/' + id);
        };

        $timeout(function() {
            $('#datatable-default').dataTable();
        });

    });
};