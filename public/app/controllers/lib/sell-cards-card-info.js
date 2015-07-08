'use strict';


module.exports = function(m) {
    m.controller('SellCardInfoController', ['$scope', '$location', '$routeParams', 'authService', 'store', 'userService',
        function($scope, $location, $routeParams, authService, store, userService) {


            if (!store.get('selling_cards')) {

                var allCards = [];
                $scope.stores = store.get('selling_stores');
                for (var i = 0; i < $scope.stores.length; i = i + 1) {
                    var currentStore = $scope.stores[i];

                    // console.log('current store', currentStore);
                    for (var j = 0; j < currentStore.amount; j = j + 1) {
                        var card = {
                            gogo_buy: currentStore.gogo_buy,
                            store_name: currentStore.originalName,
                            store_id: currentStore.id,
                            value: currentStore.value,
                            amount: 1
                        };

                        allCards.push(card);
                    }
                }
                $scope.allSellingCards = allCards;
            } else {
                $scope.allSellingCards = store.get('selling_cards');
            }



            // console.log('selling stores', store.get('selling_cards'));
            $scope.goBack = function() {

                $location.url('');
            };

            $scope.goNext = function() {
                console.log('current selling cards', $scope.allSellingCards);

                store.set('selling_cards', angular.copy($scope.allSellingCards));

                // if user has not loggined yet
                if (!store.get('user')) {
                    swal({
                        title: 'Error',
                        text: 'Please login first to go to the next step',
                        type: 'error',
                        showCancelButton: true,
                        confirmButtonText: 'Login',
                        closeOnConfirm: false,
                        confirmButtonColor: '#08C',
                    }, function() {
                        window.location = '/login/#/?forward_url=' + btoa(window.location.origin + '/sell-cards/#/customer-info');
                    });
                } else {
                    window.location = window.location.origin + '/sell-cards/#/customer-info';
                }
            };
        }
    ]);
};