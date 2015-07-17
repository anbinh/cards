'use strict';
angular.module('app')
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider

            .when('/', {
                templateUrl: 'admin/index.html',
                controller: 'AdminIndexController',
                resolve: {}
            }).when('/users', {
                templateUrl: 'admin/users.html',
                controller: 'AdminUsersController',
                resolve: {
                    UserList: ['userService', '$route',
                        function(userService, $route) {
                            return userService.query({}).$promise.then(function(users) {
                                return users;
                            });
                        }
                    ]
                }
            }).when('/guests', {
                templateUrl: 'admin/guests.html',
                controller: 'AdminGuestsController',
                resolve: {

                }
            }).when('/guests/sell_cards', {
                templateUrl: 'admin/guests.html',
                controller: 'AdminGuestsController',
                resolve: {
                    GuestList: ['userService', '$route',
                        function(userService, $route) {
                            return userService.guestsSellingCards({}).$promise.then(function(guests) {
                                return guests;
                            });
                        }
                    ],
                    GuestType: [

                        function() {
                            return 'buy';
                        }
                    ]
                }
            }).when('/guests/buy_cards', {
                templateUrl: 'admin/guests.html',
                controller: 'AdminGuestsController',
                resolve: {
                    GuestList: ['userService', '$route',
                        function(userService, $route) {
                            return userService.guestsBuyingCards({}).$promise.then(function(guests) {
                                return guests;
                            });
                        }
                    ],
                    GuestType: [

                        function() {
                            return 'sell';
                        }
                    ]
                }
            }).when('/dealers', {
                templateUrl: 'admin/dealers.html',
                controller: 'AdminDealersController',
                resolve: {
                    DealerList: ['userService', '$route',
                        function(userService, $route) {
                            return userService.dealers({}).$promise.then(function(dealers) {
                                return dealers;
                            });
                        }
                    ]

                }
            }).when('/inventory', {
                templateUrl: 'admin/inventory.html',
                controller: 'AdminInventoryController',
                resolve: {
                    CardList: ['userService', '$route',
                        function(userService, $route) {
                            return userService.inventory({}).$promise.then(function(cards) {
                                return cards;
                            });
                        }
                    ]
                }
            }).when('/cards_sold', {
                templateUrl: 'admin/sold_cards.html',
                controller: 'AdminSoldCardsController',
                resolve: {
                    Orders: ['orderService', '$route',
                        function(orderService, $route) {
                            return orderService.query({}).$promise.then(function(orders) {
                                return orders;
                            });
                        }
                    ]
                }
            }).when('/cards_sold/:id', {
                templateUrl: 'admin/sold_cards_detail.html',
                controller: 'AdminSoldCardsDetailController',
                resolve: {
                    OrderDetail: ['orderService', '$route',
                        function(orderService, $route) {
                            var id = $route.current.params.id;
                            return orderService.get({
                                id: id
                            }).$promise.then(function(orders) {
                                return orders;
                            });
                        }
                    ]
                }
            }).when('/cards_bought', {
                templateUrl: 'admin/bought_cards.html',
                controller: 'AdminBoughtCardsController',
                resolve: {
                    Receipts: ['receiptService', '$route',
                        function(receiptService, $route) {
                            return receiptService.query({}).$promise.then(function(receipts) {
                                return receipts;
                            });
                        }
                    ]
                }
            }).when('/cards_bought/:id', {
                templateUrl: 'admin/bought_cards_detail.html',
                controller: 'AdminBoughtCardsDetailController',
                resolve: {
                    ReceiptDetail: ['receiptService', '$route',
                        function(receiptService, $route) {
                            var id = $route.current.params.id;
                            return receiptService.get({
                                id: id
                            }).$promise.then(function(orders) {
                                return orders;
                            });
                        }
                    ]
                }
            });
        }
    ]);