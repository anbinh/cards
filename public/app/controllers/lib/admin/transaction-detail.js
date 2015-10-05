'use strict';


module.exports = function(m) {
    m.controller('AdminTransactionDetailController', function($scope, $rootScope, store, $location, storeService, authService, $timeout, TransactionDetail) {

        authService.adminAuthenticate();


        $rootScope.$broadcast('CHANGE_SIDEBAR_ITEM', 'transactions', '');

        console.log(TransactionDetail);

        $scope.transaction = TransactionDetail;

        if ($scope.transaction.billingUser.id === 0) {
            $scope.transaction.billingUser.role = 'Guest';
            $scope.transaction.billingUser.className = 'label-warning';
        } else {
            if ($scope.transaction.billingUser.role === '' || $scope.transaction.billingUser.role === undefined) {
                $scope.transaction.billingUser.role = 'Regular User';
                $scope.transaction.billingUser.className = 'label-primary';
            } else {
                if ($scope.transaction.billingUser.role === 'user') {
                    $scope.transaction.billingUser.role = 'Regular User';
                    $scope.transaction.billingUser.className = 'label-primary';
                } else {
                    if ($scope.transaction.billingUser.role === 'dealer') {
                        $scope.transaction.billingUser.role = 'Dealer';
                        $scope.transaction.billingUser.className = 'label-success';
                    }
                }
            }
        }




        $timeout(function() {
            $('#datatable-default').dataTable();
        });
    });
};