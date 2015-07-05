'use strict';
angular.module('app')
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider

            .when('/', {
                templateUrl: 'main/login.html',
                controller: 'LoginController'
            });
        }
    ]);