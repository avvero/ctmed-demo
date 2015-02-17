function infoStudentController($scope, model, sharedProperties, $upload, $http) {
    $scope.sharedProperties = sharedProperties
    $scope.user = model.user
    $scope.sexTypes = model.sexTypes
    $scope.saveInfo = function () {
        $http({
            url: "/student/info",
            method: "POST",
            data: JSON.stringify($scope.user),
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        }).success(function (data) {
                $scope.sharedProperties.success(data.result)
            }).error(function (data, status) {
                $scope.sharedProperties.error(data.message)
            });
        $('#rename').modal('hide')
    }

    $scope.onFileSelect = function($files) {
        //$files: an array of files selected, each file has name, size, and type.
        for (var i = 0; i < $files.length; i++) {
            var file = $files[i];
            $scope.upload = $upload.upload({
                url: $scope.sharedProperties.getContextPath() + '/image/uploadForUser',
                method: 'POST',
                // headers: {'headerKey': 'headerValue'},
                // withCredential: true,
                data: { courseId: $scope.user.id },
                file: file
            }).progress(function(evt) {

            }).success(function(response) {
                // file is uploaded successfully
                $scope.user.pictureId = response
            }).error(function(response) {
                $scope.sharedProperties.error(response.message)
            })
        }
    };

    /*******************
     * Изменение пароля
     *******************/
    $scope.password = null
    $scope.passwordConfirm = null
    $scope.showChangePassDialog = function() {
        $scope.password = null
        $scope.passwordConfirm = null
        $('#changePassword').modal('show')
    }
    $scope.hideChangePassDialog = function() {
        $('#changePassword').modal('hide')
    }
    $scope.changePassword = function() {
        $http({
            url: "/user/changePassword",
            method: "POST",
            data: JSON.stringify({
                password: $scope.password,
                passwordConfirm: $scope.passwordConfirm
            }),
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        }).success(function (data) {
            $scope.sharedProperties.success(data.result)
        }).error(function (data, status) {
            $scope.sharedProperties.error(data.message)
        });
        $('#changePassword').modal('hide')
    }

    /*******************
     * Ошибки
     *******************/

    $scope.errors = []
    $scope.newError = function(error) {
        $scope.errors.push(error)
    }
    $scope.closeError = function(idx) {
        $scope.errors.splice(idx, 1);
    }

    /*******************
     * Ошибки
     *******************/

    $scope.infos = []
    $scope.newInfo = function(info) {
        $scope.infos.push(info)
    }
    $scope.closeInfo = function(idx) {
        $scope.infos.splice(idx, 1);
    }
}

infoStudentController.resolve = {
    model : function($q, $http) {
        var deferred = $q.defer();

        $http({method: 'GET', url: '/student/info'})
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