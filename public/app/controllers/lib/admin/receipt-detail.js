'use strict';


module.exports = function(m) {
    m.controller('AdminReceiptDetailController', function($scope, $rootScope, store, $location, storeService, authService, $timeout, ReceiptDetail, receiptService) {

        authService.adminAuthenticate();


        $rootScope.$broadcast('CHANGE_SIDEBAR_ITEM', 'cards', 'receipts');

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


        $scope.addToInventory = function() {

            swal({
                    title: 'Are you sure?',
                    text: 'Do you want to add all these cards to the inventory',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#47A447',
                    confirmButtonText: 'Yes, Add These Cards',
                    closeOnConfirm: true
                },
                function() {
                    if ($scope.receipt.status === 'pending') {
                        receiptService.putToInventory({
                            id: $scope.receipt.id
                        }, function(ret) {
                            if (ret.status === 'fail') {
                                swal('Error', ret.message, 'error');
                            } else {
                                // $scope.receipt.status = 'ok';

                                // for (var i = 0; i < $scope.receipt.cards.length; i++) {
                                //     $scope.receipt.cards[i].status = 'ok';
                                // };
                                window.location.reload(true);
                            }
                        });
                    }
                });


        };

        $timeout(function() {
            $('#datatable-default').dataTable();
        });
    });
};