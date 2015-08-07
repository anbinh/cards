'use strict';


module.exports = function(m) {
    m.controller('SellCardCustomerInfoController', ['$scope', '$location', '$routeParams', 'authService', 'store', 'userService', 'utilService',
        function($scope, $location, $routeParams, authService, store, userService, utilService) {

            var guest;

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




            $scope.sellingCards = {
                billingUser: ($scope.isGuest) ? guest : store.get('user'),
                cards: store.get('selling_cards')
            };

            if ($scope.sellingCards.cards[0].pay_by === 'mail') {
                $scope.subtractAmount = 0;
            } else {
                $scope.subtractAmount = 5;
            }



            console.log('selling cards', store.get('selling_cards'));

            console.log('ME XXXXXXX', $scope.sellingCards.cards[0].pay_by);

            $scope.total = ($scope.sellingCards.cards[0].pay_by === 'mail') ? utilService.totalOfferMailCard($scope.sellingCards.cards) : utilService.totalOfferOnline($scope.sellingCards.cards);

            $scope.totalFaceValue = utilService.totalFaceValue($scope.sellingCards.cards);

            $scope.averagePayout = $scope.total / $scope.totalFaceValue * 100;


            $scope.sellCards = function() {

                if ($scope.agreed === false) {
                    swal('Warning', 'You have to agree the terms and conditions', 'warnning');
                    return;
                }


                var user = ($scope.isGuest) ? guest : store.get('user');

                // find store list
                var store_list = [];

                for (var i = 0; i < $scope.sellingCards.cards.length; i = i + 1) {
                    var card = $scope.sellingCards.cards[i];
                    // console.log('card', card);


                    if (store_list.indexOf(card.store_name) === -1) {
                        store_list.push(card.store_name);
                    }
                }

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




                var selling_cards = {
                    user_id: user.id,
                    billing_user: $scope.sellingCards.billingUser,
                    cards: $scope.sellingCards.cards,
                    total_amount: $scope.total,
                    total_cards: $scope.sellingCards.cards.length,
                    total_face_value: $scope.totalFaceValue,
                    average_payout: $scope.averagePayout,
                    store_list: store_list.join(','),
                    payment: $scope.sellingCards.cards[0].pay_by
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

            };

        }
    ]);
};