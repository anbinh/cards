'use strict';


module.exports = function(m) {
    m.controller('AdminIndexController', function($scope, $rootScope, store, $location, storeService, authService) {

        authService.adminAuthenticate();


        $rootScope.$broadcast('CHANGE_SIDEBAR_ITEM', 'dashboard', '');

    });
};