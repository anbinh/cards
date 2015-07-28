'use strict';


module.exports = function(m) {
    m.controller('SellCardInfoController', ['$scope', '$location', '$routeParams', 'authService', 'store', 'userService',
        function($scope, $location, $routeParams, authService, store, userService) {

            if (!authService.isAuthenticated()) {
                window.location = '/';
            } else {
                $scope.user = store.get('user');
            }

            // if the $scope.user found
            if ($scope.user) {
                if ($scope.user.role === 'dealer') {
                    $scope.isDealer = true;
                } else {
                    $scope.isDealer = false;
                }
            } else {
                $scope.isDealer = false;
            }



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

                var forwardUrl = btoa(window.location.origin + '/sell-cards/#/customer-info');
                var loginURL = '/login/#/?forward_url=' + forwardUrl;

                // if user has not loggined yet
                if (!store.get('user')) {
                    swal({
                        title: 'Notice',
                        text: 'You can login before going to the next step <a href="' + loginURL + '">LOGIN NOW</a>  </br> Or you can continue to use the site as a guest',
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Continue as guest',
                        closeOnConfirm: false,
                        confirmButtonColor: '#08C',
                        html: true
                    }, function() {
                        window.location = window.location.origin + '/sell-cards/#/customer-info?guest=true';
                        swal.close();
                    });
                } else {
                    window.location = window.location.origin + '/sell-cards/#/customer-info';
                }
            };
        }
    ]);
};