// create the module and name it scotchApp
var studentApp = angular.module('studentApp', ['ngRoute', 'angularFileUpload', 'simpleAngularFileUpload', 'ui.router', "ngAnimate",
        "com.2fdevs.videogular",
        "com.2fdevs.videogular.plugins.overlayplay",
        "com.2fdevs.videogular.plugins.controls",
        "com.2fdevs.videogular.plugins.buffering",
        "com.2fdevs.videogular.plugins.poster",
        "com.2fdevs.videogular.plugins.imaads",
        'ui.bootstrap',
        'lingua',
        "lingua-file",
        'ui.tinymce.short',
        "naturalSort",
        "ui.tree",
        "lingua.utils"
    ])
//    .value('$anchorScroll', angular.noop)
    .service('sharedProperties', function () {
        var contextPath = '';
        var fileAddingListener = null
        return {
            getContextPath: function () {
                return contextPath;
            },
            setContextPath: function (value) {
                contextPath = value;
            },
            error: function (text) {
                $.gritter.add({
                    title: 'Ошибка',
                    text: text,
                    class_name: 'gritter-error'
                });
            },
            success: function (text) {
                $.gritter.add({
                    title: 'Успех',
                    time: 1000,
                    text: text,
                    class_name: 'gritter-success'
                });
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
            }
        };
    });
;

studentApp.factory('userInfoService', function ($http, $q) {
    return {
        getUserInfo: function () {
            return $http({method: 'GET', url: '/user/info'});
        }
    };
});

