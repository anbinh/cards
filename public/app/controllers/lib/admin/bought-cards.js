'use strict';


module.exports = function(m) {
    m.controller('AdminBoughtCardsController', function($scope, $rootScope, store, $location, storeService, authService, $timeout, Receipts) {


        authService.adminAuthenticate();

        $rootScope.$broadcast('CHANGE_SIDEBAR_ITEM', 'cards', 'bought_cards');

        console.log(Receipts);

        $scope.receipts = Receipts;

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
        };

        $scope.goToReceiptDetail = function(id) {


            $location.url('cards_bought/' + id);
        }



        $timeout(function() {
            $('#datatable-default').dataTable();
        });
    });
};