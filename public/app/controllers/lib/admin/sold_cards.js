'use strict';


module.exports = function(m) {
    m.controller('AdminSoldCardsController', function($scope, $rootScope, store, $location, storeService, authService, $timeout, CardList) {


        authService.adminAuthenticate();

        $rootScope.$broadcast('CHANGE_SIDEBAR_ITEM', 'cards', 'sold_cards');

        $scope.cards = CardList;


        for (var i = 0; i < $scope.cards.length; i = i + 1) {
            var gogo_buy = $scope.cards[i].gogo_buy;
            var discount = $scope.cards[i].purchase.save;
            $scope.cards[i].spread = (100 - gogo_buy - discount) / (100 - discount) * 100;

        }




        $timeout(function() {
            $('#datatable-default').dataTable();
        });

    });
};