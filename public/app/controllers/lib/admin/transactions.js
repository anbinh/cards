'use strict';


module.exports = function(m) {
    m.controller('AdminTransactionsController', function($scope, $rootScope, store, $location, storeService, authService, $timeout, Transactions) {


        authService.adminAuthenticate();

        $rootScope.$broadcast('CHANGE_SIDEBAR_ITEM', 'transactions', '');


        $scope.transactions = Transactions;

        for (var i = 0; i < $scope.transactions.length; i = i + 1) {
            if ($scope.transactions[i].billingUser.id === 0) {
                $scope.transactions[i].billingUser.role = 'Guest';
                $scope.transactions[i].billingUser.className = 'label-warning';
            } else {
                if ($scope.transactions[i].billingUser.role === '' || $scope.transactions[i].billingUser.role === undefined) {
                    $scope.transactions[i].billingUser.role = 'User';
                    $scope.transactions[i].billingUser.className = 'label-primary';
                } else {
                    if ($scope.transactions[i].billingUser.role === 'user') {
                        $scope.transactions[i].billingUser.role = 'User';
                        $scope.transactions[i].billingUser.className = 'label-primary';
                    } else {
                        if ($scope.transactions[i].billingUser.role === 'dealer') {
                            $scope.transactions[i].billingUser.role = 'Dealer';
                            $scope.transactions[i].billingUser.className = 'label-success';
                        }
                    }
                }
            }
        }

        $scope.transactionDetail = function(id) {


            $location.url('transactions/' + id);
        };



        $timeout(function() {
            $('#datatable-default').dataTable();
        });
    });
};