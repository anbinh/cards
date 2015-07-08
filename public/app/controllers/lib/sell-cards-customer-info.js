'use strict';


module.exports = function(m) {
    m.controller('SellCardCustomerInfoController', ['$scope', '$location', '$routeParams', 'authService', 'store', 'userService', 'utilService',
        function($scope, $location, $routeParams, authService, store, userService, utilService) {



            $scope.sellingCards = {
                billingUser: store.get('user'),
                cards: store.get('selling_cards')
            };

            console.log('selling cards', store.get('selling_cards'));

            $scope.total = utilService.totalOfferMailCard($scope.sellingCards.cards);

            $scope.totalFaceValue = utilService.totalFaceValue($scope.sellingCards.cards);

            $scope.averagePayout = utilService.averagePayout($scope.sellingCards.cards);


            $scope.sellCards = function() {

                var user = store.get('user');

                // find store list
                var store_list = [];

                for (var i = 0; i < $scope.sellingCards.cards.length; i = i + 1) {
                    var card = $scope.sellingCards.cards[i];
                    // console.log('card', card);


                    if (store_list.indexOf(card.store_name) === -1) {
                        store_list.push(card.store_name);
                    }
                }

                var selling_cards = {
                    user_id: user.id,
                    billing_user: $scope.sellingCards.billingUser,
                    cards: $scope.sellingCards.cards,
                    total_amount: $scope.total,
                    total_cards: $scope.sellingCards.cards.length,
                    total_face_value: $scope.totalFaceValue,
                    average_payout: $scope.averagePayout,
                    store_list: store_list.join(',')
                };

                console.log('YOUR SELLING CARDS', selling_cards);

                userService.sellCards(selling_cards, function(result) {

                    console.log(result);

                    store.set('selling_cards', []);
                    store.set('selling_stores', []);

                    $location.url('receipt/' + result.id);

                    console.log('RECEIPT', result);
                }, function(err) {
                    // console.log("ERRR", err);
                    swal('Error', err.data.message, 'error');
                });

            };

        }
    ]);
};