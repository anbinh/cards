'use strict';
angular.module('app')
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider

            .when('/', {
                templateUrl: 'main/register.html',
                controller: 'RegisterController',
                resolve: {
                    isDealer: [

                        function() {
                            return false;
                        }
                    ]
                }
            }).when('/dealer', {
                templateUrl: 'main/register.html',
                controller: 'RegisterController',
                resolve: {
                    isDealer: [

                        function() {
                            return true;
                        }
                    ]
                }
            })



            ;
        }
    ]);