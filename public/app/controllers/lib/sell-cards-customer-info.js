'use strict';


module.exports = function(m) {
    m.controller('SellCardCustomerInfoController', ['$scope', '$location', '$routeParams', 'authService', 'store', 'userService',
        function($scope, $location, $routeParams, authService, store, userService) {

            var calculateTotalOffer = function(cards) {
                var total = 0;
                for (var i = 0; i < cards.length; i = i + 1) {
                    total += (100 - cards[i].discount) * cards[i].value / 100;
                }

                return total;
            };

            var calculateTotalFaceValue = function(cards) {
                var total = 0;
                for (var i = 0; i < cards.length; i = i + 1) {
                    total += cards[i].value;
                }

                return total;
            };

            var calculateAveragePercentage = function(cards) {
                var total = 0;
                for (var i = 0; i < cards.length; i = i + 1) {
                    total += cards[i].discount;
                }

                return total / cards.length;
            };

            $scope.sellingCards = {
                billingUser: store.get('user'),
                cards: store.get('selling_cards')
            };

            $scope.total = calculateTotalOffer($scope.sellingCards.cards);

            $scope.totalFaceValue = calculateTotalFaceValue($scope.sellingCards.cards);

            $scope.averagePercentage = calculateAveragePercentage($scope.sellingCards.cards);


            $scope.sellCards = function() {

                var user = store.get('user');
                var selling_cards = {
                    user_id: user.id,
                    billing_user: $scope.sellingCards.billingUser,
                    cards: $scope.sellingCards.cards,
                    total_amount: $scope.total,
                    total_cards: $scope.sellingCards.cards.length,
                    total_face_value: $scope.totalFaceValue,
                    average_percentage: $scope.averagePercentage
                };

                userService.sellCards(selling_cards, function(result) {

                    store.set('selling_cards', []);
                    store.set('selling_stores', []);

                    $location.url('receipt/' + result.id);

                    console.log('RECEIPT', result);
                }, function(err) {
                    // console.log("ERRR", err);
                    swal('Error', err.data.message, 'error');
                });

            };

        }
    ]);
};