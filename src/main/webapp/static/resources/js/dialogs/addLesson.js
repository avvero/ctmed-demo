function addLessonDialog($scope, $modalInstance) {

    $scope.newLessonName ="Урок ";

    $scope.createLesson = function (newLessonName) {
        $modalInstance.close(newLessonName);
    }

}