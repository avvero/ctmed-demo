function courseLessonFilesController($scope, $location, sharedProperties, $routeParams, $http) {
    $scope.$location = $location;
    $scope.sharedProperties = sharedProperties;
    $scope.lesson = sharedProperties.selectedLesson


    sharedProperties.addFileAddingListener({
        handle: function(file) {
            $scope.addFile(file)
        }
    })

    /**
     * Файлы курса
     * @param item
     */
    $scope.selectedLessonFile = null;
    $scope.selectLessonFile = function (item) {
        $scope.selectedLessonFile = item
    }

    $scope.addFile = function(item) {
        $http({
            url: $scope.sharedProperties.getContextPath()+"/tutor/lesson/" + $scope.lesson.id + "/addFile",
            method: "POST",
            data: {
                fileId: item.id
            },
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        }).success(function (data) {
                $scope.lesson.files.push(data)
            }).error(function (data, status) {
                $scope.sharedProperties.error(data.message)
            });
    }

    $scope.deleteLessonFile = function (item) {
        $http({
            url: $scope.sharedProperties.getContextPath()+"/tutor/lesson/" + $scope.lesson.id + "/deleteFile",
            method: "DELETE",
            data: {
                id: item.id
            },
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        }).success(function (data) {
                var idx = -1;
                for (var i = 0; i < $scope.lesson.files.length; i++) {
                    if ($scope.lesson.files[i].id == item.id) {
                        idx = i;
                        break;
                    }
                }
                $scope.lesson.files.splice(idx, 1);
                $scope.sharedProperties.success(data.result)
            }).error(function (data, status) {
                $scope.sharedProperties.error(data.message)
            });
    }
}