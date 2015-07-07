'use strict';


module.exports = function(m) {
    m.controller('SoldCardDetailController', ['$scope', '$location', '$routeParams', 'authService', 'store', 'userService', 'SoldCardList',
        function($scope, $location, $routeParams, authService, store, userService, SoldCardList) {

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

            $scope.sellingCards = SoldCardList;

            $scope.total = calculateTotalOffer($scope.sellingCards.cards);

            $scope.totalFaceValue = calculateTotalFaceValue($scope.sellingCards.cards);

            $scope.averagePercentage = calculateAveragePercentage($scope.sellingCards.cards);


        }
    ]);
};