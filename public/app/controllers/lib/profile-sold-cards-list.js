'use strict';


module.exports = function(m) {
    m.controller('SoldCardListListController', ['$scope', '$location', '$routeParams', 'authService', 'store', 'userService', 'SoldCardsList',
        function($scope, $location, $routeParams, authService, store, userService, SoldCardsList) {

            if (!authService.isAuthenticated()) {
                window.location = '/unauthorized/';
            }

            // var user = store.get('user');

            $scope.soldCardsList = SoldCardsList;


            $scope.soldCardsDetail = function(id) {
                window.location = '/profile/#/sold-cards/' + id;
            };




            for (var i = 0; i < $scope.soldCardsList.length; i = i + 1) {

                var slides = [];
                var storeList = $scope.soldCardsList[i].store_list.split(',');

                console.log('store', storeList);
                for (var j = 0; j < storeList.length; j = j + 1) {

                    slides.push({
                        image: storeList[i],
                        text: ''
                    });

                }
                $scope.soldCardsList[i].slides = slides;

            }


        }
    ]);
};