'use strict';
angular.module('app')
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider

            .when('/:token', {
                templateUrl: 'main/reset-password.html',
                controller: 'ResetPasswordController'
            });
        }
    ]);