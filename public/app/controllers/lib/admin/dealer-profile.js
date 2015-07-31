'use strict';


module.exports = function(m) {
    m.controller('AdminDealerProfileController', function($scope, $rootScope, store, $location, storeService, authService, $timeout, DealerProfile) {

        authService.adminAuthenticate();

        // $rootScope.$broadcast('CHANGE_SIDEBAR_ITEM', 'cards', 'orders');


        console.log(DealerProfile);
        $scope.user = DealerProfile;

        if ($scope.user.id === 0) {
            $scope.user.role = 'Guest';
            $scope.user.className = 'label-warning';
        } else {
            if ($scope.user.role === '' || $scope.user.role === undefined) {
                $scope.user.role = 'Regular User';
                $scope.user.className = 'label-primary';
            } else {
                if ($scope.user.role === 'user') {
                    $scope.user.role = 'Regular User';
                    $scope.user.className = 'label-primary';
                } else {
                    if ($scope.user.role === 'dealer') {
                        $scope.user.role = 'Dealer';
                        $scope.user.className = 'label-success';
                    }
                }
            }
        }

        $scope.receiptDetail = function(id) {
            $location.url('receipts/' + id);
        };

        $scope.goToOrderDetail = function(id) {
            $location.url('orders/' + id);
        };


        $timeout(function() {
            $('#datatable-orders').dataTable();
            $('#datatable-receipts').dataTable();

        });

    });
};