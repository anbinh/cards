'use strict';


module.exports = function(m) {
    m.controller('SellCardCustomerInfoController', ['$scope', '$location', '$routeParams', 'authService', 'store', 'userService', 'utilService', 'storeList',
        function($scope, $location, $routeParams, authService, store, userService, utilService, storeList) {

            var guest;

            var cards;



            //discount by "enter online" method to 5.75%
            $scope.ENTER_ONLINE_DISCOUNT = 0.0575;

            if ($routeParams.guest === 'true') {
                $scope.isGuest = true;
                guest = {
                    id: 0
                };
            } else {
                $scope.isGuest = false;
            }


            $scope.user = store.get('user');

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



            cards = store.get('selling_cards');

            // to check the number of cards remaining we can add
            // to the inventory
            var availAmounts = {};
            for (var i = 0; i < storeList.length; i = i + 1) {
                availAmounts[storeList[i].id] = storeList[i].limit - storeList[i].inventory;
            }
            // console.log('Availe amount', availAmounts);


            // check if the selling has pending cards 
            $scope.hasPendingCards = false;
            $scope.hasValidCards = false;
            for (i = 0; i < cards.length; i = i + 1) {
                if (availAmounts[cards[i].store_id] > 0) {
                    cards[i].status = 'ok';
                    availAmounts[cards[i].store_id] -= 1;
                    $scope.hasValidCards = true;
                } else {
                    cards[i].status = 'pending';
                    $scope.hasPendingCards = true;
                }
            }


            var validCards = [];
            var pendingCards = [];
            for (i = 0; i < cards.length; i = i + 1) {
                if (cards[i].status === 'ok') {
                    validCards.push(cards[i]);
                }

                if (cards[i].status === 'pending') {
                    pendingCards.push(cards[i]);
                }
            }



            if ($scope.hasValidCards === true) {
                // init selling cards
                $scope.sellingCards = {
                    billingUser: ($scope.isGuest) ? guest : store.get('user'),
                    cards: validCards
                };

                console.log('selling cards', $scope.sellingCards);

                if ($scope.sellingCards.cards[0].pay_by === 'mail') {
                    $scope.subtractAmount = 0;
                } else {
                    $scope.subtractAmount = 5;
                }


                console.log('PAYBY:', $scope.sellingCards.cards[0].pay_by);
                // console.log('store limit', storeList);
                $scope.total = ($scope.sellingCards.cards[0].pay_by === 'mail') ? utilService.totalOfferMailCard($scope.sellingCards.cards) : utilService.totalOfferOnline($scope.sellingCards.cards);
                $scope.totalFaceValue = utilService.totalFaceValue($scope.sellingCards.cards);
                $scope.averagePayout = $scope.total / $scope.totalFaceValue * 100;
            }



            if ($scope.hasPendingCards === true) {
                // init pending cards 
                $scope.pendingCards = {
                    billingUser: ($scope.isGuest) ? guest : store.get('user'),
                    cards: pendingCards
                };
                if ($scope.pendingCards.cards[0].pay_by === 'mail') {
                    $scope.subtractAmount = 0;
                } else {
                    $scope.subtractAmount = 5;
                }
                $scope.pendingTotal = ($scope.pendingCards.cards[0].pay_by === 'mail') ? utilService.totalOfferMailCard($scope.pendingCards.cards) : utilService.totalOfferOnline($scope.pendingCards.cards);
                $scope.pendingTotalFaceValue = utilService.totalFaceValue($scope.pendingCards.cards);
                $scope.pendingAveragePayout = $scope.pendingTotal / $scope.totalFaceValue * 100;


            }


            $scope.sellCards = function() {

                if ($scope.agreed === false) {
                    swal('Warning', 'You have to agree the terms and conditions', 'warnning');
                    return;
                }





                if ($scope.hasValidCards === true) {
                    var user = ($scope.isGuest) ? guest : store.get('user');
                    var bilingUser = $scope.sellingCards.billingUser;
                    if ($scope.isGuest === true) {
                        if (($scope.sellingCards.cards[0].pay_by === 'online') && (bilingUser.email !== bilingUser.email2)) {
                            swal('Error!', 'Email does not match', 'error');
                            return;
                        }

                        if (($scope.sellingCards.cards[0].pay_by === 'online') && (bilingUser.password !== bilingUser.password2)) {
                            swal('Error!', 'Password does not match', 'error');
                            return;
                        }
                    }

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
                        store_list: store_list.join(','),
                        payment: $scope.sellingCards.cards[0].pay_by,
                        status: 'ok'
                    };



                    console.log('YOUR SELLING CARDS', selling_cards);

                    userService.sellCards(selling_cards, function(result) {

                        console.log(result);

                        store.set('selling_cards', []);
                        store.set('selling_stores', []);


                        if ($scope.isGuest) {
                            $location.url('receipt/' + result.id + '?guest=true');
                        } else {
                            $location.url('receipt/' + result.id);
                        }


                        console.log('RECEIPT', result);
                    }, function(err) {
                        // console.log("ERRR", err);
                        swal('Error', err.data.message, 'error');
                    });
                }




                // save pending cards
                if ($scope.hasPendingCards === true) {
                    var user = ($scope.isGuest) ? guest : store.get('user');
                    var bilingUser = $scope.pendingCards.billingUser;
                    if ($scope.isGuest === true) {
                        if (($scope.pendingCards.cards[0].pay_by === 'online') && (bilingUser.email !== bilingUser.email2)) {
                            swal('Error!', 'Email does not match', 'error');
                            return;
                        }

                        if (($scope.pendingCards.cards[0].pay_by === 'online') && (bilingUser.password !== bilingUser.password2)) {
                            swal('Error!', 'Password does not match', 'error');
                            return;
                        }
                    }
                    // find store list
                    var store_list = [];
                    for (var i = 0; i < $scope.pendingCards.cards.length; i = i + 1) {
                        var card = $scope.pendingCards.cards[i];
                        // console.log('card', card);


                        if (store_list.indexOf(card.store_name) === -1) {
                            store_list.push(card.store_name);
                        }
                    }


                    var my_pending_cards = {
                        user_id: user.id,
                        billing_user: $scope.pendingCards.billingUser,
                        cards: $scope.pendingCards.cards,
                        total_amount: $scope.pendingTotal,
                        total_cards: $scope.pendingCards.cards.length,
                        total_face_value: $scope.pendingTotalFaceValue,
                        average_payout: $scope.pendingAveragePayout,
                        store_list: store_list.join(','),
                        payment: $scope.pendingCards.cards[0].pay_by,
                        status: 'pending'
                    };



                    console.log('YOUR PENDING CARDS', my_pending_cards);

                    userService.sellCards(my_pending_cards, function(result) {
                        console.log(result);
                        console.log('PENDING RECEIPT', result);

                        // only redirect when valid cards are not found
                        if ($scope.hasValidCards === false) {
                            store.set('selling_cards', []);
                            store.set('selling_stores', []);
                            if ($scope.isGuest) {
                                $location.url('receipt/' + result.id + '?guest=true');
                            } else {
                                $location.url('receipt/' + result.id);
                            }
                        }
                    }, function(err) {
                        // console.log("ERRR", err);
                        swal('Error', err.data.message, 'error');
                    });
                }




            };

        }
    ]);
};