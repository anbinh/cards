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
                resolve: {}
            }).when('/guests', {
                templateUrl: 'admin/guests.html',
                controller: 'AdminGuestsController',
                resolve: {}
            }).when('/dealers', {
                templateUrl: 'admin/dealers.html',
                controller: 'AdminDealersController',
                resolve: {}
            }).when('/inventory', {
                templateUrl: 'admin/inventory.html',
                controller: 'AdminInventoryController',
                resolve: {}
            }).when('/cards_sold', {
                templateUrl: 'admin/sold_cards.html',
                controller: 'AdminSoldCardsController',
                resolve: {}
            }).when('/cards_bought', {
                templateUrl: 'admin/bought_cards.html',
                controller: 'AdminBoughtCardsController',
                resolve: {}
            });
        }
    ]);