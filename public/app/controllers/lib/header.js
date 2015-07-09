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
                // return total;

                return Math.round(total * 100) / 100;
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
                var forwardUrl = btoa(window.location.origin + '/checkout');
                var loginURL = '/login/#/?forward_url=' + forwardUrl;

                // if user has not loggined yet
                if (!store.get('user')) {
                    swal({
                        title: 'Notice',
                        text: 'You can login before going to the next step <a href="' + loginURL + '">LOGIN NOW</a>  </br> Or you can continue to use the site as a guest',
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Continue as guest',
                        closeOnConfirm: false,
                        confirmButtonColor: '#08C',
                        html: true
                    }, function() {
                        window.location = window.location.origin + '/checkout/#/?guest=true';
                        swal.close();
                    });
                } else {
                    window.location = '/checkout';
                }
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