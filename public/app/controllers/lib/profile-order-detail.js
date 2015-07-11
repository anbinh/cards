'use strict';


module.exports = function(m) {
    m.controller('ProfileOrderDetailController', ['$scope', '$location', '$routeParams', 'authService', 'store', 'userService', 'orderService',
        function($scope, $location, $routeParams, authService, store, userService, orderService) {

            if (!authService.isAuthenticated()) {
                window.location = '/unauthorized/';
            }

            $scope.order = orderService.get({
                id: $routeParams.id
            }, function(order) {
                // Calculate cards' stats
                var total = 0;
                var totalFaceValue = 0;
                var totalPercentage = 0;

                for (var i = 0; i < $scope.order.cards.length; i = i + 1) {
                    var card = $scope.order.cards[i];
                    total += card.pay;
                    totalFaceValue += card.value;
                    totalPercentage += (card.pay / card.value * 100);
                }
                $scope.total = total;
                $scope.totalFaceValue = totalFaceValue;
                $scope.averagePercentage = 100 - totalPercentage / $scope.order.cards.length;

            });
        }
    ]);
};