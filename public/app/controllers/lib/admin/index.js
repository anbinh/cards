'use strict';


module.exports = function(m) {
    m.controller('AdminIndexController', function($scope, $rootScope, store, $location, storeService, authService, SiteStats) {

        authService.adminAuthenticate();

        $rootScope.$broadcast('CHANGE_SIDEBAR_ITEM', 'dashboard', '');

        $scope.stats = SiteStats;

        console.log(SiteStats);

    });
};