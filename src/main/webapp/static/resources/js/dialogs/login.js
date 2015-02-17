function loginDialog($scope, $modalInstance, $http) {

    $scope.errorMessage = ""

    $scope.ok = function (login, password) {
        $http({
            url: '/signin',
            headers: {'Content-Type': 'application/json;charset=UTF-8'},
            method: "POST",
            data: {
                "login": login,
                "password": password
            }
        }).success(function (data, status, headers, config) {
            $modalInstance.close();
        }).error(function (data, status, headers, config) {
            $scope.errorMessage = data.localizedMessage
        });
    }

    $scope.hasPendingRequests = function () {
        // Отслеживаем только GET запросы
        return $http.pendingRequests.length > 0;
    };

}