'use strict';
angular.module('app')
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider

            .when('/', {
                templateUrl: 'main/register.html',
                controller: 'RegisterController'
            })



            ;
        }
    ]);