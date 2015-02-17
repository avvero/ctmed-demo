// create the module and name it scotchApp
var partnerApp = angular.module('partnerApp', ['ngRoute', 'angularFileUpload', 'simpleAngularFileUpload', 'ui.router',
        'ngAnimate',
        'ui.bootstrap',
        'ui.tinymce',
        'ui.tinymce.short',
        "com.2fdevs.videogular",
        "com.2fdevs.videogular.plugins.overlayplay",
        "com.2fdevs.videogular.plugins.controls",
        "com.2fdevs.videogular.plugins.buffering",
        "com.2fdevs.videogular.plugins.poster",
        "com.2fdevs.videogular.plugins.imaads",
        "lingua",
        "lingua-file",
        "ui.sortable",
        "utils",
        "naturalSort",
        "ui.tree"
    ])
    .service('sharedProperties', function () {
        var contextPath = '';
        var fileAddingListener = null
        var notifications = []
        return {
            getContextPath: function () {
                return contextPath;
            },
            setContextPath: function (value) {
                contextPath = value;
            },
            error: function (text, description, error) {
                var noti = {
                    id: notifications.length,
                    type: 'error',
                    title: 'Ошибка',
                    text: text,
                    description: description,
                    error: error
                }
//                notifications.push(noti)
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
//                notifications.push(noti)
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
            addFileAddingListener: function (listener) {
                fileAddingListener = listener
            },
            callFileAddingListener: function (file) {
                fileAddingListener.handle(file)
            },
            getNotifications: function () {
                return notifications
            }
        };
    });

// configure our routes
partnerApp.config(function ($routeProvider, $stateProvider, $urlRouterProvider) {
    $routeProvider

    $urlRouterProvider.otherwise("/")

    $stateProvider
        .state('index', {
            url: "/",
            views: {
                "single": {
                    templateUrl: contextPath + '/pages/partner/home',
                    controller: 'dashboardPartnerController',
                    resolve: dashboardPartnerController.resolve
                }
            }
        })
        .state('info', {
            url: "/info",
            views: {
                "single": {
                    templateUrl: contextPath + '/pages/partner/info',
                    controller: 'infoController',
                    resolve: infoController.resolve
                }
            }
        })
});

// create the controller and inject Angular's $scope
partnerApp.controller('mainPartnerController', function ($scope, $route, $routeParams, $http, $location, sharedProperties, audio, fileUploader, $modal) {
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
    $scope.sharedProperties = sharedProperties;
    sharedProperties.setContextPath(contextPath) //возмем из jsp

    $scope.app = {
        support: "Поддержка: 8-800-457-85-41, +7 (452) 415-74-89"
    }
    $scope.sidebarIsCollapsed = false

    /*******************
     * Плееры
     *******************/
    $scope.audio = audio // сервис
    /*******************
     * Загрузчик
     *******************/
    $scope.uploaderFileListVisibleLimit = 7
    $scope.uploader = fileUploader

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
    /*******************
     * Написать в саппорт
     *******************/
    $scope.writeToSupport = function () {
        var modalInstance = $modal.open({
            templateUrl: contextPath + '/pages/dialogs/writeToSupport',
            controller: 'writeToSupportDialog'
        });

        modalInstance.result.then(function () {
        }, function () {

        });
    }
});

partnerApp.filter('byLevel', function () {
    return function (items, key) {
        var arrayToReturn = [];
        if (typeof(key) == 'undefined') {
            return items;
        }
        for (var i = 0; i < items.length; i++) {
            if (items[i].levelId == key) {
                arrayToReturn.push(items[i]);
            }
        }
        return arrayToReturn;
    };
});

partnerApp.filter('unsafe', function ($sce) {
    return function (val) {
        return $sce.trustAsHtml(val);
    };
});