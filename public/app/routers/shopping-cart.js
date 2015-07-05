'use strict';
angular.module('app')
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'main/shopping_cart.html',
                    controller: 'ShoppingCartController'
                })



            ;
        }
    ]);