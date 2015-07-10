'use strict';


module.exports = function(m) {
    m.controller('CheckoutController', ['$scope', '$location', '$routeParams', 'authService', 'store',
        function($scope, $location, $routeParams, authService, store) {

            $scope.selectedCards = store.get('cart');


            if (!authService.isAuthenticated()) {
                $scope.isGuest = true;
                $scope.user = {
                    id: 0 // guest id set to 0
                };
            } else {
                $scope.isGuest = false;
                $scope.user = store.get('user');
            }





            // Calculate cards' stats
            var total = 0;
            var totalFaceValue = 0;
            var totalPercentage = 0;

            for (var i = 0; i < $scope.selectedCards.length; i = i + 1) {
                var card = $scope.selectedCards[i];
                total += card.pay;
                totalFaceValue += card.value;
                totalPercentage += (card.pay / card.value * 100);
            }
            $scope.total = total;
            $scope.totalFaceValue = totalFaceValue;
            $scope.averagePercentage = totalPercentage / $scope.selectedCards.length;


            $scope.placeOrder = function() {

                if ($scope.agreed == false) {
                    swal('Warning', 'You have to agree the terms and conditions', 'warnning');
                    return;
                }

                var order = {
                    billingUser: $scope.user,
                    cards: $scope.selectedCards,
                };

                // console.log('this order', order);

                store.set('order', order);

                window.location = '/checkout/#/review_order';
            };
        }
    ]);
};