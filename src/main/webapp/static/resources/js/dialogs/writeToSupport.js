function writeToSupportDialog($scope, $modalInstance, $http, sharedProperties, $location) {
    $scope.sharedProperties = sharedProperties;
    $scope.message = null;

    $scope.ok = function (message) {
        $scope.sharedProperties.info("Происходит отправка сообщения в техподдержку")
        $http({
            url: $scope.sharedProperties.getContextPath()+'/writeToSupport',
            headers: {'Content-Type': 'application/json;charset=UTF-8'},
            method: "POST",
            data: {
                "text": message,
                "context": $location.absUrl()
            }
        }).success(function (data, status, headers, config) {
            $scope.sharedProperties.success("Сообщение в техподдержку отправлено")
        }).error(function (data, status, headers, config) {
            $scope.sharedProperties.error(data.message)
        });
        $modalInstance.close();
    }

}