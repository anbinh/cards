'use strict';


module.exports = function(m) {
    m.controller('AdminSoldCardsController', function($scope, $rootScope, store, $location, storeService, authService, $timeout) {



        $rootScope.$broadcast('CHANGE_SIDEBAR_ITEM', 'cards', 'sold_cards');

        $scope.cards = [];

        var cards = [];
        for (var i = 0; i < 100; i = i + 1) {

            var card = {
                value: Math.random() * 1000000 | 0,
                number: Math.random() * 1000000 | 0,
                pin: Math.random() * 1000000 | 0,
                amount: Math.random() * 1000 | 0,
                dealer_code: Math.random() * 1000000 | 0,
                sold_to: 'tinhoc@outlook.com',
                created_date: new Date()
            };
            cards.push(card);
        }

        $scope.cards = cards;

        $timeout(function() {
            $('#datatable-default').dataTable();
        });

    });
};