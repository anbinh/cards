'use strict';


module.exports = function(m) {
    m.controller('HomeController', function($scope, store, $location, storeService, authService) {

        $scope.auth = authService.auth();

        // alert("HOME Controller");
        console.log('HOME CONTROLLER', storeService);

        $scope.featuredstoreService = storeService.featured();

        $scope.bestsellingStores = storeService.bestSelling();

        $scope.login = function() {

        };

        $scope.logout = function() {

        };





        $scope.search = function() {
            window.location = '/search/#/?q=' + $scope.query;
        };

        $scope.go = function(path) {
            window.location = path;
        };




    });
};