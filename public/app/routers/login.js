'use strict';
angular.module('app')
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider

            .when('/', {
                templateUrl: 'main/login.html',
                controller: 'LoginController',
                resolve: {
                    isDealer: [

                        function() {
                            return false;
                        }
                    ]
                }
            }).when('/dealer', {
                templateUrl: 'main/login.html',
                controller: 'LoginController',
                resolve: {
                    isDealer: [

                        function() {
                            return true;
                        }
                    ]
                }
            });
        }
    ]);