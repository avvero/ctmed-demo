function documentsController($scope, model, $location, sharedProperties, $stateParams, $window) {
    $scope.$location = $location;
    $scope.sharedProperties = sharedProperties;
    $scope.documents = model;

}

documentsController.resolve = {
    model: function ($q, $http, $stateParams) {
        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: '/data/template/'+$stateParams.id + '/document',
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