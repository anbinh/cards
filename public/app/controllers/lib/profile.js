'use strict';


module.exports = function(m) {
    m.controller('ProfileController', ['$scope', '$location', '$routeParams', 'authService', 'store', 'userService',
        function($scope, $location, $routeParams, authService, store, userService) {

            if (!authService.isAuthenticated()) {
                window.location = '/unauthorized/';
            }

            $scope.user = store.get('user');

            if ($scope.user.role === 'dealer') {
                $scope.isDealer = true;
            } else {
                $scope.isDealer = false;
            }



        }
    ]);
};