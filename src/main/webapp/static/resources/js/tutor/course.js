function courseController($scope, model, $location, sharedProperties, $upload, $http, $window, commonUtils, $modal) {
    $scope.$location = $location;
    $scope.sharedProperties = sharedProperties;

    $scope.courseLevels = model.courseLevels
    $scope.courseTargets = model.courseTargets
    $scope.courseTypes = model.courseTypes
    $scope.languages = model.languages
    $scope.publishers = model.publishers
    $scope.course = model.course
    $scope.test = 1

    $scope.selectedLesson = null
    /******************************************************************************
     * КУРСЫ
     ******************************************************************************/

    $scope.saveCourse = function () {
        $http({
            url: $scope.sharedProperties.getContextPath() + "/tutor/course",
            method: "POST",
            data: JSON.stringify($scope.course),
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        }).success(function (data) {
            $scope.sharedProperties.success("Данные удачно сохранены")
        }).error(function (data, status) {
            $scope.sharedProperties.error(data.message)
        });
    }

    $scope.unloadCourse = function () {
        alert("Выгрузка курса будет выполняться в фоновом режиме. По окончании вы получите уведомление.")
        $http({
            url: "tutor/course/" + $scope.course.id + "/unload",
            method: "POST"
        }).success(function (data) {
            var text = "Курс <b>" + $scope.course.name + "</b> выгружен в файл <b>" + data.name + "</b>.<br/>" +
                "Файл всегда будет доступен для выгрузки в вашей библиотеке из папки <b>Unloads</b>.<br/><br/>" +
                "<div class='align-center'><a class='btn btn-lg btn-primary' href='/fileBox/download/" + data.id + "'>" +
                "<i class='icon-cloud-download'></i>Скачать файл сейчас</a></div>"
            $scope.sharedProperties.dialogMessage(text)
        }).error(function (data, status) {
            $scope.sharedProperties.error(data.message)
        });
    }

    $scope.onFileSelect = function ($files) {
        //$files: an array of files selected, each file has name, size, and type.
        for (var i = 0; i < $files.length; i++) {
            var file = $files[i];
            $scope.upload = $upload.upload({
                url: $scope.sharedProperties.getContextPath() + '/image/uploadForCourse',
                method: 'POST',
                // headers: {'headerKey': 'headerValue'},
                // withCredential: true,
                data: { courseId: $scope.course.id },
                file: file
            }).progress(function (evt) {

            }).success(function (response) {
                // file is uploaded successfully
                $scope.course.pictureId = response
            }).error(function (response) {
                $scope.sharedProperties.error(response.message)
            })
        }
    };

    /******************************************************************************
     * УРОКИ
     ******************************************************************************/

    $scope.selectLessonBySref = function (item) {
        $scope.selectedLesson = item
    }

    /**
     * Обновление детей
     * @param entry
     */
    $scope.sortChildren = function (entry) {
        if (entry.nodes) {
            entry.nodes.sort(function (a, b) {
                return a.orderNumber - b.orderNumber;
            });
            for (var i = 0; i < entry.nodes.length; i++) {
                $scope.sortChildren(entry.nodes[i])
            }
        }
    }

    // Сначала нужно вручную отсортировать
    $scope.course.lessons.sort(function (a, b) {
        return a.orderNumber - b.orderNumber;
    });
    for (var i = 0; i < $scope.course.lessons.length; i++) {
        $scope.sortChildren($scope.course.lessons[i])
    }

    $scope.treeOptions = {
        dropped: function (sourceNodeScope, destNodesScope, destIndex, scope) {
            // Обновляем порядок
            for (var i = 0; i < $scope.course.lessons.length; i++) {
                $scope.course.lessons[i].orderNumber = i
                // Обновляем родителей
                $scope.updateParent($scope.course.lessons[i])
            }
            $scope.saveLessonsOrder()
            return true;
        }
    };

    $scope.isCollapsed = false
    $scope.collapseTree = function (scope) {
        if ($scope.isCollapsed) {
            $scope.isCollapsed = false
            scope.expandAll();
        } else {
            $scope.isCollapsed = true
            scope.collapseAll();
        }
    };

    /**
     * Обновление родителей
     * @param entry
     */
    $scope.updateParent = function (entry) {
        if (entry.nodes) {
            for (var i = 0; i < entry.nodes.length; i++) {
                entry.nodes[i].parentId = entry.id
                entry.nodes[i].orderNumber = i
                $scope.updateParent(entry.nodes[i])
            }
        }
    }

    /**
     * Сортировка D-D
     * @type {{stop: stop}}
     */
    $scope.sortableOptions = {
        stop: function (e, ui) {
            for (var i = 0; i < $scope.course.lessons.length; i++) {
                $scope.course.lessons[i].orderNumber = i
            }
            $scope.saveLessonsOrder()
        },
        axis: 'y',
        delay: 150,
        distance: 5
    };

    $scope.sortLessonsByName = function () {
        $scope.course.lessons.sort(function (a, b) {
            return commonUtils.cmpStringsWithNumbers(a.name, b.name);
        });
        for (var i = 0; i < $scope.course.lessons.length; i++) {
            $scope.course.lessons[i].orderNumber = i
        }
        $scope.saveLessonsOrder()
    }

    $scope.saveLessonsOrder = function () {
        $http({
            url: $scope.sharedProperties.getContextPath() + "/tutor/updateCourseLessonOrder",
            method: "POST",
            data: $scope.course.lessons,
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        }).success(function (data) {
//            $scope.sharedProperties.success("Порядок уроков изменен")
        }).error(function (data, status) {
            $scope.sharedProperties.error(data.message)
        });
        $scope.sharedProperties.success("Изменение порядка уроков...")
    }

    $scope.firstLesson = function () {
        if ($scope.course.lessons && $scope.course.lessons.length > 0) {
            return $scope.course.lessons[0]
        } else {
            null;
        }
    }

    $scope.selectLesson = function (item) {
        $window.location.href = sharedProperties.getContextPath() + "#/tutor/course/" + $scope.course.id
            + "/lessons/lesson/" + item.id
    }

    $scope.selectLessonWelcome = function () {
        $window.location.href = sharedProperties.getContextPath() + "#/tutor/course/" + $scope.course.id
            + "/lessons"
    }

    $scope.selectFirstLesson = function () {
        var lesson = $scope.firstLesson();
        if (lesson) {
            $scope.selectLesson(lesson)
        } else {
            $scope.selectLessonWelcome()
        }
    }

    /**
     * Новый урок
     */
    $scope.createLessonRoot = function () {
        $scope.showCreateLessonDialog($scope.course.lessons, null)
    }

    $scope.newSubItem = function (scope) {
        var nodeData = scope.$modelValue;
        $scope.showCreateLessonDialog(nodeData.nodes, nodeData.id)
    };

    $scope.showCreateLessonDialog = function (nodes, parentId) {
        var modalInstance = $modal.open({
            templateUrl: contextPath + '/pages/dialogs/addLesson',
            controller: 'addLessonDialog'
        });

        modalInstance.result.then(function (name) {
            $scope.createLesson(nodes, name, parentId)
        }, function () {

        });
    }
    $scope.createLesson = function (nodes, name, parentId) {
        $http({
            url: $scope.sharedProperties.getContextPath() + '/tutor/course/' + $scope.course.id + '/lessons/new',
            headers: {'Content-Type': 'application/json;charset=UTF-8'},
            method: "POST",
            data: {
                "name": name,
                "parentId": parentId,
                orderNumber: $scope.course.lessons.length
            }
        }).success(function (data, status, headers, config) {
            $('#createLesson').modal('hide')
            // TODO
            data.nodes = []
            nodes.push(data)
        }).error(function (data, status, headers, config) {
            $scope.sharedProperties.error(data.message)
        });
        $scope.sharedProperties.success("Создание урока...")
        $('#createCourse').modal('hide')
    }
    $scope.removeLesson = function (item) {
        if ($scope.selectedLesson && $scope.selectedLesson.id == item.id) {
            $scope.selectLessonWelcome()
        }
        $http({
            url: $scope.sharedProperties.getContextPath() + "/tutor/lesson/" + item.id + "/remove",
            headers: {'Content-Type': 'application/json;charset=UTF-8'},
            method: "DELETE",
            data: {
                "id": item.id
            }
        }).success(function (data) {
//            $scope.sharedProperties.success(data.result)
            // Переход к первому уроку или пустой странице
            $scope.selectFirstLesson()
        }).error(function (data) {
            $scope.sharedProperties.error(data.message)
        });
        $scope.sharedProperties.success("Удаление урока...")
    }

    $scope.showModalRemoveLessonDialog = function (scope, item) {
        var modalInstance = $modal.open({
            templateUrl: contextPath + '/pages/dialogs/removeLesson',
            controller: 'removeLessonDialog',
            resolve: {
                item: function ($q, $http) {
                    var deferred = $q.defer();
                    deferred.resolve(item)
                    return deferred.promise;
                }
            }
        });

        modalInstance.result.then(function (item) {
            $scope.removeLesson(item)
            scope.remove();
        }, function () {

        });
    }

    $scope.hidePreviewLessonDialog = function () {
        $('#previewLesson').modal('hide')
    }
    /**
     * Preview
     */
    $scope.previewAll = function () {
//        if (confirm("В режиме предпроссмотра вам будет предоставлена полная форма курса в режиме 'студент', но с ограниченным функционалом. Продолжить ?")) {
        $window.open('/profile#/boughtCourse/' + $scope.course.id);
//        }
    }
}

courseController.resolve = {
    model: function ($q, $http, $stateParams) {
        var deferred = $q.defer();

        $http({method: 'GET', url: '/tutor/course/' + $stateParams.id})
            .success(function (data) {
                deferred.resolve(data)
            })
            .error(function (data) {
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