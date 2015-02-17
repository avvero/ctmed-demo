function coursesController($scope, model, $window, sharedProperties, $http, $modal) {
    $scope.sharedProperties = sharedProperties

    $scope.courseLevels = model.courseLevels
    $scope.courseTargets = model.courseTargets
    $scope.courseTypes = model.courseTypes
    $scope.user = model.user
    $scope.courses = model.courses
    /**
     * Фильтры
     * @type {null}
     */
    $scope.even = function(item){
        for (var i = 0; i < $scope.courses.length; i++) {
            if ($scope.courses[i].id == item.id) {
                return !(i % 2)
            }
        }
    };
    $scope.odd = function(item){
        for (var i = 0; i < $scope.courses.length; i++) {
            if ($scope.courses[i].id == item.id) {
                return !!(i % 2)
            }
        }
    };

    $scope.selected = null
    /**
     * Переход
     * @param item
     */
    $scope.editCourse = function(item) {
        $window.location.href = sharedProperties.getContextPath() + "#/tutor/course/"+item.id + "/info"
    }
    /**
     * Удаление
     * @param item
     */
    $scope.showRemoveCourseDialog = function(item) {
        $scope.selected = item
        $('#removeCourse').modal('show')
    }
    $scope.removeCourse = function() {
        $http({
            url: $scope.sharedProperties.getContextPath()+"/tutor/course",
            headers: {'Content-Type': 'application/json;charset=UTF-8'},
            method: "DELETE",
            data: {
                "id": $scope.selected.id
            }
        }).success(function (data, status, headers, config) {
                var idx = -1;
                for (var i = 0; i < $scope.courses.length; i++) {
                    if ($scope.courses[i].id == $scope.selected.id) {
                        idx = i;
                        break;
                    }
                }
                $scope.courses.splice(idx, 1);
                $scope.selected = null
                $scope.sharedProperties.success(data.result)
            }).error(function (data, status, headers, config) {
                $scope.sharedProperties.error(data.message)
            });
        $('#removeCourse').modal('hide')
    }

    /**
     * Создание нового курса
     */
    $scope.newCourseName ="";
    $scope.showCreateCourseDialog = function() {
        $scope.newCourseName ="";
        $('#createCourse').modal('show')
    }

    $scope.hideCreateCourseDialog = function() {
        $('#createCourse').modal('hide')
    }

    $scope.createCourse = function() {
        $http({
            url: $scope.sharedProperties.getContextPath()+"/tutor/course/new",
            headers: {'Content-Type': 'application/json;charset=UTF-8'},
            method: "POST",
            data: {
                "name": $scope.newCourseName
            }
        }).success(function (data, status, headers, config) {
                $scope.folderName = ""
                $('#createFolder').modal('hide')
                $scope.courses.push(data)
                $scope.sharedProperties.success("Курс создан")
            }).error(function (data, status, headers, config) {
                $scope.sharedProperties.error(data.message)
            });
        $('#createCourse').modal('hide')
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
            url: $scope.sharedProperties.getContextPath() + '/tutor/course/' + item.id + '/import',
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

coursesController.resolve = {
    model : function($q, $http) {
        var deferred = $q.defer();

        $http({method: 'GET', url:  '/tutor/courses'})
            .success(function(data) {
                deferred.resolve(data)
            })
            .error(function(data){
                //actually you'd want deffered.reject(data) here
                //but to show what would happen on success..
                deferred.reject("error value");
                $.gritter.add({
                    title: 'Ошибка',
                    text: data.localizedMessage,
                    class_name: 'gritter-error'
                });
            });

        return deferred.promise;
    }
}