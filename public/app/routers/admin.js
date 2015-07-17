'use strict';
angular.module('app')
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider

            .when('/', {
                templateUrl: 'admin/index.html',
                controller: 'AdminIndexController',
                resolve: {
                    SiteStats: ['storeService', '$route',
                        function(storeService, $route) {
                            return storeService.stats({}).$promise.then(function(stats) {
                                return stats;
                            });
                        }
                    ]
                }
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
            }).when('/orders', {
                templateUrl: 'admin/orders.html',
                controller: 'AdminOrdersController',
                resolve: {
                    Orders: ['orderService', '$route',
                        function(orderService, $route) {
                            return orderService.query({}).$promise.then(function(orders) {
                                return orders;
                            });
                        }
                    ]
                }
            }).when('/orders/:id', {
                templateUrl: 'admin/order_detail.html',
                controller: 'AdminOrderDetailController',
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
            }).when('/receipts', {
                templateUrl: 'admin/receipts.html',
                controller: 'AdminReceiptsController',
                resolve: {
                    Receipts: ['receiptService', '$route',
                        function(receiptService, $route) {
                            return receiptService.query({}).$promise.then(function(receipts) {
                                return receipts;
                            });
                        }
                    ]
                }
            }).when('/receipts/:id', {
                templateUrl: 'admin/receipt_detail.html',
                controller: 'AdminReceiptDetailController',
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