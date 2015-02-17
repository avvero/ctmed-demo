// create the module and name it scotchApp
var tutorApp = angular.module('tutorApp', ['ngRoute', 'angularFileUpload', 'simpleAngularFileUpload', 'ui.router',
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
    .service('sharedProperties', function ($modal) {
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
                    time: 5000,
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
            dialogMessage: function (text) {
                var modalInstance = $modal.open({
                    templateUrl: contextPath + '/pages/public/message',
                    controller: 'messageController',
                    resolve: {
                        message: function ($q, $http) {
                            var deferred = $q.defer();
                            deferred.resolve({
                                text: text
                            })
                            return deferred.promise;
                        }
                    }
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
tutorApp.config(function ($routeProvider, $stateProvider, $urlRouterProvider) {
    $routeProvider

    $urlRouterProvider.otherwise("/")

    $stateProvider
        .state('index', {
            url: "/",
            views: {
                "single": {
                    templateUrl: contextPath + '/pages/tutor/home',
                    controller: 'dashboardTutorController',
                    resolve: dashboardTutorController.resolve
                }
            }
        })
        .state('comments', {
            url: "/comments",
            views: {
                "single": {
                    templateUrl: contextPath + '/pages/tutor/homeComments',
                    controller: 'dashboardTutorController',
                    resolve: dashboardTutorController.resolve
                }
            }
        })
        .state('files', {
            url: "/files",
            views: {
                "single": {
                    templateUrl: contextPath + '/fileBox/index',
                    controller: 'fileBoxController',
                    resolve: fileBoxController.resolve
                }
            }
        })
        .state('courses', {
            url: "/courses",
            views: {
                "single": {
                    templateUrl: contextPath + '/pages/tutor/courses',
                    controller: 'coursesController',
                    resolve: coursesController.resolve
                }
            }
        })
        .state('course', {
            url: "/tutor/course/:id",
//            abstract: true,
            views: {
                "single": {
                    templateUrl: contextPath + '/pages/tutor/course',
                    controller: 'courseController',
                    resolve: courseController.resolve
                }
            }
        })
        .state('course.info', {
            url: "/info",
            views: {
                "nested_single": {
                    templateUrl: contextPath + '/pages/tutor/course_info'
                }
            }
        })
        .state('course.files', {
            url: "/files",
            views: {
                "nested_right": {
                    templateUrl: contextPath + '/pages/tutor/course_files',
                    controller: 'courseFilesController',
                    resolve: courseFilesController.resolve
                },
                "nested_left": {
                    templateUrl: contextPath + '/fileBox/widget',
                    controller: 'fileBoxController',
                    resolve: fileBoxController.resolve
                }
            }
        })
        .state('course.lessons', {
            url: "/lessons",
            views: {
                "nested_single": {
                    templateUrl: contextPath + '/pages/tutor/course_lessons'
                }
            }
        })
        .state('course.lessons.lesson', {
            url: "/lesson/:lessonId",
            views: {
                "nested_top": {
                    templateUrl: contextPath + '/pages/tutor/course_lesson',
                    controller: 'courseLessonController',
                    resolve: courseLessonController.resolve
                }
            }
        })
        .state('course.students', {
            url: "/students",
            views: {
                "nested_single": {
                    templateUrl: contextPath + '/pages/tutor/course_students',
                    controller: 'courseStudentsController',
                    resolve: courseStudentsController.resolve
                }
            }
        })
        .state('course.students.student', {
            url: "/student/:studentId",
            views: {
                "nested_top": {
                    templateUrl: contextPath + '/pages/tutor/course_student',
                    controller: 'courseStudentController',
                    resolve: courseStudentController.resolve
                }
            }
        })
        .state('studentBoughtCourse', {
            url: "/studentBoughtCourse/:courseId",
            views: {
                "single": {
                    templateUrl: contextPath + '/pages/student/boughtCourse',
                    controller: 'studentBoughtCourseController',
                    resolve: studentBoughtCourseController.resolve
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
        .state('boughtCourse', {
            url: "/boughtCourse/:courseId",
            views: {
                "single": {
                    templateUrl: contextPath + '/pages/student/boughtCourse',
                    controller: 'studentBoughtCourseController',
                    resolve: studentBoughtCourseController.resolve
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
        .state('info', {
            url: "/info",
            views: {
                "single": {
                    templateUrl: contextPath + '/pages/tutor/info',
                    controller: 'infoController',
                    resolve: infoController.resolve
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
        .state('payments', {
            url: "/payments",
            views: {
                "single": {
                    templateUrl: contextPath + '/pages/tutor/payments',
                    controller: 'paymentsTutorController',
                    resolve: paymentsTutorController.resolve
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
        .state('tutorStudents', {
            url: "/students",
            views: {
                "single": {
                    templateUrl: contextPath + '/pages/tutor/tutorStudentList',
                    controller: 'tutorStudentListController',
                    resolve: tutorStudentListController.resolve
                }
            }
        })
        .state('tutorStudent', {
            url: "/student/:id",
            views: {
                "single": {
                    templateUrl: contextPath + '/pages/tutor/tutorStudent',
                    controller: 'tutorStudentController',
                    resolve: tutorStudentController.resolve
                }
            }
        })
        .state('tutorStudent.course', {
            url: "/course/:courseId"
        })
        .state('tutorStudent.lesson', {
            url: "/course/:courseId/lesson/:lessonId",
            views: {
                "nested_top": {
                    templateUrl: contextPath + '/pages/tutor/studentCourseLesson'
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
tutorApp.controller('mainTutorController', function ($scope, $route, $routeParams, $http, $location, sharedProperties, audio, fileUploader, $modal) {
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
    $scope.sharedProperties = sharedProperties;
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

tutorApp.filter('byLevel', function () {
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

tutorApp.filter('unsafe', function ($sce) {
    return function (val) {
        return $sce.trustAsHtml(val);
    };
});