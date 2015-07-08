'use strict';


module.exports = function(m) {
    m.controller('ShoppingCartController', ['$scope', '$location', '$routeParams', 'authService', 'store', '$rootScope',
        function($scope, $location, $routeParams, authService, store, $rootScope) {

            var getTotal = function(cards) {
                var total = 0;
                for (var i = cards.length - 1; i >= 0; i = i - 1) {
                    total += cards[i].pay;
                }
                // return total;

                return Math.round(total * 100) / 100;
            };

            $scope.selectedCards = store.get('cart');

            var total = 0;
            for (var i = $scope.selectedCards.length - 1; i >= 0; i = i - 1) {
                total += $scope.selectedCards[i].pay;
            }
            $scope.total = Math.round(total * 100) / 100;

            $scope.checkout = function() {
                window.location = '/checkout';
            };

            $scope.removeCard = function(index) {
                var cards = store.get('cart');
                cards.splice(index, 1);

                store.set('cart', cards);
                $scope.selectedCards = store.get('cart');

                $scope.total = getTotal($scope.selectedCards);

                $rootScope.$broadcast('CHANGE_CART');

            };

        }
    ]);

};