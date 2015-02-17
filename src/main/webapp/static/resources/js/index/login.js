// create the module and name it scotchApp
var loginApp = angular.module('loginApp', [])

// create the controller and inject Angular's $scope
loginApp.controller('loginPageController', function ($scope, $location) {

    $scope.locationHash = $location.url()

});