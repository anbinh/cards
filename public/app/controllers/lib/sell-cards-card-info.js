'use strict';


module.exports = function(m) {
    m.controller('SellCardInfoController', ['$scope', '$location', '$routeParams', 'authService', 'store', 'userService',
        function($scope, $location, $routeParams, authService, store, userService) {

            //discount by "enter online" method to 5.75%
            $scope.ENTER_ONLINE_DISCOUNT = 0.0575;


            // if (!authService.isAuthenticated()) {
            //     window.location = '/';
            // } else {
            //     $scope.user = store.get('user');
            // }
            $scope.user = store.get('user');

            // if the $scope.user found
            if ($scope.user) {
                if ($scope.user.role === 'dealer') {
                    $scope.isDealer = true;
                    $scope.dealerCode = $scope.user.dealer_code;
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

                    var less;
                    if (currentStore.payBy === 'mail') {
                        less = 1 - 0;
                    } else {
                        // 5.75% less
                        less = 1 - $scope.ENTER_ONLINE_DISCOUNT;
                    }

                    console.log('current store', currentStore);
                    for (var j = 0; j < currentStore.amount; j = j + 1) {
                        var val = currentStore.gogo_buy * currentStore.value / 100;
                        var card = {
                            gogo_buy: currentStore.gogo_buy,
                            store_name: currentStore.originalName,
                            store_id: currentStore.id,
                            value: currentStore.value,
                            amount: 1,
                            pay_by: currentStore.payBy,
                            bought_value: val * less,
                            payout: (val * less) / currentStore.value * 100
                        };

                        allCards.push(card);
                    }
                }
                $scope.allSellingCards = allCards;
            } else {
                $scope.allSellingCards = store.get('selling_cards');
            }


            if ($scope.isDealer === true) {
                if (($scope.user.dealer_code === null) || ($scope.user.dealer_code === undefined) || ($scope.user.dealer_code === '')) {
                    swal({
                        title: 'Dealer Code Missing!',
                        text: 'Missing Delear code for your dealer account. Please contact admin to get the code. <a href="mailto:admin@cardslyce.com?Subject=Need%20A%20Dealer%20Code" target="_top">Request A Dealer Code Now!</a>',
                        type: 'error',
                        showCancelButton: false,
                        confirmButtonText: 'Ok',
                        closeOnConfirm: false,
                        closeOnCancel: false,
                        animation: 'slide-from-top',
                        html: true
                    });
                }
            }





            console.log('selling stores xxx', store.get('selling_cards'));
            $scope.goBack = function() {

                $location.url('');
            };

            $scope.goNext = function() {
                console.log('current selling cards', $scope.allSellingCards);


                // check dealer code only
                if ($scope.isDealer === true) {
                    var checkDealerCode = false;
                    for (var i = 0; i < $scope.allSellingCards.length; i = i + 1) {
                        if ($scope.allSellingCards[i].dealer_code !== $scope.user.dealer_code) {
                            checkDealerCode = true;
                        }
                    }
                    if ((checkDealerCode === true) && ($scope.isDealer === true)) {
                        swal({
                            title: 'Dealer Code Not Match!',
                            text: 'Dealer Code does not match. Please contact admin to get the code. <a href="mailto:admin@cardslyce.com?Subject=Need%20A%20Dealer%20Code" target="_top">Request A Dealer Code Now!</a>',
                            type: 'error',
                            showCancelButton: false,
                            confirmButtonText: 'Ok',
                            closeOnConfirm: false,
                            closeOnCancel: false,
                            animation: 'slide-from-top',
                            html: true
                        });
                        return;
                    }
                }


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