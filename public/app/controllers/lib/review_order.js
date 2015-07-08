'use strict';


module.exports = function(m) {
    m.controller('ReviewOrderController', ['$scope', '$location', '$routeParams', 'authService', 'store', 'userService',
        function($scope, $location, $routeParams, authService, store, userService) {


            if (!authService.isAuthenticated()) {
                window.location = '/unauthorized/';

                return;
            }


            $scope.order = store.get('order');

            var user = store.get('user');

            console.log('order', $scope.order);


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
            $scope.averagePercentage = totalPercentage / $scope.order.cards.length;



            $scope.pay = function() {
                var order = {
                    user_id: user.id,
                    billing_user: $scope.order.billingUser,
                    cards: $scope.order.cards,
                    total_amount: total,
                    total_cards: $scope.order.cards.length,
                    total_face_value: $scope.totalFaceValue,
                    average_percentage: $scope.averagePercentage
                };

                console.log('order', order);



                userService.pay(order, function(result) {
                    // 
                    console.log('PAYMENT', result);
                    store.set('cart', []);
                    window.location = '/profile/#/orders/' + result.id;

                }, function(err) {
                    // console.log("ERRR", err);
                    swal('Error', err.data.message, 'error');
                });
            };

        }
    ]);
};