// configure our routes
studentApp.config(function ($routeProvider, $stateProvider, $urlRouterProvider, $httpProvider) {

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
                }
                return $q.reject(rejection);
            }
        };
    });

    $routeProvider

    $urlRouterProvider.otherwise("/")

    $stateProvider
        .state('index', {
            url: "/",
            views: {
                "single": {
                    templateUrl: contextPath + '/pages/student/home',
                    controller: 'dashboardStudentController',
                    resolve: dashboardStudentController.resolve
                }
            }
        })
        .state('comments', {
            url: "/comments",
            views: {
                "single": {
                    templateUrl: contextPath + '/pages/student/homeComments',
                    controller: 'dashboardStudentController',
                    resolve: dashboardStudentController.resolve
                }
            }
        })
        .state('info', {
            url: "/info",
            views: {
                "single": {
                    templateUrl: contextPath + '/pages/student/info',
                    controller: 'infoStudentController',
                    resolve: infoStudentController.resolve
                }
            }
        })
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
        .state('course', {
            url: "/course/:id",
            views: {
                "single": {
                    templateUrl: contextPath + '/pages/public/course',
                    controller: 'courseMarketController',
                    resolve: courseMarketController.resolve
                }
            }
        })
        .state('course_paymentSuccess', {
            url: "/course/:id/paymentSuccess",
            views: {
                "single": {
                    templateUrl: contextPath + '/pages/public/course_paymentSuccess',
                    controller: 'courseMarketController',
                    resolve: courseMarketController.resolve
                }
            }
        })
        .state('course_paymentFail', {
            url: "/course/:id/paymentFail",
            views: {
                "single": {
                    templateUrl: contextPath + '/pages/public/course_paymentFail',
                    controller: 'courseMarketController',
                    resolve: courseMarketController.resolve
                }
            }
        })
        .state('course_getFreeSuccess', {
            url: "/course/:id/getFreeSuccess",
            views: {
                "single": {
                    templateUrl: contextPath + '/pages/public/course_getFreeSuccess',
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
        .state('boughtCourses', {
            url: "/boughtCourses",
            views: {
                "single": {
                    templateUrl: contextPath + '/pages/student/boughtCourses',
                    controller: 'boughtCoursesController',
                    resolve: boughtCoursesController.resolve
                }
            }
        })
        .state('boughtCourse', {
            url: "/boughtCourse/:id",
            views: {
                "single": {
                    templateUrl: contextPath + '/pages/student/boughtCourse',
                    controller: 'boughtCourseController',
                    resolve: boughtCourseController.resolve
                }
            }
        })
        .state('boughtCourse.lesson', {
            url: "/lesson/:lessonId",
            views: {
                "nested_top": {
                    templateUrl: contextPath + '/pages/student/boughtCourseLesson'
                }
            }
        })
        // Мапинг URL тьютора
        .state('studentBoughtCourse', {
            url: "/studentBoughtCourse/:id",
            views: {
                "single": {
                    templateUrl: contextPath + '/pages/student/boughtCourse',
                    controller: 'boughtCourseController',
                    resolve: boughtCourseController.resolve
                }
            }
        })
        .state('studentBoughtCourse.lesson', {
            url: "/lesson/:lessonId",
            views: {
                "nested_top": {
                    templateUrl: contextPath + '/pages/student/boughtCourseLesson'
                }
            }
        })
        .state('tutorCourse', {
            url: "/tutor/course/:id",
            views: {
                "single": {
                    templateUrl: contextPath + '/pages/student/boughtCourse',
                    controller: 'boughtCourseController',
                    resolve: boughtCourseController.resolve
                }
            }
        })
//        .state('tutorCourse.lessons', {
//            url: "/lessons",
//            views: {
//                "single": {
//                    templateUrl: contextPath + '/pages/student/boughtCourse',
//                    controller: 'boughtCourseController',
//                    resolve: boughtCourseController.resolve
//                }
//            }
//        })
        .state('tutorCourse.lesson', {
            url: "/lessons/lesson/:lessonId",
            views: {
                "nested_top": {
                    templateUrl: contextPath + '/pages/student/boughtCourseLesson'
                }
            }
        })
        .state('tutorCourse.info', {
            url: "/info",
            views: {
                "nested_single": {
                    templateUrl: contextPath + '/pages/tutor/course_info'
                }
            }
        })
        .state('cards', {
            url: "/cards",
            views: {
                "single": {
                    templateUrl: contextPath + '/pages/student/cards',
                    controller: 'cardsStudentController',
                    resolve: cardsStudentController.resolve
                }
            }
        })
        .state('plans', {
            url: "/plans",
            views: {
                "single": {
                    templateUrl: contextPath + '/pages/public/plans',
                    controller: 'plansController',
                    resolve: plansController.resolve
                }
            }
        })
        .state('operations', {
            url: "/operations",
            views: {
                "single": {
                    templateUrl: contextPath + '/pages/public/operations',
                    controller: 'operationsController',
                    resolve: operationsController.resolve
                }
            }
        })
});

// create the controller and inject Angular's $scope
studentApp.controller('mainStudentController', function ($scope, $route, $routeParams, $http, $location, sharedProperties, userInfoService, audio, $modal, fileUploader) {
    userInfoService.getUserInfo().then(function (data) {
        $scope.userInfo = data.data;
    });

    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
    sharedProperties.setContextPath(contextPath) //возмем из jsp

    /*******************
     * Переключатель VIEW
     *******************/
    $scope.app = {
        support: "Поддержка: 8-800-457-85-41, +7 (452) 415-74-89",
        currentView: 'common',
        setCurrentView: function (name) {
            $scope.app.currentView = name
            // Вернем шрифт по умолчанию
            if ('common' == name) {
                $scope.app.setTextBlockFontSize('minier')
            }
        },
        textBlockFontSize: 'minier',
        setTextBlockFontSize: function (value) {
            $scope.app.textBlockFontSize = value
        }
    }
    $scope.sidebarIsCollapsed = false
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
     * Плееры
     *******************/
    $scope.audio = audio // сервис
    /*******************
     * Загрузчик
     *******************/
    $scope.uploaderFileListVisibleLimit = 7
    $scope.uploader = fileUploader
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

studentApp.filter('byLevel', function () {
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

studentApp.directive('translateText', [function ($scope) {
    return {
        compile: function compile(templateElement, templateAttrs) {
            templateElement.prepend(
                "<div class='trsl_div' ng-repeat='item in getSplittedText(" + templateAttrs.translateText + ") track by $index'>" +
                    "<div class='trsl_word' ng-click='selectWord(item)' ng-bind-html='item'>" +
                    "</div>&nbsp;" +
                    "</div>");
        }
    }
}]);

studentApp.directive('translateTextHtml', [function ($scope) {
    return {
        compile: function compile(templateElement, templateAttrs) {
            templateElement.prepend(
                "<div class='trsl_div' ng-repeat='item in getHtmlParts(" + templateAttrs.translateTextHtml + ") track by $index'>" +
                    "<div class='trsl_div' translate-text='item'></div>" +
                    "</div>");
        }
    }
}]);

studentApp.filter('unsafe', function ($sce) {
    return function (val) {
        return $sce.trustAsHtml(val);
    };
});