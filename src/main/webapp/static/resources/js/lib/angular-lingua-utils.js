angular.module('lingua.utils', [])
    .factory('courseUtils', ['$location', '$sce', function ($location, $sce) {
        /**
         * Автовыбор после обновления
         * @type {*}
         */
        var getRouteParam = function (name) {
            var parts = $location.url().split("/")
            for (var i = 0; i < parts.length; i++) {
                if (parts[i] == name && parts[i + 1]) {
                    return parts[i + 1];
                }
            }
        }
        var selectLessonById = function (course, lessonId, selectLessonFunc) {
            var lesson = getLesson(course.lessons, lessonId)
            if (lesson) {
                selectLessonFunc(lesson)
            }
        }
        var getLesson = function (nodes, lessonId) {
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].id == lessonId) {
                    return nodes[i]
                }
                if (nodes[i].nodes && nodes[i].nodes.length) {
                    var result = getLesson(nodes[i].nodes, lessonId)
                    if (result) {
                        return result
                    }
                }
            }
        }
        var getLessonCount = function (course) {
            return getNodeCount(course.lessons);
        }
        var getNodeCount = function (nodes) {
            var length = nodes.length
            for (var i = 0; i < nodes.length; i++) {
                var childLength = getNodeCount(nodes[i].nodes)
                length += childLength
            }
            return length;
        }
        var time = function () {
            return new Date().getMilliseconds()
        }
        /**
         * Выгружает из курса уроки в виде списка для Pagination
         * @param course
         * @param pages
         * @returns {number}
         */
        var fillForPages = function (course, pages, selectLessonFunc) {
            nodesToPages(course, course.lessons, pages, selectLessonFunc)
        }
        var nodesToPages = function (course, nodes, pages, selectLessonFunc) {
            for (var i = 0; i < nodes.length; i++) {
                pages.push({
                        type: 'lesson',
                        num: pages.length + 1,
                        setIt: function () {
                            selectLessonById(course, this.id, selectLessonFunc)
                        },
                        element: nodes[i],
                        id: nodes[i].id
                    }
                )
                nodesToPages(course, nodes[i].nodes, pages, selectLessonFunc)
            }
        }
        var trustedUrl = function (id) {
            return $sce.trustAsResourceUrl("/stream/" + id + "?t=" + time());
        }
        return {
            getRouteParam: getRouteParam,
            selectLessonById: selectLessonById,
            getLesson: getLesson,
            trustedUrl: trustedUrl,
            getLessonCount: getLessonCount,
            fillForPages: fillForPages
        };
    }])
    .directive('lazyLoadEx', ['$http', '$timeout', function ($http, $timeout) {
        var getContent = function (url) {
            return $http({method: 'GET', url: url});
        }
        var getTime = function () {
            return new Date().getTime();
        }
        return {
            transclude: true,
            controller: ['$scope', '$attrs', function ($scope, $attrs) {
                $scope.lazyContent = null;
                $scope.blockId = "text" + getTime();
                $scope.$watch($attrs.url, function (url) {
                    getContent(url).then(function (result, attrs) {
                        $scope.lazyContent = result.data
                        $timeout(function () {
                            Lingua.setOnClickEvents($scope.blockId)
                        }, 200);
                    });
                });
            }],
            template: '<div ng-bind-html="lazyContent | unsafe" ng-transclude id="{{blockId}}"></div>'
        };
    }])
    .directive('lazyLoad', ['$http', function ($http) {
        var getContent = function (url) {
            return $http({method: 'GET', url: url});
        }
        return {
            //        restrict: 'AE',
            //        replace: true,
            transclude: true,
            //        scope: {},
            controller: ['$scope', '$attrs', function ($scope, $attrs) {
                $scope.lazyContent = null;
                $scope.$watch($attrs.url, function (url) {
                    getContent(url).then(function (result, attrs) {
                        $scope.lazyContent = result.data
                    });
                });
            }],
            template: '<div ng-bind-html="lazyContent | unsafe" ng-transclude></div>'
        };
    }])
    .directive('colorbox', function ($compile, $rootScope) {
        return {
            link: function (scope, element, attrs) {
                element.click('bind', function () {
                    $.colorbox({
                        href: attrs.colorbox,
                        onComplete: function () {
                            $rootScope.$apply(function () {
                                var content = $('#cboxLoadedContent');
                                $compile(content)($rootScope);
                            })
                        }
                    });
                });
            }
        };
    })
    .filter('size', function () {
        var fileSizeSI = function (a, b, c, d, e) {
            return (b = Math, c = b.log, d = 1e3, e = c(a) / c(d) | 0, a / b.pow(d, e)).toFixed(2)
                + ' ' + (e ? 'kMGTPEZY'[--e] + 'B' : 'Bytes')
        }
        return function (size) {
            return fileSizeSI(size)
        };
    });
