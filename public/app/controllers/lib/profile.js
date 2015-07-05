'use strict';


module.exports = function(m) {
    m.controller('ProfileController', ['$scope', '$location', '$routeParams', 'authService', 'store', 'userService',
        function($scope, $location, $routeParams, authService, store, userService) {

            if (!authService.isAuthenticated()) {
                window.location = '/unauthorized/';
            }

            $scope.user = store.get('user');



        }
    ]);
};