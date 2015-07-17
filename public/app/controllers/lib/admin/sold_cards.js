'use strict';


module.exports = function(m) {
    m.controller('AdminSoldCardsController', function($scope, $rootScope, store, $location, storeService, authService, $timeout, CardList) {


        authService.adminAuthenticate();

        $rootScope.$broadcast('CHANGE_SIDEBAR_ITEM', 'cards', 'sold_cards');

        $scope.cards = CardList;




        $timeout(function() {
            $('#datatable-default').dataTable();
        });

    });
};