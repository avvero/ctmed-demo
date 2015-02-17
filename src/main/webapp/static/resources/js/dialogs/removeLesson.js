function removeLessonDialog(item, $scope, $modalInstance) {

    $scope.lesson = item

    $scope.removeLesson = function () {
        $modalInstance.close(item);
    }

}