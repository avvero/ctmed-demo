// create the module and name it scotchApp
//angular.module('HashBangURLs', []).config(['$locationProvider', function ($location) {
//    $location.hashPrefix('!');
//}]);
//var guestApp = angular.module('guestApp', ['HashBangURLs', 'ngRoute', 'angularFileUpload', 'simpleAngularFileUpload', 'ui.router',
var guestApp = angular.module('guestApp', ['ngRoute', 'angularFileUpload', 'simpleAngularFileUpload', 'ui.router',
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
        "ui.tree",
        "lingua.utils"
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
guestApp.config(function ($routeProvider, $stateProvider, $urlRouterProvider, $httpProvider) {

    $httpProvider.interceptors.push(function ($q) {
        return {
            'response': function (response) {
                if (response.data && response.data.indexOf && response.data.indexOf("forward:") == 0) {
                    var url = response.data.split("forward:")[1]
                    window.location = '/profile#' + url
                }
                //Will only be called for HTTP up to 300
                return response
            },
            'responseError': function (rejection) {
                if (rejection.status === 401) {
                    location.reload();
                } else if (rejection.status === 403) {
                    window.location = "/login"
                }
                return $q.reject(rejection);
            }
        };
    });

    $routeProvider

    $urlRouterProvider.otherwise("/market")

    $stateProvider
        .state('market', {
            url: "/market",
            views: {
                "single": {
                    templateUrl: contextPath + '/pages/public/market',
                    controller: 'marketController',
                    resolve: marketController.resolve
                }
            }
        })
        .state('market_course', {
            url: "/course/:id",
            views: {
                "single": {
                    templateUrl: contextPath + '/pages/public/course',
                    controller: 'courseMarketController',
                    resolve: courseMarketController.resolve
                }
            }
        })
        .state('publicTutor', {
            url: "/public/tutor/:id",
            views: {
                "single": {
                    templateUrl: contextPath + '/pages/public/publicTutor',
                    controller: 'publicTutorController',
                    resolve: publicTutorController.resolve
                }
            }
        })
        .state('publicStudent', {
            url: "/public/student/:id",
            views: {
                "single": {
                    templateUrl: contextPath + '/pages/public/publicStudent',
                    controller: 'publicStudentController',
                    resolve: publicStudentController.resolve
                }
            }
        })
});

// create the controller and inject Angular's $scope
guestApp.controller('mainGuestController', function ($scope, $route, $routeParams, $http, $location, sharedProperties, audio, fileUploader, $modal) {
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

guestApp.filter('byLevel', function () {
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

guestApp.filter('unsafe', function ($sce) {
    return function (val) {
        return $sce.trustAsHtml(val);
    };
});