'use strict';


module.exports = function(m) {
    m.controller('AdminPendingCardsController', function($scope, $rootScope, store, $location, storeService, authService, $timeout, CardList, sellingCardsService) {


        authService.adminAuthenticate();

        $rootScope.$broadcast('CHANGE_SIDEBAR_ITEM', 'cards', 'pending_cards');

        $scope.cards = CardList;


        var makePossibleCards = function() {
            for (var i = 0; i < $scope.cards.length; i++) {
                if ($scope.cards[i].store_limit > $scope.cards[i].store_inventory) {
                    $scope.cards[i].canAddToInventory = true;
                } else {
                    $scope.cards[i].canAddToInventory = false;
                }
            };
        }

        makePossibleCards();


        $timeout(function() {
            $('#datatable-default').dataTable();
        });

        $scope.addToInventory = function(index) {

            if ($scope.cards[index].status === 'pending') {
                sellingCardsService.putToInventory({
                    cardId: $scope.cards[index].id,
                    storeId: $scope.cards[index].store_id
                }, function(ret) {
                    if (ret.status === 'fail') {
                        swal('Error', 'Cannot add the card, the inventory is full for this store', 'error');
                    } else {
                        $scope.cards[index].status = 'ok';

                        var storeId = $scope.cards[index].store_id;

                        // update the inventory
                        for (var i = 0; i < $scope.cards.length; i++) {
                            if ($scope.cards[i].store_id === storeId) {
                                $scope.cards[i].store_inventory += 1;
                            }
                        }

                        makePossibleCards();
                    }
                });
            }

        };

    });
};