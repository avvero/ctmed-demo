function marketController($scope, model, sharedProperties, $window, $http) {
    $scope.sharedProperties = sharedProperties
    $scope.courseLevels = model.courseLevels
    $scope.courseTargets = model.courseTargets
    $scope.courseTypes = model.courseTypes
    $scope.courses = model.courses
    $scope.payments = model.payments
    $scope.role = model.role
    //Фильтры, сортировки
    $scope.predicate = 'created';
    $scope.filterCourseLevel = undefined;
    $scope.setFilterCourseLevel = function (item) {
        $scope.filterCourseLevel = item.id
    }
    $scope.course
    /**
     * Переход
     * @param item
     */
    $scope.showCourse = function (item) {
        $window.location.href = sharedProperties.getContextPath() + "#/course/" + item.id
    }
    $scope.studyCourse = function (item) {
        $window.location.href = sharedProperties.getContextPath() + "#/boughtCourse/" + item.id
    }
    $scope.coursePayment = function (item) {
        $http({
            url: $scope.sharedProperties.getContextPath() + "/course/" + item.id + "/paymentLink",
            method: "GET",
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        }).success(function (data) {
            $scope.coursePaymentLink = data
            $scope.showBuyCourseDialog(item)
        }).error(function (data, status) {
            $scope.sharedProperties.error(data.message)
        });
    }
    $scope.showBuyCourseDialog = function (item) {
        $scope.course = item
        $('#buyCourse').modal('show')
    }
    $scope.hideBuyCourseDialog = function () {
        $('#buyCourse').modal('hide')
    }
    $scope.redirectByLink = function () {
        $scope.isRedirectByLinkProcessed = false
        $window.location.href = $scope.coursePaymentLink
    }
    $scope.isRedirectByLinkProcessed = true

    $scope.isCourseBought = function (item) {
        for (var j = 0; j < $scope.payments.length; j++) {
            if (item.id == $scope.payments[j].courseId) {
                return true;
            }
        }
        return false;
    }
    /**
     * Получение курса бесплатно
     */
    $scope.getCourseFree = function (item) {
        $http({
            url: $scope.sharedProperties.getContextPath() + "/course/" + item.id + "/paymentLink",
            method: "GET",
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        }).success(function (data) {
            $scope.coursePaymentLink = data
            $scope.showGetCourseDialog(item)
        }).error(function (data, status) {
            $scope.sharedProperties.error(data.message)
        });
    }
    $scope.showGetCourseDialog = function (item) {
        $scope.course = item
        $('#getCourse').modal('show')
    }
    $scope.hideGetCourseDialog = function () {
        $('#getCourse').modal('hide')
    }
}

marketController.resolve = {
    model: function ($q, $http) {
        var deferred = $q.defer();

        $http({method: 'GET', url: '/public/market'})
            .success(function (data) {
                deferred.resolve(data)
            })
            .error(function (data) {
                //actually you'd want deffered.reject(data) here
                //but to show what would happen on success..
                deferred.resolve("error value");
            });

        return deferred.promise;
    }
}