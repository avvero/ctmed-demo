function courseFilesController($scope, model, $location, sharedProperties, $modal, $http) {
    $scope.$location = $location;
    $scope.sharedProperties = sharedProperties;

    $scope.course = model.course

    sharedProperties.addFileAddingListener({
        handle: function(file) {
            $scope.addFile(file)
        }
    })

    /**
     * Файлы курса
     * @param item
     */
    $scope.selectedCourseFile = null;

    $scope.addFile = function(item) {
        $http({
            url: $scope.sharedProperties.getContextPath()+"/tutor/course/" + $scope.course.id + "/addFile",
            method: "POST",
            data: {
                fileId: item.id,
                parent: $scope.parent.id
            },
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        }).success(function (result) {
            for (var i = 0; i < result.files.length; i++) {
                $scope.course.files.push(result.files[i])
                $scope.files.push(result.files[i])
            }
            for (var i = 0; i < result.folders.length; i++) {
                $scope.files.push($scope.getFolderWrapper(result.folders[i]))
            }
        }).error(function (data, status) {
            $scope.sharedProperties.error(data.message)
        });
    }

    $scope.deleteCourseItem = function(item) {
        if (item.entryFile.entryFileType.type == "folder") {
            $scope.deleteCourseFolder(item)
        } else {
            $scope.deleteCourseFile(item)
        }
    }

    $scope.deleteCourseFile = function (item) {
        $http({
            url: $scope.sharedProperties.getContextPath()+"/tutor/course/" + $scope.course.id + "/deleteFile",
            method: "DELETE",
            data: {
                id: item.id
            },
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        }).success(function (data) {
                $scope.deleteFromList($scope.course.files, item.id)
                $scope.deleteFromList($scope.files, item.id)
                $scope.sharedProperties.success(data.result)
            }).error(function (data, status) {
                $scope.sharedProperties.error(data.message)
            });
    }

    $scope.deleteFromList = function(list, id) {
        var idx = -1;
        for (var i = 0; i < list.length; i++) {
            if (list[i].id == id) {
                idx = i;
                break;
            }
        }
        list.splice(idx, 1);
    }

    /*******************
     * Файловая структура для курса
     *******************/
    $scope.contextPath = contextPath
    $scope.selected = null
    $scope.ROOT = {id: null, name: "Root"}
    $scope.parent = $scope.ROOT
    //Обновление хлебных крошек
    $scope.getItemById = function (id) {
        for (var i = 0; i < $scope.files.length; i++) {
            if ($scope.files[i].id == id) {
                return $scope.files[i];
            }
        }
    }
    $scope.updateBreadcrumbs = function (item) {
        $scope.breadcrumbs = []
        //ROOT включать не нужно
        if (item.id != null) {
            $scope.breadcrumbs.push(item)
        }
        while (item.parent != null) {
            item = $scope.getItemById(item.parent)
            $scope.breadcrumbs.push(item)
        }
    }
    $scope.selectRoot = function (item) {
        $scope.selected = null
        $scope.parent = item
        $scope.updateBreadcrumbs(item)
    }
    $scope.getParentFolder = function() {
        var item = $scope.ROOT
        for (var i = 0; i < $scope.breadcrumbs.length; i++) {
            if ($scope.breadcrumbs[i].id == $scope.parent.parent) {
                item = $scope.breadcrumbs[i]
            }
        }
        return item;
    }
    $scope.byParent = function(item){
        return $scope.parent.id == item.parent
    };
    $scope.selectCourseFile = function (item) {
        if (item.entryFile.entryFileType.type == "folder") {
            $scope.selected = null
            $scope.parent = item
            $scope.updateBreadcrumbs(item)
        }
    }
    $scope.getFolderWrapper = function(item) {
        return {
            id: item.id,
            courseId: item.courseId,
            parent: item.parent,
            name: item.name,
            entryFile: {
                id: item.id,
                name: item.name,
                parent: item.parent,
                entryFileType: {
                    type: 'folder'
                }
            }
        }
    }
    $scope.getFiles = function() {
        var list = []
        for (var i = 0; i < $scope.course.files.length; i++) {
            list.push($scope.course.files[i])
        }
        for (var i = 0; i < $scope.course.folders.length; i++) {
            var item = $scope.getFolderWrapper($scope.course.folders[i])
            list.push(item)
        }
        return list;
    }
    $scope.files = $scope.getFiles()
    /*******************
     * Создание папки
     *******************/
    $scope.createFolder = function () {
        var modalInstance = $modal.open({
            templateUrl : contextPath +'/pages/dialogs/createFolder',
            controller  : 'createFolderDialogController'
        });

        modalInstance.result.then(function (folderName) {
            $http({
                url: $scope.sharedProperties.getContextPath()+"/tutor/course/" + $scope.course.id + "/addFolder",
                method: "POST",
                data: {
                    name: folderName,
                    parent: $scope.parent.id
                },
                headers: {'Content-Type': 'application/json;charset=UTF-8'}
            }).success(function (data) {
                $scope.files.push($scope.getFolderWrapper(data))
            }).error(function (data, status) {
                $scope.sharedProperties.error(data.message)
            });
        }, function () {

        });
    }
    $scope.deleteCourseFolder = function(item) {
        $http({
            url: $scope.sharedProperties.getContextPath()+"/tutor/course/" + $scope.course.id + "/deleteCourseFolder",
            method: "DELETE",
            data: {
                id: item.id
            },
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        }).success(function (data) {
            $scope.deleteFromList($scope.course.folders, item.id)
            $scope.deleteFromList($scope.files, item.id)
            $scope.sharedProperties.success(data.result)
        }).error(function (data, status) {
            $scope.sharedProperties.error(data.message)
        });
    }
}

courseFilesController.resolve = {
    model : function($q, $http, $stateParams) {
        var deferred = $q.defer();

        $http({method: 'GET', url: '/tutor/course/'+$stateParams.id})
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

tutorApp.filter('foldersFirstForCourse', function() {
    return function(items) {
        var filtered = [];
        var files = [];
        angular.forEach(items, function(item) {
            if (item.entryFile.entryFileType && item.entryFile.entryFileType.type == 'folder') {
                filtered.push(item);
            } else {
                files.push(item);
            }
        });
        angular.forEach(files, function(item) {
            filtered.push(item);
        });
        return filtered;
    };

});