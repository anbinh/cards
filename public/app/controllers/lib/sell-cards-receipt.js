'use strict';


module.exports = function(m) {
    m.controller('SellCardReceiptController', ['$scope', '$location', '$routeParams', 'authService', 'store', 'userService', 'SellingCardList', 'utilService',
        function($scope, $location, $routeParams, authService, store, userService, SellingCardList, utilService) {

            var guest;

            if ($routeParams.guest === 'true') {
                $scope.isGuest = true;
                guest = {
                    id: 0
                };
            } else {
                $scope.isGuest = false;
            }



            $scope.sellingCards = SellingCardList;

            // console.log('elling cards', $scope.sellingCards);

            $scope.total = $scope.sellingCards.total_amount;

            $scope.totalFaceValue = $scope.sellingCards.total_face_value;

            $scope.averagePayout = $scope.sellingCards.average_payout;

            $scope.viewSellingHistory = function() {
                window.location = '/profile/#/sold-cards-history';
            };


        }
    ]);
};