function dictionaryController($scope, $modalInstance) {

}

dictionaryController.resolve = {
    items : function($q, $http) {
        var deferred = $q.defer();

        $http({method: 'GET', url: '/fileBox/files'})
            .success(function(data) {
                deferred.resolve(data)
            })
            .error(function(data){
                //actually you'd want deffered.reject(data) here
                //but to show what would happen on success..
                deferred.resolve("error value");
            });

        return deferred.promise;
    }
}