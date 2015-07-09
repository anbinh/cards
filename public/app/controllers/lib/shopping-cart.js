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