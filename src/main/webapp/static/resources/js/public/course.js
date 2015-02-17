function courseMarketController($scope, model, $window, sharedProperties, $http) {
    $scope.sharedProperties = sharedProperties
    $scope.course = model.course
    $scope.comments = model.comments
    $scope.coursePaymentLink = ""
    $scope.payments = model.payments
    $scope.role = model.role
    $scope.range = function (n) {
        return new Array(n);
    };
    /**
     * Переход
     * @param item
     */
    $scope.showCourse = function () {
        $window.location.href = sharedProperties.getContextPath() + "#/course/" + $scope.course.id
    }
    $scope.studyCourse = function () {
        $window.location.href = sharedProperties.getContextPath() + "#/boughtCourse/" + $scope.course.id
    }
    $scope.goToMarket = function () {
        $window.location.href = sharedProperties.getContextPath() + "#/market"
    }
    $scope.editCourse = function () {
        $window.location.href = sharedProperties.getContextPath() + "#/tutor/course/" + $scope.course.id + "/info"
    }
    //Комментарий
    $scope.message = "";
    $scope.leaveCommentForCourse = function () {
        $http({
            url: $scope.sharedProperties.getContextPath() + "/course/comment",
            method: "POST",
            data: {
                message: $scope.message,
                courseId: $scope.course.id
            },
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        }).success(function (data) {
            $scope.comments.push(data)
            $scope.message = "";
        }).error(function (data, status) {
            $scope.sharedProperties.error(data.message)
        });
    }
    /**
     * Сссылка на профиль
     * @param user
     */
    $scope.getUserUrl = function (user) {
        if (user.roles) {
            for (var i = 0; i < user.roles.length; i++) {
                if ('ROLE_STUDENT' == user.roles[i].authority) {
                    return '#/public/student/' + user.userId
                } else if ('ROLE_TUTOR' == user.roles[i].authority) {
                    return '#/public/tutor/' + user.userId
                }
            }
        }
        return "#/info"
    }
    /**
     * Покупка курса
     */
    $scope.coursePayment = function () {
        $http({
            url: $scope.sharedProperties.getContextPath() + "/course/" + $scope.course.id + "/paymentLink",
            method: "GET",
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        }).success(function (data) {
            $scope.coursePaymentLink = data
            $scope.showBuyCourseDialog()
        }).error(function (data, status) {
            $scope.sharedProperties.error(data.message)
        });
    }
    $scope.showBuyCourseDialog = function () {
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
    $scope.isCourseBought = function () {
        for (var j = 0; j < $scope.payments.length; j++) {
            if ($scope.course.id == $scope.payments[j].courseId) {
                return true;
            }
        }
        return false;
    }
    /**
     * Получение курса бесплатно
     */
    $scope.getCourseFree = function () {
        $http({
            url: $scope.sharedProperties.getContextPath() + "/course/" + $scope.course.id + "/paymentLink",
            method: "GET",
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        }).success(function (data) {
            $scope.coursePaymentLink = data
            $scope.showGetCourseDialog()
        }).error(function (data, status) {
            $scope.sharedProperties.error(data.message)
        });
    }
    $scope.showGetCourseDialog = function () {
        $('#getCourse').modal('show')
    }
    $scope.hideGetCourseDialog = function () {
        $('#getCourse').modal('hide')
    }
}

courseMarketController.resolve = {
    model: function ($q, $http, $stateParams) {
        var deferred = $q.defer();

        $http({method: 'GET', url: '/public/course/' + $stateParams.id})
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