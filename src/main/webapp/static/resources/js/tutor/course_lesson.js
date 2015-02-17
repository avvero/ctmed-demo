function courseLessonController($scope, model, $location, sharedProperties, $modal, $http, audio) {

    $scope.$location = $location;
    $scope.sharedProperties = sharedProperties;

    $scope.lesson = model.lesson
    sharedProperties.selectedLesson = $scope.lesson

    //Первый таб
    $scope.lessonTab = 'material'

    /**
     * При закрытии сохраняем урок
     */
    $scope.$on('$destroy', function iVeBeenDismissed() {
        $scope.saveLesson(false)
    })

    /**
     *
     */
    $scope.saveLesson = function(showNotification) {
        $http({
            url: $scope.sharedProperties.getContextPath()+'/tutor/lesson',
            method: "POST",
            data: $scope.lesson,
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        }).success(function (data) {
            // Обновим файлы
            for (var i = 0; i < $scope.lesson.lessonContents.length; i++) {
                for (var j = 0; j < data.lessonContents.length; j++) {
                    if ($scope.lesson.lessonContents[i].id == data.lessonContents[j].id) {
                        $scope.lesson.lessonContents[i].files = data.lessonContents[j].files
                    }
                }
            }
        }).error(function (data, status) {
            $scope.sharedProperties.error(data.message, "Ошибка сохранения урока '" + $scope.lesson.name + "'", data)
        });
        if (showNotification) {
            $scope.sharedProperties.success("Сохранение урока...")
        } else {
            $scope.sharedProperties.notification("Автосохранение урока '" + $scope.lesson.name + "'")
        }
    }

    /**
     * Удаление контента
     * @param item
     */
    $scope.removeContentItem = function (item) {
        // Сначала удалим, потом запрос
        var idx = -1;
        for (var i = 0; i < $scope.lesson.lessonContents.length; i++) {
            if ($scope.lesson.lessonContents[i].id == item.id) {
                idx = i;
                break;
            }
        }
        $scope.lesson.lessonContents.splice(idx, 1);
        $http({
            url: $scope.sharedProperties.getContextPath() + '/tutor/deleteLessonContent',
            method: "POST",
            data: item,
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        }).success(function (data) {
        }).error(function (data, status) {
            $scope.sharedProperties.error(data.message)
        });
    }

    /**
     * Добавление контента по типам
     */
    $scope.addContentTextItem = function () {
        $scope.addContentItem("text")
    }

    $scope.addContentTextAreaItem = function () {
        $scope.addContentItem("textarea")
    }

    $scope.addContentFileItem = function () {
        $scope.addContentItem("file")
    }
    $scope.addContentItem = function (type) {
        var item = {
            lessonId: $scope.lesson.id,
            type: type,
            orderNumber: $scope.lesson.lessonContents.length
        }
        $http({
            url: $scope.sharedProperties.getContextPath()+'/tutor/addLessonContent',
            method: "POST",
            data: item,
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        }).success(function (data) {
            data.files = []
            $scope.lesson.lessonContents.push(data);
        }).error(function (data, status) {
            $scope.sharedProperties.error(data.message)
        });
    }

    /*******************
     * Диалог добавления файлов
     *******************/
    $scope.showAddFileDialog = function (blockItem) {
        var description = "Загрузка файла и прикрипление к уроку '" + $scope.lesson.name + "'\n\r курса '" + $scope.course.name + "'";
        var modalInstance = $modal.open({
            templateUrl : contextPath +'/fileBox/chose-dialog',
            controller  : 'fileBoxChoseDialogController',
            resolve: {
                options : function($q, $http) {
                    var deferred = $q.defer();
                    deferred.resolve(
                        {
                            url: $scope.sharedProperties.getContextPath() + '/fileBox/blindUpload/',
                            description: description,
                            onSuccess: function(item, response) {
                                var continueOnError = false;
                                if (!continueOnError && $scope.isExistsInContent(blockItem, response)) {
                                    if (confirm("Некоторые файлы уже присутствует в блоке, они не будут добавлены. Продолжить ?")) {
                                        continueOnError = true;
                                    } else {
                                        return;
                                    }
                                }
                                if (!$scope.isExistsInContent(blockItem, response)) {
                                    // Добавялем файл к блоку
                                    var message = "Файл '" + response.name + "' удачно загружен и прикреплен к уроку."
                                    $scope.addFileToLessonBlock(blockItem, response, message);
                                }
                            },
                            onError: function(item, response) {
                                $scope.sharedProperties.error(response.message)
                            }
                        }
                    )
                    return deferred.promise;
                },
                params: function ($q, $http) {
                    var deferred = $q.defer();
                    deferred.resolve({
                        actionName: "Загрузить и прикрепить"
                    })
                    return deferred.promise;
                }
            }
        });
    }

    $scope.showAddFileDialogFromLibrary = function (blockItem) {

        var modalInstance = $modal.open({
            templateUrl : contextPath +'/fileBox/chose-dialog-ext',
            controller  : 'fileBoxChoseDialogControllerExt',
            resolve: fileBoxChoseDialogControllerExt.resolve
        });

        modalInstance.result.then(function (selectedItems) {
            var continueOnError = false;
            for (var i = 0; i < selectedItems.length; i++) {
                if (!continueOnError && $scope.isExistsInContent(blockItem, selectedItems[i])) {
                    if (confirm("Некоторые файлы уже присутствует в блоке, они не будут добавлены. Продолжить ?")) {
                        continueOnError = true;
                    } else {
                        return;
                    }
                }
                if (!$scope.isExistsInContent(blockItem, selectedItems[i])) {
                    var message = "Файл '" + selectedItems[i].name + "' удачно прикреплен к уроку."
                    $scope.addFileToLessonBlock(blockItem, selectedItems[i], message);
                }
            }
        }, function () {

        });
    }

    /**
     * Добавление файла к контенту (контент так же будет создан)
     * @param blockItem
     */
    $scope.showAddFileDialogExt = function () {
        var description = "Загрузка файла и прикрипление к уроку '" + $scope.lesson.name + "'\n\r курса '" + $scope.course.name + "'";
        var modalInstance = $modal.open({
            templateUrl: contextPath + '/fileBox/chose-dialog',
            controller: 'fileBoxChoseDialogController',
            resolve: {
                options: function ($q, $http) {
                    var deferred = $q.defer();
                    deferred.resolve(
                        {
                            url: $scope.sharedProperties.getContextPath() + '/fileBox/blindUpload/',
                            description: description,
                            onSuccess: function (item, response) {
                                // Добавялем файл к блоку
                                var message = "Файл '" + response.name + "' удачно загружен и прикреплен к уроку."
                                $scope.addFileToNewLessonBlock($scope.lesson.id, response, message);
                            },
                            onError: function (item, response) {
                                $scope.sharedProperties.error(response.message)
                            }
                        }
                    )
                    return deferred.promise;
                },
                params: function ($q, $http) {
                    var deferred = $q.defer();
                    deferred.resolve({
                        actionName: "Загрузить и прикрепить"
                    })
                    return deferred.promise;
                }
            }
        });
    }

    /**
     * Добавление файла к контенту (контент так же будет создан)
     * @param blockItem
     */
    $scope.showAddFileDialogFromLibraryExt = function (blockItem) {
        var modalInstance = $modal.open({
            templateUrl: contextPath + '/fileBox/chose-dialog-ext',
            controller: 'fileBoxChoseDialogControllerExt',
            resolve: fileBoxChoseDialogControllerExt.resolve
        });

        modalInstance.result.then(function (selectedItems) {
            for (var i = 0; i < selectedItems.length; i++) {
                var message = "Файл '" + selectedItems[i].name + "' удачно прикреплен к уроку."
                $scope.addFileToNewLessonBlock($scope.lesson.id, selectedItems[i], message);
            }
        }, function () {

        });
    }

    $scope.addFileToLessonBlock = function(blockItem, item, message) {
        // Добавялем файл к блоку
        $http({
            url: $scope.sharedProperties.getContextPath()+'/tutor/addLessonContentFile',
            method: "POST",
            data: {
                id: blockItem.id,
                lessonId: blockItem.lessonId,
                files: [{
                    idLessonContent: blockItem.id,
                    idFile: item.id
                }]
            },
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        }).success(function (data) {
            if (!blockItem.files) {
                blockItem.files = []
            }
            blockItem.files.push(data);
            $scope.sharedProperties.success(message)
        }).error(function (data, status) {
            $scope.sharedProperties.error(data.message)
        });
    }

    /**
     * Добавляет блок к уроку, прикрепляет файл к блоку
     * @param blockItem
     * @param item
     * @param message
     */
    $scope.addFileToNewLessonBlock = function (lessonId, item, message) {
        // Добавялем файл к блоку
        $http({
            url: $scope.sharedProperties.getContextPath() + '/tutor/addFileForNewLessonContent',
            method: "POST",
            data: {
                type: "file",
                orderNumber: $scope.lesson.lessonContents.length,
                lessonId: lessonId,
                files: [
                    {
                        idFile: item.id
                    }
                ]
            },
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        }).success(function (data) {
            for (var i = 0; i < data.length; i++) {
                $scope.lesson.lessonContents.push(data[i]);
            }
            $scope.sharedProperties.success(message)
        }).error(function (data, status) {
            $scope.sharedProperties.error(data.message)
        });
    }

    $scope.isExistsInContent = function(item, file) {
        if (!item.files) {
            return false
        }
        var result = false;
        for (var i = 0; i < item.files.length; i++) {
            if (item.files[i].entryFile.name == file.name) {
                result = true
                break;
            }
        }
        return result
    }

    /**
     * Удаление файла из блока урока
     * @param blockItem
     * @param file
     */
    $scope.deleteFile = function (blockItem, file) {
        // Добавялем файл к блоку
        $http({
            url: $scope.sharedProperties.getContextPath()+'/tutor/deleteLessonContentFile',
            method: "POST",
            data: {
                id: blockItem.id,
                lessonId: blockItem.lessonId,
                files: [{
                    idLessonContent: blockItem.id,
                    id: file.id
                }]
            },
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        }).success(function (data) {
            var idx = -1;
            for (var i = 0; i < blockItem.files.length; i++) {
                if (blockItem.files[i].id == file.id) {
                    idx = i;
                    break;
                }
            }
            blockItem.files.splice(idx, 1);
        }).error(function (data, status) {
            $scope.sharedProperties.error(data.message)
        });
        $scope.sharedProperties.success("Удаление файла из блока урока...")
    }

    $scope.preview = function() {
        sharedProperties.previewLesson = $scope.lesson;
        $('#previewLesson').modal('show')
    }

    /*******************
     * Словарь
     *******************/
    $scope.selectedWord = null
    $scope.selectedWordEdit = null
    $scope.selectWord = function(item) {
        $scope.selectedWord = item
        $scope.selectedWordEdit = angular.copy(item)
    }
    $scope.addWord = function() {
        $scope.selectedWord = null
        $scope.selectedWordEdit = {word:"", lessonId: $scope.lesson.id}
    }
    $scope.saveWord = function(item) {
        // Добавляем слово
        $http({
            url: $scope.sharedProperties.getContextPath()+'/tutor/dictionary/update',
            method: "POST",
            data: item,
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        }).success(function (data) {
            // Обновим слово
            if (item.id) {
                angular.copy(data, $scope.selectedWord);
            } else {
                angular.copy(data, $scope.selectedWordEdit);
                $scope.lesson.entryLessonDictionaries.push(data)
                $scope.selectedWord = data
            }
        }).error(function (data, status) {
            $scope.sharedProperties.error(data.message)
        });
        $scope.sharedProperties.success("Обновление словаря...")
    }
    $scope.showDictionaryModal = function(item) {
        var modalInstance = $modal.open({
            templateUrl : contextPath +'/pages/public/course_lesson_dictionary_edit',
            controller  : 'courseLessonDictionaryEdit',
            resolve: {
                item : function($q, $http) {
                    var deferred = $q.defer();
                    if (item) {
                        deferred.resolve(angular.copy(item))
                    } else {
                        deferred.resolve(
                            {word:"", lessonId: $scope.lesson.id}
                        )
                    }
                    return deferred.promise;
                }
            }
        });

        modalInstance.result.then(function (changedItem) {

        }, function () {

        });
    }

    $scope.showRemoveDictionaryWordDialog = function(item) {
        if (confirm("Удалить слово?")) {
            $http({
                url: $scope.sharedProperties.getContextPath()+"/tutor/dictionary/remove",
                headers: {'Content-Type': 'application/json;charset=UTF-8'},
                method: "DELETE",
                data: item
            }).success(function (data) {
                var idx = -1;
                for (var i = 0; i < $scope.lesson.entryLessonDictionaries.length; i++) {
                    if ($scope.lesson.entryLessonDictionaries[i].id == item.id) {
                        idx = i;
                        break;
                    }
                }
                $scope.lesson.entryLessonDictionaries.splice(idx, 1);
                $scope.selectedWord = null
                $scope.selectedWordEdit = null
            }).error(function (data) {
                $scope.sharedProperties.error(data.message)
            });
        }
        $scope.sharedProperties.success("Обновление словаря...")
    }
    /*******************
     * Диалог добавления файлов к слову в словаре
     *******************/
    $scope.showAddFileToWordDialog = function (wordItem) {
        var description = "Загрузка файла и прикрипление в словрь к слову '" +wordItem.word + "'";
        var modalInstance = $modal.open({
            templateUrl : contextPath +'/fileBox/chose-dialog',
            controller  : 'fileBoxChoseDialogController',
            resolve: {
                options : function($q, $http) {
                    var deferred = $q.defer();
                    deferred.resolve(
                        {
                            url: $scope.sharedProperties.getContextPath() + '/fileBox/blindUpload/',
                            description: description,
                            onSuccess: function(item, response) {
                                if (response.entryFileType.type != 'audio') {
                                    alert("К словарям можно прикреплять только audio файлы!")
                                    return;
                                }
                                wordItem.fileId = response.id
                                wordItem.entryFile = response
                                $scope.saveWord(wordItem)
                            },
                            onError: function(item, response) {
                                $scope.sharedProperties.error(response.message)
                            }
                        }
                    )
                    return deferred.promise;
                },
                params: function ($q, $http) {
                    var deferred = $q.defer();
                    deferred.resolve({
                        actionName: "Загрузить и прикрепить"
                    })
                    return deferred.promise;
                }
            }
        });
    }
    $scope.deleteWordFile = function (wordItem) {
        wordItem.fileId = null
        wordItem.entryFile = null
        $scope.saveWord(wordItem)
    }
    /*******************
     * Скачивание файла
     *******************/
    $scope.download = function(entryFile) {
        var $form = $("<form action='"+ $scope.contextPath + "/fileBox/download/" + entryFile.id +"'></form>")
        $form.appendTo("body")
        $form.submit()
    }
    /*******************
     * Плееры
     *******************/
    $scope.contextPath = contextPath
    $scope.audio = audio // сервис
    $scope.play = function (item) {
        if (item.entryFileType.type == 'audio') {
            var url = $scope.contextPath + "/fileBox/download/" + item.id;
            audio.reload(url, item.name)
            audio.play()
        }
    }
    $scope.playVideo = function(item) {
        var modalInstance = $modal.open({
            templateUrl : contextPath +'/pages/public/video',
            controller  : 'videoPlayerController',
            resolve: {
                item : function($q, $http) {
                    var deferred = $q.defer();
                    deferred.resolve({
                        src: "/stream/" + item.id,
                        type: item.type
                    })
                    return deferred.promise;
                }
            }
        });
    }
    /*******************
     * Диалог изменения порядка блоков
     *******************/
    $scope.showLessonContentOrderDialog = function () {

        var items = []
        for (var i= 0; i < $scope.lesson.lessonContents.length; i++) {
            items.push({
                id: $scope.lesson.lessonContents[i].id,
                orderNumber: $scope.lesson.lessonContents[i].orderNumber,
                type: $scope.lesson.lessonContents[i].type,
                description: $scope.lesson.lessonContents[i].description,
                files: $scope.lesson.lessonContents[i].files
            })
        }
        var modalInstance = $modal.open({
            templateUrl : contextPath +'/pages/tutor/lessonContentOrder',
            controller  : 'lessonContentOrderController',
            size: 'lg',
            resolve: {
                items : function($q, $http) {
                    var deferred = $q.defer();
                    deferred.resolve(items)
                    return deferred.promise;
                }
            }
        });
        modalInstance.result.then(function (items) {
            // TODO Адовый костыль, tinymce не позволяет работать с d-d
            var buffer = []
            for (var i= 0; i < $scope.lesson.lessonContents.length; i++) {
                buffer.push($scope.lesson.lessonContents[i])
            }
            while ($scope.lesson.lessonContents.length > 0) {
                $scope.lesson.lessonContents.splice(0, 1);
            }
            for (var i= 0; i < buffer.length; i++) {
                for (var j= 0; j < items.length; j++) {
                    if (buffer[i].id == items[j].id) {
                        buffer[i].orderNumber = items[j].orderNumber
                    }
                }
            }
            buffer.sort(function(a, b){
                return a.orderNumber - b.orderNumber;
            });
            // Создаем копию для контента
            for (var i= 0; i < buffer.length; i++) {
                $scope.lesson.lessonContents.push({
                    id: buffer[i].id,
                    lessonId: buffer[i].lessonId,
                    orderNumber: buffer[i].orderNumber,
                    description: buffer[i].description,
                    files: buffer[i].files,
                    type: buffer[i].type
                })
            }
            $scope.saveLessonContentOrder($scope.lesson.lessonContents)
        }, function () {});
    }
    $scope.saveLessonContentOrder = function(items) {
        $http({
            url: "/tutor/updateLessonContentOrder",
            method: "POST",
            data: items,
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        }).success(function (data) {
        }).error(function (data, status) {
            $scope.sharedProperties.error(data.message)
        });
        $scope.sharedProperties.success("Изменение порядка материалов...")
    }
}

courseLessonController.resolve = {
    model : function($q, $http, $stateParams) {
        var deferred = $q.defer();
        $http({method: 'GET', url: '/tutor/course/'+$stateParams.id+'/lesson/'+$stateParams.lessonId})
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