function publicTutorController($scope, model, $window, sharedProperties, $http) {
    $scope.sharedProperties = sharedProperties
    $scope.courses = model.courses
    $scope.tutorComments = model.tutorComments
    $scope.tutor = model.tutor
    $scope.payments = model.payments
    $scope.role = model.role
    $scope.showCourse = function(item) {
        $window.location.href = sharedProperties.getContextPath() + "#/course/"+item.id
    }
    $scope.isCourseBought = function(item) {
        for (var j = 0; j < $scope.payments.length; j++) {
            if (item.id == $scope.payments[j].courseId) {
                return true;
            }
        }
        return false;
    }
    $scope.tutorTab =  'courses'
    //Комментарий
    $scope.message = "";
    $scope.leaveCommentForTutor = function() {
        $http({
            url: $scope.sharedProperties.getContextPath()+"/public/addCommentForTutor",
            method: "POST",
            data: {
                message: $scope.message,
                tutorId: $scope.tutor.userId
            },
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        }).success(function (data) {
            $scope.tutorComments.push(data)
            $scope.message = "";
        }).error(function (data, status) {
            $scope.sharedProperties.error(data.message)
        });
    }
    /**
     * Сссылка на профиль
     * @param user
     */
    $scope.getUserUrl = function(user) {
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
}

publicTutorController.resolve = {
    model : function($q, $http, $stateParams) {
        var deferred = $q.defer();

        $http({method: 'GET', url: '/public/tutor/'+$stateParams.id})
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