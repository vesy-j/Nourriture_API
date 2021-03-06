'use strict';
  
angular.module('webNourritureApp')
  
.controller('LoginController',
    ['$scope', '$rootScope', '$location','$http','$window','AuthenticationService',
    function ($scope, $rootScope, $location, $http,$window, AuthenticationService) {
        // reset login status
        AuthenticationService.ClearCredentials();
        delete $window.sessionStorage['userid'];
        delete $window.sessionStorage['username'];
        $scope.message='message';
        $scope.login = function () {
            AuthenticationService.Login($scope.username, $scope.password, function(response) {
                if(response) {
                    AuthenticationService.SetCredentials($scope.username, $scope.password);
                    $window.sessionStorage['userid']=response[0]._id;
                    $window.sessionStorage['username']=response[0].username;
                    $location.path('/');
                    $window.location.reload();
                } else {
                    $scope.error = response.message;
                }
            });
        };
    }]);