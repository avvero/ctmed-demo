function paymentsTutorController($scope, model, sharedProperties, $window, $http) {
    $scope.sharedProperties = sharedProperties
    $scope.payments = model.payments
    $scope.courseLevels = model.courseLevels
    $scope.courses = model.courses
    $scope.showSuccessPayment = 1;
    $scope.data = sharedProperties;

    $scope.dateTimeNow = function() {
        $scope.date = new Date();
    };
    $scope.dateTimeNow();

    $scope.toggleMinDate = function() {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.maxDate = new Date('2014-06-22');
    $scope.toggleMinDate();

    $scope.dateOptions = {
        'starting-day': 1
    };

    // Disable weekend selection
    $scope.disabled = function(calendarDate, mode) {
        return mode === 'day' && ( calendarDate.getDay() === 0 || calendarDate.getDay() === 6 );
    };

    $scope.showWeeks = true;
    $scope.toggleWeeks = function () {
        $scope.showWeeks = !$scope.showWeeks;
    };

    $scope.hourStep = 1;
    $scope.minuteStep = 15;

    $scope.timeOptions = {
        hourStep: [1, 2, 3],
        minuteStep: [1, 5, 10, 15, 25, 30]
    };

    $scope.showMeridian = true;
    $scope.timeToggleMode = function() {
        $scope.showMeridian = !$scope.showMeridian;
    };
}

function DatepickerDemoCtrl1($scope, sharedProperties) {
    $scope.data = sharedProperties
}

function DatepickerDemoCtrl2($scope, sharedProperties) {
    $scope.data = sharedProperties
}


paymentsTutorController.resolve = {
    model : function($q, $http) {
        var deferred = $q.defer();

        $http({method: 'GET', url: '/tutor/payments'})
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

tutorApp.filter('byCourseLevel', function(){
    return function(items, key){
        var arrayToReturn = [];
        if (key == null) {
            return items;
        }
        for (var i=0; i<items.length; i++){
            if (items[i].courseLevelId == key) {
                arrayToReturn.push(items[i]);
            }
        }
        return arrayToReturn;
    };
});

tutorApp.filter('byCourse', function(){
    return function(items, key){
        var arrayToReturn = [];
        if (key == null) {
            return items;
        }
        for (var i=0; i<items.length; i++){
            if (items[i].courseId == key) {
                arrayToReturn.push(items[i]);
            }
        }
        return arrayToReturn;
    };
});

tutorApp.filter('byDate', function(){
    return function(items, key){
        var arrayToReturn = [];
        if (typeof(key.paymentDateFrom) == 'undefined') {
            arrayToReturn = items;
        }
        for (var i=0; i<items.length; i++){
            if (items[i].created >= key.paymentDateFrom) {
                arrayToReturn.push(items[i]);
            }
        }
        //Фильтр по 2 дате
        var arrayToReturn2 = [];
        if (typeof(key.paymentDateTo) == 'undefined') {
            return arrayToReturn;
        }
        for (var i=0; i<arrayToReturn.length; i++){
            var nextDay = new Date()
            nextDay.setDate(key.paymentDateTo.getDate());
            nextDay.setHours(23,59,59,999);
            if (arrayToReturn[i].created <= nextDay.getTime()) {
                arrayToReturn2.push(arrayToReturn[i]);
            }
        }
        return arrayToReturn2;
    };
});