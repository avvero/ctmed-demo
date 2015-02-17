function boughtCoursesController($scope, model, sharedProperties, $window, $http, $modal) {
    $scope.sharedProperties = sharedProperties
    $scope.courses = model

    $scope.studyCourse = function (item) {
        $window.location.href = sharedProperties.getContextPath() + "#/boughtCourse/" + item.courseId
    }
    $scope.getVisibleCourses = function () {
        var result = []
        for (var i = 0; i < $scope.courses.length; i++) {
            if ($scope.courses[i].hidden != 1) {
                result.push($scope.courses[i])
            }
        }
        return result
    }
    $scope.isHiddenCoursesExists = function () {
        var result = []
        for (var i = 0; i < $scope.courses.length; i++) {
            if ($scope.courses[i].hidden != 1) {
                result.push($scope.courses[i])
            }
        }
        return $scope.getVisibleCourses().length < $scope.courses.length
    }
    /**
     * Фильтры
     * @type {null}
     */
    $scope.even = function (item) {
        var list = $scope.getVisibleCourses()
        for (var i = 0; i < list.length; i++) {
            if (list[i].id == item.id) {
                return !(i % 2)
            }
        }
    };
    $scope.odd = function (item) {
        var list = $scope.getVisibleCourses()
        for (var i = 0; i < list.length; i++) {
            if (list[i].id == item.id) {
                return !!(i % 2)
            }
        }
    };
    $scope.visible = function (item) {
        return item.hidden != 1
    };
    $scope.hidden = function (item) {
        return !$scope.visible(item)
    };
    $scope.showHide = function (item, isShow) {
        $http({
            url: "/student/boughtCourse/settings",
            method: "POST",
            data: {
                courseId: item.courseId,
                hidden: isShow ? 0 : 1
            },
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        }).success(function (data) {
            item.hidden = isShow ? 0 : 1
        }).error(function (data, status) {
            $scope.sharedProperties.error(data.message)
        });
    }

    /**
     * Импорт курсов
     */
    $scope.showImportCourseDialog = function () {
        var description = "Загрузка файла курса";
        var modalInstance = $modal.open({
            templateUrl: contextPath + '/fileBox/chose-dialog',
            controller: 'fileBoxChoseDialogController',
            resolve: {
                options: function ($q, $http) {
                    var deferred = $q.defer();
                    deferred.resolve(
                        {
                            url: $scope.sharedProperties.getContextPath() + '/fileBox/blindUpload/',
                            description: description,
                            onSuccess: function (item, response) {
                                $scope.sharedProperties.success("Файл '" + response.name + "' удачно загружен. Будет произведен импорт курса из файла.")
                                $scope.importCourse(response);
                            },
                            onError: function (item, response) {
                                $scope.sharedProperties.error(response.message)
                            }
                        }
                    )
                    return deferred.promise;
                },
                params: function ($q, $http) {
                    var deferred = $q.defer();
                    deferred.resolve({
                        actionName: "Загрузить и импортировать"
                    })
                    return deferred.promise;
                }
            }
        });
    }

    $scope.importCourse = function (item) {
        // Добавялем файл к блоку
        $http({
            url: $scope.sharedProperties.getContextPath() + '/student/course/' + item.id + '/import',
            method: "POST",
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        }).success(function (data) {
            $scope.courses.push(data)
            $scope.sharedProperties.success("Курс '" + data.name + "' удачно импортирован")
        }).error(function (data, status) {
            $scope.sharedProperties.error(data.message)
        });
    }
}

boughtCoursesController.resolve = {
    model: function ($q, $http) {
        var deferred = $q.defer();

        $http({method: 'GET', url: '/student/boughtCourses'})
            .success(function (data) {
                deferred.resolve(data)
            })
            .error(function (data) {
                //actually you'd want deffered.reject(data) here
                //but to show what would happen on success..
                deferred.resolve("error value");
            });

        return deferred.promise;
    }
}