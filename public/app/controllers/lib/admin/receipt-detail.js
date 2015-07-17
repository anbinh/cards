'use strict';


module.exports = function(m) {
    m.controller('AdminReceiptDetailController', function($scope, $rootScope, store, $location, storeService, authService, $timeout, ReceiptDetail) {

        authService.adminAuthenticate();


        $rootScope.$broadcast('CHANGE_SIDEBAR_ITEM', 'cards', 'bought_cards');

        console.log(ReceiptDetail);

        $scope.receipt = ReceiptDetail;

        if ($scope.receipt.billingUser.id === 0) {
            $scope.receipt.billingUser.role = 'Guest';
            $scope.receipt.billingUser.className = 'label-warning';
        } else {
            if ($scope.receipt.billingUser.role === '' || $scope.receipt.billingUser.role === undefined) {
                $scope.receipt.billingUser.role = 'Regular User';
                $scope.receipt.billingUser.className = 'label-primary';
            } else {
                if ($scope.receipt.billingUser.role === 'user') {
                    $scope.receipt.billingUser.role = 'Regular User';
                    $scope.receipt.billingUser.className = 'label-primary';
                } else {
                    if ($scope.receipt.billingUser.role === 'dealer') {
                        $scope.receipt.billingUser.role = 'Dealer';
                        $scope.receipt.billingUser.className = 'label-success';
                    }
                }
            }
        }




        $timeout(function() {
            $('#datatable-default').dataTable();
        });
    });
};