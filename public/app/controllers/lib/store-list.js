'use strict';
module.exports = function(m) {
    m.controller('StoreListController', ['$scope', '$location', '$routeParams', 'authService', 'storeService', 'storeList',

        function($scope, $location, $routeParams, authService, storeService, storeList) {

            $scope.oneAtATime = false;

            $scope.bCount = 0;
            $scope.cCount = 0;
            $scope.eCount = 0;
            $scope.fCount = 0;
            $scope.hCount = 0;

            $scope.totalStores = 0;


            $scope.stores = storeList;

            // min max discount
            var minD = 100;
            var maxD = 0;
            angular.forEach($scope.stores, function(s) {
                if (s.category === 'B') {
                    $scope.bCount += 1;
                }
                if (s.category === 'C') {
                    $scope.cCount += 1;
                }
                if (s.category === 'E') {
                    $scope.eCount += 1;
                }
                if (s.category === 'F') {
                    $scope.fCount += 1;
                }
                if (s.category === 'H') {
                    $scope.hCount += 1;
                }

                if (minD > s.discount) {
                    minD = s.discount;
                }

                if (maxD < s.discount) {
                    maxD = s.discount;
                }
            });

            $scope.totalStores = $scope.stores;

            var minDiscount = parseInt(minD);
            var maxDiscount = parseInt(maxD);

            // console.log('SCOPE', $scope);

            $scope.discount = {
                from: minDiscount,
                to: maxDiscount
            };


            $scope.minDiscount = minDiscount;
            $scope.maxDiscount = maxDiscount;


            $scope.categoryIncludes = [];

            $scope.includeCategory = function(category) {


                var i = $.inArray(category, $scope.categoryIncludes);
                if (i > -1) {
                    $scope.categoryIncludes.splice(i, 1);
                } else {
                    $scope.categoryIncludes.push(category);
                }


            };

            $scope.categoryFilter = function(store) {
                if ($scope.categoryIncludes.length > 0) {
                    if ($.inArray(store.category, $scope.categoryIncludes) < 0)
                        return;
                }

                return store;
            };





        }
    ]);
};