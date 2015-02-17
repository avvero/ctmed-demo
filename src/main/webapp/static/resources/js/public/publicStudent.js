function publicStudentController($scope, model, sharedProperties) {
    $scope.sharedProperties = sharedProperties
    $scope.student = model.student
}

publicStudentController.resolve = {
    model : function($q, $http, $stateParams) {
        var deferred = $q.defer();

        $http({method: 'GET', url: '/public/student/'+$stateParams.id})
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