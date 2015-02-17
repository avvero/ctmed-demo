function courseLessonDictionaryEdit($scope, item, $modalInstance) {

    $scope.item = item

    $scope.ok = function () {
        $modalInstance.close(item);
    }
}