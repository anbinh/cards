'use strict';


module.exports = function(m) {
    m.controller('AdminUserProfileController', function($scope, $rootScope, store, $location, storeService, authService, $timeout, UserProfile) {

        authService.adminAuthenticate();

        // $rootScope.$broadcast('CHANGE_SIDEBAR_ITEM', 'cards', 'orders');


        console.log(UserProfile);
        $scope.user = UserProfile;

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