'use strict';

module.exports = function(m) {
    m.controller('StoreDetailController', ['$scope', '$routeParams', '$location', 'authService', 'userService', 'SweetAlert', 'store', 'storeService', '$rootScope', 'cardList',
        function($scope, $routeParams, $location, authService, userService, SweetAlert, store, storeService, $rootScope, cardList) {

            $scope.oneAtATime = false;

            $scope.storeName = $routeParams.id;

            // console.log('CARD LISGT', cardList);

            $scope.priceRange = {
                from: 0,
                to: 20
            };

            // $scope.maxPrice = 120;

            $scope.cards = cardList;

            var minD = 10000000000;
            var maxD = 0;
            angular.forEach($scope.cards, function(s) {

                // console.log(s);
                if (minD > s.value) {
                    minD = s.value;
                }

                if (maxD < s.value) {
                    maxD = s.value;
                }
            });


            var minValue = parseInt(minD);
            var maxValue = parseInt(maxD);

            // console.log('SCOPE', $scope);

            $scope.priceRange = {
                from: minValue,
                to: maxValue
            };

            $scope.maxPrice = maxValue;
            $scope.minPrice = minValue;

            console.log('max value', $scope.maxPrice);
            console.log('min value', $scope.minPrice);

            // $scope.maxPrice = maxValue;

            $scope.addToCart = function(card) {
                console.log('Add new item to cart', card);



                var currentCart = store.get('cart');

                // console.log("BEFORE", currentCart);
                if (currentCart) {

                    // check if the card is duplicated
                    var exist = false;
                    for (var i = currentCart.length - 1; i >= 0; i = i - 1) {
                        if ((currentCart[i].name === card.name) && (currentCart[i].pay === card.pay) && (currentCart[i].value === card.value)) {
                            exist = true;
                        }
                    }
                    if (exist === false) {
                        currentCart.push(angular.copy(card));
                        // console.log("current card", currentCart);
                        store.set('cart', currentCart);
                        $rootScope.$broadcast('CHANGE_CART', card);
                    }

                } else {

                    store.set('cart', [angular.copy(card)]);
                    $rootScope.$broadcast('CHANGE_CART', card);
                }
            };






        }
    ]);

};