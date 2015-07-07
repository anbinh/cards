'use strict';


module.exports = function(m) {
    m.controller('SellCardController', ['$scope', '$location', '$routeParams', 'authService', 'store', 'userService', 'storeList',
        function($scope, $location, $routeParams, authService, store, userService, storeList) {


            function capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }

            var calculateTotalOfferMailCard = function(stores) {
                var total = 0;
                for (var i = 0; i < stores.length; i = i + 1) {
                    total += (100 - stores[i].discount) * stores[i].value * stores[i].amount / 100;
                }

                return total;
            };

            var calculateTotalOfferOnline = function(stores) {
                var total = 0;
                for (var i = 0; i < stores.length; i = i + 1) {
                    total += (100 - stores[i].discount) * stores[i].value * stores[i].amount / 100;
                }

                return (total > 10) ? (total - 10) : 0;
            };

            $scope.payBy = {
                mail: true,
                online: false
            };

            // console.log('STORE LIST', storeList);

            $scope.storeSelected = undefined;
            $scope.allStores = storeList;

            for (var i = 0; i < $scope.allStores.length; i = i + 1) {
                $scope.allStores[i].name = capitalizeFirstLetter($scope.allStores[i].name.replace('-', ' '));
            }


            $scope.$watch('payBy.mail', function() {
                if ($scope.payBy.mail === true) {
                    $scope.payBy.online = false;
                }
            });

            $scope.$watch('payBy.online', function() {
                if ($scope.payBy.online === true) {
                    $scope.payBy.mail = false;
                }
            });

            $scope.goToCardInfo = function() {
                $location.url('/card-info');
            };


            // check if there is any cards gonne sold
            if ((store.get('selling_stores') === null) || (store.get('selling_stores').length === 0)) {
                $scope.showIntruction = true;
                store.set('selling_stores', []);
            } else {
                $scope.showIntruction = false;
                $scope.stores = store.get('selling_stores');
                $scope.totalOfferMailCard = calculateTotalOfferMailCard($scope.stores);
                $scope.totalOfferOnline = calculateTotalOfferOnline($scope.stores);
            }

            // store.set('selling_stores', []);
            console.log('SELLING STORES', store.get('selling_stores'));




            $scope.addStore = function() {

                // remove selling_cards saving
                store.remove('selling_cards');
                console.log('store', $scope.store);
                $scope.showIntruction = false;

                var stores = store.get('selling_stores');
                var currentStore = {
                    value: parseInt($scope.store.balance),
                    amount: parseInt($scope.store.amount),
                    discount: $scope.store.brand.discount,
                    name: $scope.store.brand.name
                };

                $scope.store = {
                    balance: null,
                    amount: 1,
                    brand: null
                };

                stores.push(currentStore);


                $scope.totalOfferMailCard = calculateTotalOfferMailCard(stores);
                $scope.totalOfferOnline = calculateTotalOfferOnline(stores);

                $scope.stores = stores;
                store.set('selling_stores', stores);

                console.log('current store', currentStore);
            };

            $scope.removeStore = function(index) {
                store.remove('selling_cards');
                $scope.stores.splice(index, 1);
                store.set('selling_stores', $scope.stores);
                $scope.totalOfferMailCard = calculateTotalOfferMailCard($scope.stores);
                $scope.totalOfferOnline = calculateTotalOfferOnline($scope.stores);
            };

            $scope.mailBoxCLick = function() {
                if ($scope.payBy.mail === false) {
                    $scope.payBy.mail = !$scope.payBy.mail;
                }
            };

            $scope.onlineBoxCLick = function() {
                if ($scope.payBy.online === false) {
                    $scope.payBy.online = !$scope.payBy.online;
                }
            };


        }
    ]);
};