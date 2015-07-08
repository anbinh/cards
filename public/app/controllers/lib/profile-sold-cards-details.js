'use strict';


module.exports = function(m) {
    m.controller('SoldCardDetailController', ['$scope', '$location', '$routeParams', 'authService', 'store', 'userService', 'SoldCardList',
        function($scope, $location, $routeParams, authService, store, userService, SoldCardList) {




            $scope.sellingCards = SoldCardList;

            // console.log('elling cards', $scope.sellingCards);

            $scope.total = $scope.sellingCards.total_amount;

            $scope.totalFaceValue = $scope.sellingCards.total_face_value;

            $scope.averagePayout = $scope.sellingCards.average_payout;


        }
    ]);
};