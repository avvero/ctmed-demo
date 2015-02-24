function documentController($scope, model, $location, sharedProperties, $http, $modal) {
    $scope.$location = $location;
    $scope.sharedProperties = sharedProperties;
    $scope.document = model;
    $scope.update = function(document) {
        $http({
            url: '/data/template/'+document.templateId+'/document/'+document.id,
            method: "POST",
            data: document,
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        }).success(function (data) {
            $scope.document = data
            // Обновим файлы
        }).error(function (data, status) {
            $scope.sharedProperties.error(data.message, "Ошибка сохранения документа '" + document.id + "'", data)
        });
        $scope.sharedProperties.success("Сохранение документа...")
    }

}

documentController.resolve = {
    model: function ($q, $http, $stateParams) {
        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: '/data/template/'+$stateParams.id + '/document/'+$stateParams.documentId,
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        })
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