'use strict';


module.exports = function(m) {
    m.controller('LoginController', ['$scope', '$location', '$routeParams', 'authService', 'store', 'userService', 'isDealer',
        function($scope, $location, $routeParams, authService, store, userService, isDealer) {

            console.log('LOGIN', $routeParams);

            $scope.isDealer = isDealer;

            $scope.login = function() {
                userService.login($scope.user, function(ret) {


                    // if ((ret.role === 'dealer') && ($scope.isDealer === false)) {
                    //     swal('Error!', 'This login panel is for normal users', 'error');
                    //     return;
                    // }

                    // if ((ret.role === 'user') && ($scope.isDealer === true)) {
                    //     swal('Error!', 'This login panel is for dealers', 'error');
                    //     return;
                    // }


                    console.log(ret);
                    store.set('user', ret);


                    if ($routeParams.forward_url !== '' && $routeParams.forward_url !== undefined) {
                        console.log('$routeParams.forward_url', atob($routeParams.forward_url));
                        window.location = atob($routeParams.forward_url);
                    } else {
                        window.location = '/profile/';
                    }

                }, function(err) {
                    swal('Error', err.data.message, 'error');
                });
            };
        }
    ]);
};