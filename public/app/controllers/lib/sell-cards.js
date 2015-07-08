'use strict';


module.exports = function(m) {
    m.controller('SellCardController', ['$scope', '$location', '$routeParams', 'authService', 'store', 'userService', 'storeList', 'utilService',
        function($scope, $location, $routeParams, authService, store, userService, storeList, utilService) {




            console.log('util service', utilService);
            $scope.payBy = {
                mail: true,
                online: false
            };

            // console.log('STORE LIST', storeList);

            $scope.storeSelected = undefined;
            $scope.allStores = storeList;

            for (var i = 0; i < $scope.allStores.length; i = i + 1) {
                $scope.allStores[i].originalName = $scope.allStores[i].name;
                $scope.allStores[i].name = utilService.titleCase($scope.allStores[i].name.split('-').join(' '));
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
                $scope.totalOfferMailCard = utilService.totalOfferMailCard($scope.stores);
                $scope.totalOfferOnline = utilService.totalOfferOnline($scope.stores);
            }

            // store.set('selling_stores', []);
            console.log('SELLING STORES', store.get('selling_stores'));




            $scope.addStore = function() {

                if (!$scope.store.brand.originalName) {
                    $scope.store = {
                        balance: null,
                        amount: 1,
                        brand: null
                    };
                    swal('Invalid Store', 'The store you entered is not valid', 'error');
                    return;
                }

                // remove selling_cards saving
                store.remove('selling_cards');
                console.log('store', $scope.store);
                $scope.showIntruction = false;

                var stores = store.get('selling_stores');
                var currentStore = {
                    value: parseInt($scope.store.balance),
                    amount: parseInt($scope.store.amount),
                    gogo_buy: $scope.store.brand.gogo_buy,
                    name: $scope.store.brand.name,
                    originalName: $scope.store.brand.originalName,
                    id: $scope.store.brand.id
                };

                $scope.store = {
                    balance: null,
                    amount: 1,
                    brand: null
                };

                stores.push(currentStore);


                $scope.totalOfferMailCard = utilService.totalOfferMailCard(stores);
                $scope.totalOfferOnline = utilService.totalOfferOnline(stores);

                $scope.stores = stores;
                store.set('selling_stores', stores);

                console.log('current store', currentStore);
            };

            $scope.removeStore = function(index) {
                store.remove('selling_cards');
                $scope.stores.splice(index, 1);
                store.set('selling_stores', $scope.stores);
                $scope.totalOfferMailCard = utilService.totalOfferMailCard($scope.stores);
                $scope.totalOfferOnline = utilService.totalOfferOnline($scope.stores);
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