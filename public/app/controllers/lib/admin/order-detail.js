'use strict';


module.exports = function(m) {
    m.controller('AdminOrderDetailController', function($scope, $rootScope, store, $location, storeService, authService, $timeout, OrderDetail, orderService) {

        authService.adminAuthenticate();

        $rootScope.$broadcast('CHANGE_SIDEBAR_ITEM', 'cards', 'orders');


        console.log(OrderDetail);

        $scope.order = OrderDetail;

        if ($scope.order.billingUser.id === 0) {
            $scope.order.billingUser.role = 'Guest';
            $scope.order.billingUser.className = 'label-warning';
        } else {
            if ($scope.order.billingUser.role === '' || $scope.order.billingUser.role === undefined) {
                $scope.order.billingUser.role = 'Regular User';
                $scope.order.billingUser.className = 'label-primary';
            } else {
                if ($scope.order.billingUser.role === 'user') {
                    $scope.order.billingUser.role = 'Regular User';
                    $scope.order.billingUser.className = 'label-primary';
                }
            }
        }

        $timeout(function() {
            $('#datatable-default').dataTable();
        });


        $scope.sendGiftCards = function() {
            swal({
                    title: 'Are you sure?',
                    text: 'Do you want to send the gift cards to the email: ' + $scope.order.billingUser.email,
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#47A447',
                    confirmButtonText: 'Yes, Send Gift Cards',
                    closeOnConfirm: true
                },
                function() {
                    orderService.sendGiftCards({
                        id: $scope.order.id
                    }, function(ret) {

                        if (ret.status === 'error') {
                            swal('Error', ret.message, 'error');
                        } else {
                            swal('Success', 'The gift cards have been sent to the email: ' + $scope.order.billingUser.email, 'success');
                        }
                        console.log('ORDER SERVICE', ret, 'success');
                    });
                });
        };

    });
};