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
                });


        }
    ]);