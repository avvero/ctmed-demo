function dictionaryController($scope, items, sharedProperties, $modalInstance) {
    $scope.items = items
    $scope.ok = function (item) {
        $modalInstance.close(item);
    }
}