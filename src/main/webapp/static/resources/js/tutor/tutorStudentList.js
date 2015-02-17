function tutorStudentListController($scope, model, sharedProperties, $window, $http) {
    $scope.sharedProperties = sharedProperties
    $scope.students = model.students
    $scope.payments = model.payments
    //TODO пропишем платежи
    for (var i = 0; i < $scope.students.length; i++) {
        $scope.students[i].payments = $scope.payments[$scope.students[i].studentId]
    }

    $scope.courseLevels = model.courseLevels
    $scope.courses = model.courses
    /**
     * Фильтры
     * @type {null}
     */
    $scope.even = function(item){
        for (var i = 0; i < $scope.students.length; i++) {
            if ($scope.students[i].id == item.id) {
                return !(i % 2)
            }
        }
    };
    $scope.odd = function(item){
        for (var i = 0; i < $scope.students.length; i++) {
            if ($scope.students[i].id == item.id) {
                return !!(i % 2)
            }
        }
    };
    $scope.showStudent = function(item) {
        $window.location.href = sharedProperties.getContextPath() + "#/student/"+item.studentId
    }
}

tutorStudentListController.resolve = {
    model : function($q, $http) {
        var deferred = $q.defer();

        $http({method: 'GET', url: '/tutor/students'})
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

tutorApp.filter('byCourseLevel2', function(){
    return function(items, key){
        var arrayToReturn = [];
        if (key == null) {
            return items;
        }
        for (var i=0; i< items.length; i++){
            for (var j=0; j< items[i].payments.length; j++){
                if (items[i].payments[j].courseLevelId == key) {
                    arrayToReturn.push(items[i]);
                    break;
                }
            }
        }
        return arrayToReturn;
    };
});

tutorApp.filter('byCourse2', function(){
    return function(items, key){
        var arrayToReturn = [];
        if (key == null) {
            return items;
        }
        for (var i=0; i< items.length; i++){
            for (var j=0; j< items[i].payments.length; j++){
                if (items[i].payments[j].courseId == key) {
                    arrayToReturn.push(items[i]);
                    break;
                }
            }
        }
        return arrayToReturn;
    };
});