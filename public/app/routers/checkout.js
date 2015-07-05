'use strict';
angular.module('app')
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider

            .when('/', {
                templateUrl: 'main/checkout.html',
                controller: 'CheckoutController'
            })

            .when('/review_order', {
                templateUrl: 'main/review_order.html',
                controller: 'ReviewOrderController'
            })



            ;
        }
    ]);