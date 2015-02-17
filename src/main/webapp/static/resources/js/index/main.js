// create the module and name it scotchApp
var indexApp = angular.module('indexApp', [
    'ui.bootstrap'
])

// create the controller and inject Angular's $scope
indexApp.controller('mainPageController', function($scope, $location, $anchorScroll, $http, $modal) {

    $scope.login = ""
    $scope.password = ""
    $scope.loginError = ""

    $scope.cTab = 1
    $scope.setCTab = function(index) {
        $scope.cTab = index
    }
    $scope.tab = 'main'

    $scope.goToMain = function() {
        $location.hash('main');
        $scope.tab = 'main'
        $anchorScroll();
    }
    $scope.goToHow = function() {
        $location.hash('how');
        $scope.tab = 'how'
        $anchorScroll();
    }
    $scope.goToFaq = function() {
        $location.hash('faq');
        $scope.tab = 'faq'
        $anchorScroll();
    }
    $scope.showLoginForm = function() {
        var modalInstance = $modal.open({
            templateUrl : '/pages/dialogs/login',
            controller  : 'loginDialog',
            size: "sm"
        });

        modalInstance.result.then(function (name) {
            window.location = "/profile"
        }, function () {

        });
    }

});