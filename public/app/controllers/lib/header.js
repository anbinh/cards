'use strict';

module.exports = function(m) {
    m.controller('HeaderController', ['$scope', '$rootScope', 'store', '$location', 'authService', '$routeParams', 'storeService',
        function($scope, $rootScope, store, $location, authService, $routeParams, storeService) {


            console.log('HEADER Route PARAM', $routeParams);

            function capitalizeFirstLetter(str) {
                return str.replace(/\w\S*/g, function(txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                });
            }

            var getTotal = function(cards) {
                var total = 0;
                for (var i = cards.length - 1; i >= 0; i = i - 1) {
                    total += cards[i].pay;
                }
                return total;
            };

            var m, n;

            storeService.get().$promise.then(function(stores) {
                $scope.allStores = stores;
                for (var i = 0; i < $scope.allStores.length; i = i + 1) {
                    $scope.allStores[i].originalName = $scope.allStores[i].name;
                    $scope.allStores[i].name = capitalizeFirstLetter($scope.allStores[i].name.split('-').join(' '));
                }

            });


            if (authService.isAuthenticated()) {
                $scope.loggedIn = true;
            } else {
                $scope.loggedIn = false;
            }

            $scope.showCheckout = false;

            // store.set("cart", []);
            $scope.selectedCards = [];
            var tmp = store.get('cart');
            if (tmp) {
                console.log(tmp);
                $scope.selectedCards = tmp;
                m = getTotal($scope.selectedCards);
                n = $scope.selectedCards.length;
                $scope.cartStat = 'Cart (' + n + ') - $ ' + m;

                if (n > 0) {
                    $scope.showCheckout = true;
                }
            }



            $rootScope.$on('CHANGE_CART', function() {
                $scope.selectedCards = store.get('cart');
                m = getTotal($scope.selectedCards);
                n = $scope.selectedCards.length;
                $scope.cartStat = 'Cart (' + n + ') - $' + m;

                if (n > 0) {
                    $scope.showCheckout = true;
                }

            });

            $scope.removeCard = function(index) {
                var cards = store.get('cart');
                cards.splice(index, 1);

                store.set('cart', cards);
                $scope.selectedCards = store.get('cart');
                m = getTotal($scope.selectedCards);
                n = $scope.selectedCards.length;
                $scope.cartStat = 'Cart (' + n + ') - $' + m;

            };

            $scope.viewShoppingCart = function() {
                window.location = '/shopping-cart/#/';
            };
            $scope.checkout = function() {
                window.location = '/checkout/#/';
            };

            $scope.signOut = function() {
                store.remove('user');
                window.location = '/';
            };

            $scope.searchStore = function() {
                if ($scope.searchedStore.originalName) {
                    window.location = '/stores/#/' + $scope.searchedStore.originalName;
                } else {
                    swal('Invalid Store', 'The store you are looking is not available', 'error');
                }
            };
        }
    ]);

};