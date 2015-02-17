function courseStudentController($scope, model, $location, sharedProperties, $modal, $http) {
    $scope.$location = $location;
    $scope.sharedProperties = sharedProperties;

    $scope.student = model.student
    $scope.courseComments = model.courseComments
    $scope.lessonsComments = model.lessonsComments

    //Первый таб
    $scope.studentTab = 'studentChat'
    if ($location.search() && $location.search().type) {
        $scope.studentTab = $location.search().type
    }
    /*******************
     * Комментарии
     *******************/
    $scope.message = "";
    $scope.messageFiles = [];
    $scope.leaveCommentForBoughtCourse = function() {
        $http({
            url: $scope.sharedProperties.getContextPath()+"/tutor/addCommentToCourseForStudent",
            method: "POST",
            data: {
                message: $scope.message,
                files: $scope.messageFiles,
                courseId: $scope.course.id,
                studentId: $scope.student.userId
            },
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        }).success(function (data) {
            $scope.courseComments.push(data)
            $scope.message = "";
            $scope.messageFiles = []
        }).error(function (data, status) {
            $scope.sharedProperties.error(data.message)
        });
    }
    /*******************
     * Таб по уроку, выбор 1 по умолчанию
     *******************/
    if ($scope.course.lessons.length > 0) {
        $scope.tab = 'lesson_'+ $scope.course.lessons[0].id
    }
    $scope.selectLesson = function(lesson){
        $scope.tab = 'lesson_'+ lesson.id
    }
    if ($location.search() && $location.search().type) {
        $scope.tab = $location.search().lesson
    }
    /*******************
     * Комментарии к уроку
     *******************/
    $scope.getLessonComment = function(lesson) {
        var arrayToReturn = [];
        for (var i=0; i<$scope.lessonsComments.length; i++){
            if ($scope.lessonsComments[i].lessonId == lesson.id) {
                arrayToReturn.push($scope.lessonsComments[i]);
            }
        }
        return arrayToReturn;
    }
    $scope.leaveCommentForBoughtCourseLesson = function(lesson, lessonMessage, childScope) {
        $http({
            url: $scope.sharedProperties.getContextPath()+"/tutor/addCommentToCourseLessonForStudent",
            method: "POST",
            data: {
                lessonId: lesson.id,
                message: lessonMessage,
                files: lesson.lessonMessageFiles,
                studentId: $scope.student.userId,
                courseId: $scope.course.id
            },
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        }).success(function (data) {
            $scope.lessonsComments.push(data)
            childScope.lessonMessage = "";
            lesson.lessonMessageFiles = []
        }).error(function (data, status) {
            $scope.sharedProperties.error(data.message)
        });
    }
    /*******************
     * Диалог добавления файлов к сообщению
     *******************/
    $scope.showAddFileDialog = function () {

        var modalInstance = $modal.open({
            templateUrl : contextPath +'/fileBox/chose-dialog-ext',
            controller  : 'fileBoxChoseDialogController',
            resolve: fileBoxChoseDialogController.resolve
        });

        modalInstance.result.then(function (selectedItems) {
            for (var i = 0; i < selectedItems.length; i++) {
                if (selectedItems[i]) {
                    delete selectedItems[i]['isSelected']
                    $scope.messageFiles.push(selectedItems[i]);
                }
            }
        }, function () {

        });
    }
    $scope.deleteFile = function(item) {
        var idx = -1;
        for (var i = 0; i < $scope.messageFiles.length; i++) {
            if ($scope.messageFiles[i].id == item.id) {
                idx = i;
                break;
            }
        }
        $scope.messageFiles.splice(idx, 1);
    }
    /*******************
     * Диалог добавления файлов к сообщению по уроку
     *******************/
    $scope.showAddFileDialogForLesson = function (lesson) {

        var modalInstance = $modal.open({
            templateUrl : contextPath +'/fileBox/chose-dialog-ext',
            controller  : 'fileBoxChoseDialogController',
            resolve: fileBoxChoseDialogController.resolve
        });

        modalInstance.result.then(function (selectedItems) {
            for (var i = 0; i < selectedItems.length; i++) {
                if (selectedItems[i]) {
                    if (!lesson.lessonMessageFiles) {
                        lesson.lessonMessageFiles = []
                    }
                    delete selectedItems[i]['isSelected']
                    lesson.lessonMessageFiles.push(selectedItems[i]);
                }
            }
        }, function () {

        });
    }
    $scope.deleteFileForLesson = function(lesson, item) {
        var idx = -1;
        for (var i = 0; i < lesson.lessonMessageFiles.length; i++) {
            if (lesson.lessonMessageFiles[i].id == item.id) {
                idx = i;
                break;
            }
        }
        lesson.lessonMessageFiles.splice(idx, 1);
    }
}

courseStudentController.resolve = {
    model : function($q, $http, $stateParams) {
        var deferred = $q.defer();
        $http({method: 'GET', url: '/tutor/course/'+$stateParams.id+'/student/'+$stateParams.studentId})
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