// create the module and name it scotchApp
var managerApp = angular.module('managerApp', ['ngRoute','angularFileUpload', 'ui.router', 'ngAnimate'])
    .service('sharedProperties', function () {
        var contextPath = '';
        var fileAddingListener = null
        return {
            getContextPath: function () {
                return contextPath;
            },
            setContextPath: function(value) {
                contextPath = value;
            },
            error: function(text) {
                $.gritter.add({
                    title: 'Ошибка',
                    text: text,
                    class_name: 'gritter-error'
                });
            },
            success: function(text) {
                $.gritter.add({
                    title: 'Успех',
                    time: 1000,
                    text: text,
                    class_name: 'gritter-success'
                });
            },
            info: function(text) {
                $.gritter.add({
                    title: 'Информация',
                    time: 1000,
                    text: text,
                    class_name: 'gritter-info'
                });
            },
            addFileAddingListener : function(listener) {
                fileAddingListener = listener
            },
            callFileAddingListener : function(file) {
                fileAddingListener.handle(file)
            }
        };
    });

// configure our routes
managerApp.config(function($routeProvider, $stateProvider, $urlRouterProvider) {
    $routeProvider

    $urlRouterProvider.otherwise("/")

    $stateProvider
        .state('index', {
            url: "/",
            views: {
                "single": {
                    templateUrl : contextPath + '/pages/manager/home',
                    controller  : 'mainManagerController'
                }
            }
        })
        .state('payments', {
            url: "/payments",
            views: {
                "single": {
                    templateUrl : contextPath +'/pages/manager/payments',
                    controller  : 'paymentsManagerController',
                    resolve: paymentsManagerController.resolve
                }
            }
        })
});

// create the controller and inject Angular's $scope
managerApp.controller('mainManagerController', function($scope, $route, $http, $routeParams, $location, sharedProperties) {
    $scope.hasPendingRequests = function () {
        // Отслеживаем только GET запросы
        return $http.pendingRequests.length > 0 && $http.pendingRequests[0].method == "GET";
    };

    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
    sharedProperties.setContextPath(contextPath) //возмем из jsp

    $scope.app = {
        support: "Поддержка: 8-800-457-85-41, +7 (452) 415-74-89"
    }
    $scope.checkLocationPath = function(path, keys) {
        keys = keys.split(',')
        var result = false;
        for (var i =0; i < keys.length; i++) {
            if (!result) {
                result = path.indexOf(keys[i]) == 0
            }
        }
        return result
    }
});

managerApp.filter('byLevel', function(){
    return function(items, key){
        var arrayToReturn = [];
        if (typeof(key) == 'undefined') {
            return items;
        }
        for (var i=0; i<items.length; i++){
            if (items[i].levelId == key) {
                arrayToReturn.push(items[i]);
            }
        }
        return arrayToReturn;
    };
});