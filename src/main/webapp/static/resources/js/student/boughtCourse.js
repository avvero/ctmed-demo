function boughtCourseController($scope, model, sharedProperties, $http, $location, audio, $modal, courseUtils, $state, userInfoService) {
    $scope.sharedProperties = sharedProperties
//    userInfoService.getUserInfo().then(function (data) {
//        $scope.userInfo = data.data;
//    });
    //Костыль - расширение скова для jQuery
    $scope.$http = $http
    $scope.$modal = $modal
    $scope.course = model.course
    $scope.courseComments = model.courseComments
    $scope.courseGroupComments = model.courseGroupComments
    $scope.lessonsComments = model.lessonsComments
    $scope.answers = model.answers

    // Сначала нужно вручную отсортировать
    $scope.course.lessons.sort(function (a, b) {
        return a.orderNumber - b.orderNumber;
    });
    // Ответы по материалам пропишем в соответствующих контентах
    for (var i = 0; i < $scope.course.lessons.length; i++) {
        var lesson = $scope.course.lessons[i]
        for (var j = 0; j < lesson.lessonContents.length; j++) {
            var lessonContent = lesson.lessonContents[j]
            for (var k = 0; k < $scope.answers.length; k++) {
                if (lessonContent.id == $scope.answers[k].lessonContentId) {
                    lessonContent.answer = $scope.answers[k]
                    break;
                }
            }
        }
    }
    /*******************
     * Страницы, переходы
     *******************/
    $scope.pages = []
    $scope.initPages = function () {
        $scope.pages.push(
            {num: 1, id: 'course', type: 'tab', setIt: function () {
                $scope.setTab('course')
            }}
//            {num: 2, id: 'group', type: 'tab', setIt: function() {$scope.setTab('group')}},
//            {num: 3, id: 'tutor', type: 'tab', setIt: function() {$scope.setTab('tutor')}},
//            {num: 4, id: 'files', type: 'tab', setIt: function() {$scope.setTab('files')}}
        )
    }
    // Методы переходов
    $scope.nextPage = function () {
        var pageNum = $scope.currentPage.num
        if (pageNum < $scope.pages.length) {
            $scope.currentPage = $scope.pages[pageNum]
            $scope.currentPage.setIt()
        }
    }
    $scope.prevPage = function () {
        var pageNum = $scope.currentPage.num - 1
        if (pageNum > 0) {
            $scope.currentPage = $scope.pages[pageNum - 1]
            $scope.currentPage.setIt()
        }
    }
    // Проставляем страницу
    $scope.setPage = function (id) {
        for (var i = 0; i < $scope.pages.length; i++) {
            if ($scope.pages[i].id == id) {
                $scope.currentPage = $scope.pages[i]
            }
        }
    }
    $scope.selectLesson = function (lesson) {
        if (lesson) {
            $scope.tab = 'lesson_' + lesson.id
            $scope.lessonTab = 'material'
            $scope.lesson = lesson
            $state.go("boughtCourse.lesson", {lessonId: lesson.id});
            $scope.setPage(lesson.id)
        } else {
            $scope.tab = ''
        }
    }
    /*******************
     * Инициализация страниц
     *******************/
    $scope.initPages()
    // Инициализируем дял уроков селектор
    courseUtils.fillForPages($scope.course, $scope.pages, $scope.selectLesson)
    $scope.currentPage = $scope.pages[0]
    /*******************
     * Табы
     *******************/
        // Карточки ученика
    $scope.cards = model.cards
    //Первый таб
    $scope.tab = 'course'
    $scope.setTab = function (tab) {
        $scope.tab = tab
        $state.go("boughtCourse", {courseId: $scope.course.id});
        $scope.setPage(tab)
    }
    $scope.isCollapsed = false
    $scope.collapseTree = function (scope) {
        if ($scope.isCollapsed) {
            $scope.isCollapsed = false
            scope.expandAll();
        } else {
            $scope.isCollapsed = true
            scope.collapseAll();
        }
    };
    $scope.lessonTab = 'material'
    if ($location.search() && $location.search().type) {
        $scope.tab = $location.search().type
    }

    $scope.selectCurrentLesson = function () {
        // Выбираем урок
        var selectedLessonId = courseUtils.getRouteParam('lesson')
        if (selectedLessonId) {
            courseUtils.selectLessonById($scope.course, selectedLessonId, $scope.selectLesson)
            $scope.setPage(selectedLessonId)
        }
    }
    $scope.selectCurrentLesson()
    $scope.$on('$locationChangeSuccess', function () {
        $scope.selectCurrentLesson()
    });
    /**
     * Файлы курса
     * @param item
     */
    $scope.selectedCourseFile = null;
    $scope.selectCourseFile = function (item) {
        if (item.entryFile.entryFileType.type == "folder") {
            $scope.selected = null
            $scope.selectedCourseFile = null
            $scope.parent = item
            $scope.updateBreadcrumbs(item)
        } else {
            $scope.selectedCourseFile = item
        }
    }
    $scope.contextPath = contextPath
    $scope.selected = null
    $scope.ROOT = {id: null, name: "Root"}
    $scope.parent = $scope.ROOT
    //Обновление хлебных крошек
    $scope.getItemById = function (id) {
        for (var i = 0; i < $scope.files.length; i++) {
            if ($scope.files[i].id == id) {
                return $scope.files[i];
            }
        }
    }
    $scope.updateBreadcrumbs = function (item) {
        $scope.breadcrumbs = []
        //ROOT включать не нужно
        if (item.id != null) {
            $scope.breadcrumbs.push(item)
        }
        while (item.parent != null) {
            item = $scope.getItemById(item.parent)
            $scope.breadcrumbs.push(item)
        }
    }
    $scope.selectRoot = function (item) {
        $scope.selectedCourseFile = null
        $scope.selected = null
        $scope.parent = item
        $scope.updateBreadcrumbs(item)
    }
    $scope.getParentFolder = function () {
        var item = $scope.ROOT
        for (var i = 0; i < $scope.breadcrumbs.length; i++) {
            if ($scope.breadcrumbs[i].id == $scope.parent.parent) {
                item = $scope.breadcrumbs[i]
            }
        }
        return item;
    }
    $scope.byParent = function (item) {
        return $scope.parent.id == item.parent
    };
    $scope.getFiles = function () {
        var list = []
        for (var i = 0; i < $scope.course.files.length; i++) {
            list.push($scope.course.files[i])
        }
        for (var i = 0; i < $scope.course.folders.length; i++) {
            var item = $scope.getFolderWrapper($scope.course.folders[i])
            list.push(item)
        }
        return list;
    }
    $scope.getFolderWrapper = function (item) {
        return {
            id: item.id,
            courseId: item.courseId,
            parent: item.parent,
            name: item.name,
            entryFile: {
                id: item.id,
                name: item.name,
                parent: item.parent,
                entryFileType: {
                    type: 'folder'
                }
            }
        }
    }
    $scope.files = $scope.getFiles()
    /*******************
     * Скачивание файла
     *******************/
    $scope.download = function (file) {
        var $form = $("<form action='" + "/files/download/" + file.entryFile.id + "'></form>")
        $form.appendTo("body")
        $form.submit()
    }
    $scope.open = function (file) {
        var $form = $("<form target=\"_blank\" action='" + "/stream/" + file.entryFile.id + "'></form>")
        $form.appendTo("body")
        $form.submit()
    }
    $scope.trustedUrl = function (id) {
        return courseUtils.trustedUrl(id);
    }
    /*******************
     * Плееры
     *******************/
    $scope.audio = audio // сервис
    $scope.play = function (item) {
        if (item.entryFile.entryFileType.type == 'audio') {
            var url = "/files/download/" + item.entryFile.id;
            audio.reload(url, item.entryFile.name)
            audio.play()
        }
    }
    $scope.playVideo = function (item) {
        var modalInstance = $modal.open({
            templateUrl: contextPath + '/pages/public/video',
            controller: 'videoPlayerController',
            resolve: {
                item: function ($q, $http) {
                    var deferred = $q.defer();
                    deferred.resolve({
                        src: "/stream/" + item.entryFile.id,
                        type: item.type
                    })
                    return deferred.promise;
                }
            }
        });
    }
    /*******************
     * Комментарии
     *******************/
    $scope.message = "";
    $scope.leaveCommentForBoughtCourse = function () {
        $http({
            url: $scope.sharedProperties.getContextPath() + "/student/addCommentToCourse",
            method: "POST",
            data: {
                message: $scope.message,
                courseId: $scope.course.id
            },
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        }).success(function (data) {
            $scope.courseComments.push(data)
            $scope.message = "";
        }).error(function (data, status) {
            $scope.sharedProperties.error(data.message)
        });
    }
    /*******************
     * Комментарии к группе курса
     *******************/
    $scope.message = "";
    $scope.leaveCommentForGroupOfBoughtCourse = function () {
        $http({
            url: $scope.sharedProperties.getContextPath() + "/student/addCommentToCourseGroup",
            method: "POST",
            data: {
                message: $scope.message,
                courseId: $scope.course.id
            },
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        }).success(function (data) {
            $scope.courseGroupComments.push(data)
            $scope.message = "";
        }).error(function (data, status) {
            $scope.sharedProperties.error(data.message)
        });
    }
    /*******************
     * Комментарии к уроку
     *******************/
    $scope.getLessonComment = function (lesson) {
        var arrayToReturn = [];
        for (var i = 0; i < $scope.lessonsComments.length; i++) {
            if ($scope.lessonsComments[i].lessonId == lesson.id) {
                arrayToReturn.push($scope.lessonsComments[i]);
            }
        }
        return arrayToReturn;
    }
    $scope.lessonMessage = "";
    $scope.leaveCommentForBoughtCourseLesson = function (lesson, lessonMessage, childScope) {
        $http({
            url: $scope.sharedProperties.getContextPath() + "/student/addCommentToCourseLesson",
            method: "POST",
            data: {
                lessonId: lesson.id,
                message: lessonMessage,
                courseId: $scope.course.id
            },
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        }).success(function (data) {
            $scope.lessonsComments.push(data)
            childScope.lessonMessage = "";
        }).error(function (data, status) {
            $scope.sharedProperties.error(data.message)
        });
    }
    /***********************************
     * Текст с возможностью выбора слов
     ***********************************/
    $scope.getSplittedText = function (text) {
        return text
            .replace(/\s/g, "|||")
            .replace(/,/g, "|||,|||")
            .replace(/\./g, "|||.|||")
            .replace(/:/g, "|||:|||")
            .replace(/!/g, "|||!|||")
            .replace(/\(/g, "|||(|||")
            .replace(/\)/g, "|||)|||")
            .split("|||")
    }
    $scope.selectWord = function (item) {
        console.info(item)
    }
    $scope.getHtmlParts = function (html) {
        var parts = html.match(/[^><]+?(?=<|$)/g)
        for (var i = 0; i < parts.length; i++) {
            html = html.replace(parts[i], "<_text>" + parts[i] + "</_text>")
        }
        return html
    }

    $scope.selectTrslWord = function (value) {
        var modalInstance = $modal.open({
            templateUrl: contextPath + '/pages/public/dictionary',
            controller: 'dictionaryController'
//            resolve: dictionaryController.resolve
        });

        modalInstance.result.then(function (selectedItem) {

        }, function () {

        });
    }

    $scope.addStudentLessonCards = function (items, lesson, cards) {
        for (var i = 0; i < cards.length; i++) {
            if (cards[i].lessonId == lesson.id) {
                items.push(cards[i])
            }
        }
    }

    /***********************************
     * Тренировка по карточкам
     ***********************************/
    $scope.trainEnRu = function (lesson, cards) {
        // В тренировке участвую личные карточки студента
        var lessonCards = lesson.entryLessonDictionaries;
        var items = []
        for (var i = 0; i < lessonCards.length; i++) {
            items.push(lessonCards[i])
        }
        $scope.addStudentLessonCards(items, lesson, cards)

        var modalInstance = $modal.open({
            templateUrl: contextPath + '/pages/student/cardChallenge',
            controller: 'cardChallengeController',
            resolve: {
                items: function ($q, $http) {
                    var deferred = $q.defer();
                    deferred.resolve(items)
                    return deferred.promise;
                },
                direction: function ($q, $http) {
                    var deferred = $q.defer();
                    deferred.resolve("en-ru")
                    return deferred.promise;
                }
            }
        });
    }
    $scope.trainRuEn = function (lesson, cards) {
        // В тренировке участвую личные карточки студента
        var lessonCards = lesson.entryLessonDictionaries;
        var items = []
        for (var i = 0; i < lessonCards.length; i++) {
            items.push(lessonCards[i])
        }
        $scope.addStudentLessonCards(items, lesson, cards)
        var modalInstance = $modal.open({
            templateUrl: contextPath + '/pages/student/cardChallenge',
            controller: 'cardChallengeController',
            resolve: {
                items: function ($q, $http) {
                    var deferred = $q.defer();
                    deferred.resolve(items)
                    return deferred.promise;
                },
                direction: function ($q, $http) {
                    var deferred = $q.defer();
                    deferred.resolve("ru-en")
                    return deferred.promise;
                }
            }
        });
    }
    // Добавление карточек из урока
    $scope.addToCardsFromLesson = function (items) {
        $http({
            url: $scope.sharedProperties.getContextPath() + '/student/cards/insertFromLesson',
            method: "POST",
            data: items,
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        }).success(function (data) {
            $scope.sharedProperties.success(data.result)
        }).error(function (data, status) {
            $scope.sharedProperties.error(data.message)
        });
    }
    $scope.addToCard = function (word, translate, transcription, sentence) {
        $http({
            url: $scope.sharedProperties.getContextPath() + '/student/cards/insert',
            method: "POST",
            data: {
                word: word,
                translate: translate,
                transcription: transcription,
                lessonId: $scope.lesson.id,
                context: sentence
            },
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        }).success(function (data) {
            $scope.sharedProperties.success("Слово добавлено в ваш словарь")
            $scope.cards.push(data)
        }).error(function (data, status) {
            $scope.sharedProperties.error(data.message)
        });
    }

    /**
     * Добавление новой карточки в словарь урока
     * @param item
     */
    $scope.showDictionaryForLessonModal = function (lesson) {
        var modalInstance = $modal.open({
            templateUrl: contextPath + '/pages/public/course_lesson_dictionary_edit',
            controller: 'courseLessonDictionaryEdit',
            resolve: {
                item: function ($q, $http) {
                    var deferred = $q.defer();
                    deferred.resolve(
                        {word: "", lessonId: lesson.id}
                    )
                    return deferred.promise;
                }
            }
        });

        modalInstance.result.then(function (changedItem) {
            // Добавляем слово
            $http({
                url: $scope.sharedProperties.getContextPath() + '/student/cards/update',
                method: "POST",
                data: changedItem,
                headers: {'Content-Type': 'application/json;charset=UTF-8'}
            }).success(function (data) {
                // Обновим слово
                $scope.cards.push(data)
                $scope.sharedProperties.success("Слово добавлено")
            }).error(function (data, status) {
                $scope.sharedProperties.error(data.message)
            });
        }, function () {

        });
    }
    $scope.removeCard = function (item) {
        if (confirm("Удалить карточку со словом '" + item.word + "' ?")) {
            $http({
                url: "/student/cards/delete",
                headers: {'Content-Type': 'application/json;charset=UTF-8'},
                method: "DELETE",
                data: item
            }).success(function (data) {
                var idx = -1;
                for (var i = 0; i < $scope.cards.length; i++) {
                    if ($scope.cards[i].id == item.id) {
                        idx = i;
                        break;
                    }
                }
                $scope.cards.splice(idx, 1);
                $scope.sharedProperties.success("Карточка удалена")
            }).error(function (data) {
                $scope.sharedProperties.error(data.message)
            });
        }
    }

    $scope.showDictionaryModal = function (item) {
        var modalInstance = $modal.open({
            templateUrl: contextPath + '/pages/public/course_lesson_dictionary_edit',
            controller: 'courseLessonDictionaryEdit',
            resolve: {
                item: function ($q, $http) {
                    var deferred = $q.defer();
                    if (item) {
                        deferred.resolve(angular.copy(item))
                    } else {
                        deferred.resolve(
                            {word: ""}
                        )
                    }
                    return deferred.promise;
                }
            }
        });

        modalInstance.result.then(function (changedItem) {
            // Добавляем слово
            $http({
                url: $scope.sharedProperties.getContextPath() + '/student/cards/update',
                method: "POST",
                data: changedItem,
                headers: {'Content-Type': 'application/json;charset=UTF-8'}
            }).success(function (data) {
                // Обновим слово
                if (changedItem.id) {
                    angular.copy(changedItem, item);
                } else {
                    $scope.list.push(data)
                }
                $scope.sharedProperties.success("Карточка изменена")
            }).error(function (data, status) {
                $scope.sharedProperties.error(data.message)
            });
        }, function () {

        });
    }

    /**
     * Ответы
     */
    $scope.saveAnswer = function (item) {
        // Добавляем слово
        $http({
            url: $scope.sharedProperties.getContextPath() + '/student/addAnswerToContent',
            method: "POST",
            data: {
                lessonContentId: item.id,
                value: item.answer.value,
                id: item.answer.id
            },
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        }).success(function (data) {
            // Обновим слово
            item.answer = data
            $scope.sharedProperties.success("Ответ удачно сохранен")
        }).error(function (data, status) {
            $scope.sharedProperties.error(data.message)
        });
    }
}

boughtCourseController.resolve = {
    model: function ($q, $http, $stateParams) {
        var deferred = $q.defer();

        $http({method: 'GET', url: '/student/boughtCourse/' + $stateParams.id})
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

studentApp.filter('foldersFirstForCourse', function () {
    return function (items, field, reverse) {
        var filtered = [];
        var files = [];
        angular.forEach(items, function (item) {
            if (item.entryFile.entryFileType && item.entryFile.entryFileType.type == 'folder') {
                filtered.push(item);
            } else {
                files.push(item);
            }
        });
        angular.forEach(files, function (item) {
            filtered.push(item);
        });
        return filtered;
    };

});

studentApp.filter('reverse', function () {
    return function (items) {
        if (typeof(items) != "undefined") {
            return items.slice().reverse();
        }
    };
});