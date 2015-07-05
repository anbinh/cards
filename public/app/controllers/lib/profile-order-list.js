'use strict';


module.exports = function(m) {
    m.controller('ProfileOrderListController', ['$scope', '$location', '$routeParams', 'authService', 'store', 'userService',
        function($scope, $location, $routeParams, authService, store, userService) {

            if (!authService.isAuthenticated()) {
                window.location = '/unauthorized/';
            }

            var user = store.get('user');

            $scope.orders = userService.getOrdersByUserId({
                id: user.id,
            }, function(ret) {
                // console.log('RET', ret);
            }, function(err) {
                swal('Error', err.data.message, 'error');
            });


            $scope.orderDetail = function(id) {
                window.location = '/profile/#/orders/' + id;
            };
        }
    ]);
};