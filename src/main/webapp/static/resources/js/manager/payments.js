function paymentsManagerController($scope, model, sharedProperties, $window, $http) {
    $scope.sharedProperties = sharedProperties
    $scope.payments = model.payments
    $scope.showSuccessPayment = 1;
}

paymentsManagerController.resolve = {
    model : function($q, $http) {
        var deferred = $q.defer();

        $http({method: 'GET', url: '/manager/payments'})
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

managerApp.filter('bySuccess', function(){
    return function(items, key){
        var arrayToReturn = [];
        if (typeof(key) == 'undefined' || key == 0) {
            return items;
        }
        for (var i=0; i<items.length; i++){
            if (items[i].success == key) {
                arrayToReturn.push(items[i]);
            }
        }
        return arrayToReturn;
    };
});