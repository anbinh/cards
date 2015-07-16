'use strict';


module.exports = function(m) {
    m.controller('AdminUsersController', function($scope, $rootScope, store, $location, storeService, authService, $timeout) {



        $rootScope.$broadcast('CHANGE_SIDEBAR_ITEM', 'customers', 'users');


        $scope.users = [];

        var user = {
            first_name: 'ho',
            last_name: 'thai',
            email: 'tinhoc@outlook.com',
            address: '80 sentinel',
            city: 'Tonroto',
            state: 'Ontario',
            created_date: new Date()
        };

        var users = [];
        for (var i = 0; i < 100; i = i + 1) {
            var myUser = JSON.parse(JSON.stringify(user));
            myUser.last_name += (Math.random() * 100 | 0);
            users.push(myUser);
        }

        $scope.users = users;

        $timeout(function() {
            $('#datatable-default').dataTable();
        });
    });
};