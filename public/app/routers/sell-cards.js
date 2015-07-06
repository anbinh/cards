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
                    controller: 'SellCardCustomerInfoController'


                });
        }
    ]);