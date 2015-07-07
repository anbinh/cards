'use strict';

angular.module('app')
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'profile/profile.html',
                    controller: 'ProfileController'
                })
                .when('/edit', {
                    templateUrl: 'profile/profile-edit.html',
                    controller: 'ProfileEditController'
                })
                .when('/orders', {
                    templateUrl: 'profile/order-list.html',
                    controller: 'ProfileOrderListController'
                })
                .when('/orders/:id', {
                    templateUrl: 'profile/order_detail.html',
                    controller: 'ProfileOrderDetailController'
                })
                .when('/sold-cards-history', {
                    templateUrl: 'profile/sold-cards-list.html',
                    controller: 'SoldCardListListController',
                    resolve: {
                        SoldCardsList: ['userService', '$route', 'store',
                            function(userService, $route, store) {
                                var user = store.get('user');
                                return userService.getSoldCardsByUserId({
                                    id: user.id
                                }).$promise.then(function(cards) {
                                    return cards;
                                });
                            }
                        ]
                    }
                }).when('/sold-cards/:id', {
                    templateUrl: 'profile/sold-cards-detail.html',
                    controller: 'SoldCardDetailController',
                    resolve: {
                        SoldCardList: ['sellingCardsService', '$route',
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