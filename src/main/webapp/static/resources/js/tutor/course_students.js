function courseStudentsController($scope, model, $location, sharedProperties, $routeParams, $http) {
    $scope.$location = $location;
    $scope.sharedProperties = sharedProperties;

    $scope.payments = model.payments
}

courseStudentsController.resolve = {
    model : function($q, $http, $stateParams) {
        var deferred = $q.defer();
        $http({method: 'GET', url: '/tutor/course/'+$stateParams.id+'/students'})
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