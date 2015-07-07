'use strict';


module.exports = function(m) {
    m.controller('SoldCardListListController', ['$scope', '$location', '$routeParams', 'authService', 'store', 'userService', 'SoldCardsList',
        function($scope, $location, $routeParams, authService, store, userService, SoldCardsList) {

            if (!authService.isAuthenticated()) {
                window.location = '/unauthorized/';
            }

            // var user = store.get('user');

            $scope.soldCardsList = SoldCardsList;


            $scope.soldCardsDetail = function(id) {
                window.location = '/profile/#/sold-cards/' + id;
            };
        }
    ]);
};