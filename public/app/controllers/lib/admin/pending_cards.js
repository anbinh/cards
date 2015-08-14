'use strict';


module.exports = function(m) {
    m.controller('AdminPendingCardsController', function($scope, $rootScope, store, $location, storeService, authService, $timeout, ReceiptList, sellingCardsService) {


        authService.adminAuthenticate();

        $rootScope.$broadcast('CHANGE_SIDEBAR_ITEM', 'cards', 'pending_cards');



        $scope.receipts = ReceiptList;



        $timeout(function() {
            $('#datatable-default').dataTable({
                paging: false
            });
        });

        for (var i = 0; i < $scope.receipts.length; i = i + 1) {
            if ($scope.receipts[i].billingUser.id === 0) {
                $scope.receipts[i].billingUser.role = 'Guest';
                $scope.receipts[i].billingUser.className = 'label-warning';
            } else {
                if ($scope.receipts[i].billingUser.role === '' || $scope.receipts[i].billingUser.role === undefined) {
                    $scope.receipts[i].billingUser.role = 'User';
                    $scope.receipts[i].billingUser.className = 'label-primary';
                } else {
                    if ($scope.receipts[i].billingUser.role === 'user') {
                        $scope.receipts[i].billingUser.role = 'User';
                        $scope.receipts[i].billingUser.className = 'label-primary';
                    } else {
                        if ($scope.receipts[i].billingUser.role === 'dealer') {
                            $scope.receipts[i].billingUser.role = 'Dealer';
                            $scope.receipts[i].billingUser.className = 'label-success';
                        }
                    }
                }
            }
        }

        $scope.receiptDetail = function(id) {
            $location.url('receipts/' + id);
        };

    });
};