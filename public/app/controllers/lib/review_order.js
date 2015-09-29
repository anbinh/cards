'use strict';


module.exports = function(m) {
    m.controller('ReviewOrderController', ['$scope', '$location', '$routeParams', 'authService', 'store', 'userService', '$rootScope',
        function($scope, $location, $routeParams, authService, store, userService, $rootScope) {


            if (!authService.isAuthenticated()) {
                $scope.isGuest = true;
                $scope.user = {
                    id: 0 // guest id set to 0
                };
            } else {
                $scope.isGuest = false;
                $scope.user = store.get('user');
            }

            $scope.isPaid = false;



            $scope.order = store.get('order');

            if ($scope.order && $scope.order.cards === undefined) {
                alert('invalid page');

                window.location = '/';

                return;
            }



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
            $scope.averagePercentage = 100 - totalPercentage / $scope.order.cards.length;



            $scope.pay = function() {
                var order = {
                    user_id: $scope.user.id,
                    billing_user: $scope.order.billingUser,
                    cards: $scope.order.cards,
                    total_amount: total,
                    total_cards: $scope.order.cards.length,
                    total_face_value: $scope.totalFaceValue,
                    average_percentage: $scope.averagePercentage,
                    payment: $scope.order.payment
                };

                console.log('order', order);

                $scope.isPaid = true;


                userService.pay(order, function(result) {
                    // 
                    console.log('PAYMENT', result);
                    store.set('cart', []);

                    store.set('order', {});

                    if (!$scope.isGuest) {
                        swal({
                            title: 'Congratulations!',
                            text: 'Your Order has been paid!',
                            type: 'success',
                            showCancelButton: false,
                            confirmButtonText: 'Ok, view order!',
                            closeOnConfirm: false,
                            closeOnCancel: false
                        }, function() {
                            window.location = '/profile/#/orders/' + result.id;
                        });

                    } else {

                        swal('Congratulations!', 'Your Order has been paid', 'success');
                        $rootScope.$broadcast('CHANGE_CART', {});
                    }


                }, function(err) {
                    console.log("ERRR", err);
                    store.set('cart', []);

                    store.set('order', {});
                    // swal('Error', err.data.message, 'error');
                    window.location = '/payment-declined';
                });
            };

        }
    ]);
};