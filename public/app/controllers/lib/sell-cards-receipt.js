'use strict';


module.exports = function(m) {
    m.controller('SellCardReceiptController', ['$scope', '$location', '$routeParams', 'authService', 'store', 'userService', 'SellingCardList',
        function($scope, $location, $routeParams, authService, store, userService, SellingCardList) {

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

            $scope.sellingCards = SellingCardList;

            $scope.total = calculateTotalOffer($scope.sellingCards.cards);

            $scope.totalFaceValue = calculateTotalFaceValue($scope.sellingCards.cards);

            $scope.averagePercentage = calculateAveragePercentage($scope.sellingCards.cards);

            $scope.viewSellingHistory = function() {
                window.location = '/profile/#/sold-cards-history';
            }


        }
    ]);
};