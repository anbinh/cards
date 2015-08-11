'use strict';
angular.module('app')
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'sell_cards/index.html',
                    controller: 'SellCardController',
                    resolve: {
                        storeList: ['storeService',
                            function(storeSerivce) {
                                return storeSerivce.get().$promise.then(function(stores) {
                                    return stores;
                                });
                            }
                        ]
                    }
                }).when('/card-info', {
                    templateUrl: 'sell_cards/card-info.html',
                    controller: 'SellCardInfoController'
                }).when('/customer-info', {
                    templateUrl: 'sell_cards/customer-info.html',
                    controller: 'SellCardCustomerInfoController',
                    resolve: {
                        storeList: ['storeService',
                            function(storeSerivce) {
                                return storeSerivce.limits().$promise.then(function(stores) {
                                    return stores;
                                });
                            }
                        ]
                    }
                }).when('/receipt/:id', {
                    templateUrl: 'sell_cards/receipt.html',
                    controller: 'SellCardReceiptController',
                    resolve: {
                        SellingCardList: ['sellingCardsService', '$route',
                            function(sellingCardsService, $route) {
                                var id = $route.current.params.id;

                                return sellingCardsService.get({
                                    id: id
                                }).$promise.then(function(cards) {
                                    return cards;
                                });
                            }
                        ]
                    }

                });
        }
    ]);