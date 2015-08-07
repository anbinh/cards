'use strict';


module.exports = function(m) {
    m.controller('SellCardController', ['$scope', '$location', '$routeParams', 'authService', 'store', 'userService', 'storeList', 'utilService',
        function($scope, $location, $routeParams, authService, store, userService, storeList, utilService) {


            //discount by "enter online" method to 5.75%
            $scope.ENTER_ONLINE_DISCOUNT = 0.0575;

            console.log('util service', utilService);
            $scope.payBy = {
                mail: true,
                online: false
            };



            // init default values
            $scope.store = {
                balance: null,
                amount: 1,
                brand: null
            };


            store.remove('selling_cards');

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


                if ($scope.stores[0].payBy === 'mail') {
                    $scope.payBy.mail = true;
                    $scope.payBy.online = false;
                } else {
                    $scope.payBy.mail = false;
                    $scope.payBy.online = true;
                }
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

                if (($scope.store.balance === undefined) || ($scope.store.balance === null)) {
                    swal('Invalid Balance', 'Please enter the card balance', 'error');
                    return;
                }

                if (($scope.store.amount === undefined) || ($scope.store.amount === null)) {
                    swal('Invalid Quantity', 'Please enter the quantity number', 'error');
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
                    id: $scope.store.brand.id,
                    payBy: ($scope.payBy.mail === true) ? 'mail' : 'online'
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
                    var currentStores = store.get('selling_stores');
                    for (var i = 0; i < currentStores.length; i = i + 1) {
                        currentStores[i].payBy = 'mail';
                    }

                    store.set('selling_stores', currentStores);
                }
            };

            $scope.onlineBoxCLick = function() {
                if ($scope.payBy.online === false) {
                    $scope.payBy.online = !$scope.payBy.online;

                    var currentStores = store.get('selling_stores');
                    for (var i = 0; i < currentStores.length; i = i + 1) {
                        currentStores[i].payBy = 'online';
                    }
                    store.set('selling_stores', currentStores);
                }
            };


        }
    ]);
};