'use strict';
angular.module('app')
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider

            .when('/', {
                templateUrl: 'main/forget-password.html',
                controller: 'ForgetPasswordController'
            });
        }
    ]);