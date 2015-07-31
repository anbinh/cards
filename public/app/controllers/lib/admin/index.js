'use strict';


module.exports = function(m) {
    m.controller('AdminIndexController', function($scope, $rootScope, store, $location, storeService, authService, SiteStats) {

        authService.adminAuthenticate();

        $rootScope.$broadcast('CHANGE_SIDEBAR_ITEM', 'dashboard', '');

        $scope.stats = SiteStats;

        $scope.range = 1;
        $scope.currentTab = 'all';


        storeService.dateRanges().$promise.then(function(dat) {
            $scope.dateRanges = dat;

            $scope.dateRanges.min_date = new Date($scope.dateRanges.min_date);
            $scope.dateRanges.max_date = new Date($scope.dateRanges.max_date);

            var one_day = 1000 * 60 * 60 * 24;
            var one_week = 1000 * 60 * 60 * 24 * 7;
            var one_month = 1000 * 60 * 60 * 24 * 30;

            var date1_ms = $scope.dateRanges.min_date.getTime();
            var date2_ms = $scope.dateRanges.max_date.getTime();

            var difference_ms = date2_ms - date1_ms;

            $scope.nDays = Math.round(difference_ms / one_day);
            $scope.nWeeks = Math.round(difference_ms / one_week);
            $scope.nMonths = Math.round(difference_ms / one_month);

            // console.log("mexx", $scope.dateRanges);
        });


        $scope.all = function() {
            $scope.currentTab = 'all';
            $scope.range = 1;
        };
        $scope.daily = function() {
            $scope.currentTab = 'daily';
            $scope.range = $scope.nDays;
        };
        $scope.weekly = function() {
            $scope.currentTab = 'weekly';
            $scope.range = $scope.nWeeks;
        };
        $scope.monthly = function() {
            $scope.currentTab = 'monthly';
            $scope.range = $scope.nMonths;
        };


        // 




        console.log(SiteStats, $scope.dateRanges);

    });
};