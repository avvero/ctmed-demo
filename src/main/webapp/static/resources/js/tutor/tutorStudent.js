function tutorStudentController($scope, model, sharedProperties, $window, courseUtils, $http) {
    $scope.sharedProperties = sharedProperties
    $scope.payments = model.payments
    $scope.student = $scope.payments[0]
    $scope.courses = model.courses
    $scope.answers = model.answers
    $scope.notes = model.notes
    $scope.cards = model.cards
    $scope.comments = model.comments
    $scope.course = {}
    $scope.lesson = {}
    $scope.studentTab = 'cards'
    $scope.studentLeftTab = 'courses'
    $scope.selectCourse = function (courseId) {
        if ($scope.course || $scope.course.id != courseId) {
            for (var i = 0; i < $scope.courses.length; i++) {
                if ($scope.courses[i].id == courseId) {
                    $scope.course = $scope.courses[i]
                    $scope.lesson = null
                    break;
                }
            }
        } else {
            $scope.course = {}
        }
        // ВЫбираем первый таб
        $scope.studentTab = 'studentChat'
    }
    $scope.selectLesson = function (lesson) {
        $scope.tab = 'lesson_' + lesson.id
        $scope.lessonTab = 'material'
        $scope.lesson = lesson
    }
    $scope.selectStudent = function () {
        $window.location.href = sharedProperties.getContextPath() + "#/student/" + $scope.student.studentId
        $scope.course = {}
        $scope.lesson = {}
        // ВЫбираем первый таб
        $scope.studentTab = 'cards'
    }
    /**
     * Автовыбор после обновления
     * @type {*}
     */
    // Выбираем курс
    var selectedCourseId = courseUtils.getRouteParam('course')
    if (selectedCourseId) {
        $scope.selectCourse(selectedCourseId)
    }
    // Выбираем урок
    var selectedLessonId = courseUtils.getRouteParam('lesson')
    if (selectedLessonId) {
        courseUtils.selectLessonById($scope.course, selectedLessonId, $scope.selectLesson)
    }
    /*******************
     * Комментарии
     *******************/
    $scope.commentsMap = {}
    for (var i = 0; i < $scope.comments.length; i++) {
        var entry = $scope.commentsMap
    }

    $scope.getPaymentId = function (courseId) {
        for (var i = 0; i < $scope.payments.length; i++) {
            if ($scope.payments[i].courseId == courseId) {
                return $scope.payments[i].id
            }
        }
        return courseId;
    }

    $scope.message = "";
    $scope.messageFiles = [];
    $scope.leaveCommentForBoughtCourse = function () {
        $http({
            url: $scope.sharedProperties.getContextPath() + "/tutor/addCommentToCourseForStudent",
            method: "POST",
            data: {
                message: $scope.message,
                files: $scope.messageFiles,
                courseId: $scope.course.id,
                studentId: $scope.student.userId
            },
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        }).success(function (data) {
            $scope.comments.push(data)
            $scope.message = "";
            $scope.messageFiles = []
        }).error(function (data, status) {
            $scope.sharedProperties.error(data.message)
        });
    }
    //Заметки
    $scope.addNote = function () {
        var item = {
            studentId: $scope.student.userId
        }
        $scope.updateNote(item)
    }
    $scope.updateNote = function (item) {
        $http({
            url: $scope.sharedProperties.getContextPath() + '/tutor/updateStudentNote',
            method: "POST",
            data: item,
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        }).success(function (data) {
            if (item.id != data.id) {
                $scope.notes.push(data);
            }
        }).error(function (data, status) {
            $scope.sharedProperties.error(data.message)
        });
    }
    $scope.deleteNote = function (item) {
        $http({
            url: $scope.sharedProperties.getContextPath() + '/tutor/deleteStudentNote',
            method: "POST",
            data: item,
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        }).success(function (data) {
            var idx = -1;
            for (var i = 0; i < $scope.notes.length; i++) {
                if ($scope.notes[i].id == item.id) {
                    idx = i;
                    break;
                }
            }
            $scope.notes.splice(idx, 1);
        }).error(function (data, status) {
            $scope.sharedProperties.error(data.message)
        });
    }
}

tutorStudentController.resolve = {
    model: function ($q, $http, $stateParams) {
        var deferred = $q.defer();

        $http({method: 'GET', url: '/tutor/student/' + $stateParams.id})
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