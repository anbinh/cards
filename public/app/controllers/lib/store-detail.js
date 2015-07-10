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

            var minD, maxD;
            if ($scope.cards.length > 0) {
                minD = 10000000000;
                maxD = 0;
            } else {
                minD = 0;
                maxD = 100;
            }

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

            if (minValue === maxValue) {
                maxValue = minValue + 1;
            }

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
            // 
            // 
            // check if card has been added
            var currentCart = store.get('cart');
            for (var j = 0; j < $scope.cards.length; j = j + 1) {
                for (var i = 0; i < currentCart.length; i = i + 1) {
                    console.log($scope.cards[j].id, currentCart[i].id);
                    if ($scope.cards[j].id === currentCart[i].id) {
                        $scope.cards[j].isAdded = true;
                    }

                }
            }


            $scope.addToCart = function(card, index) {
                console.log('Add new item to cart', card);



                var currentCart = store.get('cart');

                // console.log("BEFORE", currentCart);
                if (currentCart) {

                    // check if the card is duplicated
                    var exist = false;
                    for (var i = currentCart.length - 1; i >= 0; i = i - 1) {
                        if (currentCart[i].id === card.id) {
                            exist = true;
                        }
                    }
                    if (exist === false) {
                        $scope.cards[index].isAdded = true;
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