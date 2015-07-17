'use strict';


module.exports = function(m) {
    m.controller('AdminCardsController', function($scope, $rootScope, store, $location, storeService, authService, $timeout, CardList) {


        authService.adminAuthenticate();

        $rootScope.$broadcast('CHANGE_SIDEBAR_ITEM', 'cards', 'all_cards');

        $scope.cards = CardList;




        $timeout(function() {
            $('#datatable-default').dataTable();
        });

    });
};