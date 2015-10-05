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


            $scope.payment = {
                name: 'cc_terminal'
            };






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
            $scope.averagePercentage = 100 - totalPercentage / $scope.selectedCards.length;


            $scope.placeOrder = function(paymentForm) {

                if ($scope.agreed === false) {
                    swal('Warning', 'You have to agree the terms and conditions', 'warnning');
                    return;
                }

                var order = {
                    billingUser: $scope.user,
                    cards: $scope.selectedCards,
                    payment: $scope.payment.name
                };


                if ($scope.payment.name === 'ach') {
                    swal('Error', 'No payment support', 'error');
                    return;
                }

                if (paymentForm.cardNumber.$valid === false) {
                    swal('Error', 'The card number is not valid', 'error');
                    return;
                }


                console.log('payment', $scope.payment.name);
                // return;

                store.set('order', order);

                window.location = '/checkout/#/review_order';
            };
        }
    ]);
};