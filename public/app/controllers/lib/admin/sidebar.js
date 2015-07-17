'use strict';


module.exports = function(m) {
    m.controller('AdminSideBarController', function($scope, $rootScope, store, $location, storeService, authService) {
        authService.adminAuthenticate();
        $scope.currentActiveParent = 'dashboard';
        $scope.currentActiveChild = '';
        $rootScope.$on('CHANGE_SIDEBAR_ITEM', function(event, parent, child) {
            console.log('parent child', parent, child);
            $scope.currentActiveParent = parent;
            $scope.currentActiveChild = child;
        })




    });
};