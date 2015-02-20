// create the module and name it scotchApp
var clientApp = angular.module('clientApp', [
        'ngRoute',
        'ui.router',
        'ngAnimate',
        'ui.bootstrap'
    ])
    .service('sharedProperties', function ($modal) {
        var notifications = []
        return {
            error: function (text, description, error) {
                var noti = {
                    id: notifications.length,
                    type: 'error',
                    title: 'Ошибка',
                    time: 5000,
                    text: text,
                    description: description,
                    error: error
                }
                noti.class_name = 'gritter-error'
                $.gritter.add(noti);
            },
            notification: function (description, error) {
                var noti = {
                    id: notifications.length,
                    type: 'error',
                    title: 'Ошибка',
                    description: description,
                    error: error
                }
                notifications.push(noti)
            },
            success: function (text, description) {
                var noti = {
                    id: notifications.length,
                    type: 'success',
                    title: 'Успех',
                    time: 1000,
                    text: text,
                    description: description
                }
                noti.time = 1000
                noti.class_name = 'gritter-success'
                $.gritter.add(noti)
            },
            info: function (text) {
                $.gritter.add({
                    title: 'Информация',
                    time: 1000,
                    text: text,
                    class_name: 'gritter-info'
                });
            },
            sharedScope: {},
            getSharedScope: function () {
                return this.sharedScope
            }
        };
    });

// configure our routes
clientApp.config(function ($routeProvider, $stateProvider, $urlRouterProvider) {
    $routeProvider

    $urlRouterProvider.otherwise("/")

    $stateProvider
        .state('index', {
            url: "/",
            views: {
                "single": {
                    templateUrl: '/client/view/templates.html',
                    controller: 'templatesController',
                    resolve: templatesController.resolve
                }
            }
        })
        .state('template', {
            url: "/template/:id",
            views: {
                "single": {
                    templateUrl: '/client/view/template.html',
                    controller: 'templateController',
                    resolve: templateController.resolve
                }
            }
        })
        .state('template.documents', {
            url: "/document",
            views: {
                "nested_single": {
                    templateUrl: '/client/view/documents.html',
                    controller: 'documentsController',
                    resolve: documentsController.resolve
                }
            }
        })
        .state('template.document', {
            url: "/document/:documentId",
            views: {
                "nested_single": {
                    templateUrl: function ($stateParams){
                        return '/view/' + $stateParams.id;
                    },
                    controller: 'documentController',
                    resolve: documentController.resolve
                }
            }
        })
});

// create the controller and inject Angular's $scope
clientApp.controller('mainClientController', function ($scope, $route, $routeParams, $http, $location, sharedProperties) {
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
    $scope.sharedProperties = sharedProperties;

    $scope.app = {
        name: 'project #2'
    }

    /*******************
     *
     *******************/
    $scope.checkLocationPath = function (path, keys) {
        keys = keys.split(',')
        var result = false;
        for (var i = 0; i < keys.length; i++) {
            if (!result) {
                result = path.indexOf(keys[i]) == 0
            }
        }
        return result
    }

    $scope.hasPendingRequests = function () {
        // Отслеживаем только GET запросы
        var isPending = $http.pendingRequests.length > 0 && $http.pendingRequests[0].method == "GET";
        if ($http.pendingRequests.length > 0 && $http.pendingRequests[0].showSpinner) {
            isPending = true;
        }
        return isPending
    };
});

clientApp.filter('unsafe', function ($sce) {
    return function (val) {
        return $sce.trustAsHtml(val);
    };
});