'use strict';
angular.module('app')
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'buy_cards/store_list.html',
                    controller: 'StoreListController',
                    resolve: {
                        storeList: ['storeService',
                            function(storeSerivce) {
                                return storeSerivce.get().$promise.then(function(stores) {
                                    return stores
                                });
                            }
                        ]
                    }
                })

            .when('/:id', {
                templateUrl: 'buy_cards/store-detail.html',
                controller: 'StoreDetailController',
                resolve: {
                    cardList: ['storeService', '$route',
                        function(storeSerivce, $route) {
                            var id = $route.current.params.id;

                            return storeSerivce.get({
                                id: id
                            }).$promise.then(function(cards) {
                                return cards
                            });
                        }
                    ]
                }
            })

            ;
        }
    ]);