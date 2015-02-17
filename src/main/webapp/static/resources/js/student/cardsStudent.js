function cardsStudentController($scope, model, $modal, $http, sharedProperties, audio) {
    // Изначальные данные
    $scope.list = model
    $scope.sharedProperties = sharedProperties;

    /***********************************
     * Тренировка по карточкам
     ***********************************/
    $scope.trainEnRu = function(items) {
        var modalInstance = $modal.open({
            templateUrl : contextPath +'/pages/student/cardChallenge',
            controller  : 'cardChallengeController',
            resolve: {
                items : function($q, $http) {
                    var deferred = $q.defer();
                    deferred.resolve(items)
                    return deferred.promise;
                },
                direction : function($q, $http) {
                    var deferred = $q.defer();
                    deferred.resolve("en-ru")
                    return deferred.promise;
                }
            }
        });
    }
    $scope.trainRuEn = function(items) {
        var modalInstance = $modal.open({
            templateUrl : contextPath +'/pages/student/cardChallenge',
            controller  : 'cardChallengeController',
            resolve: {
                items : function($q, $http) {
                    var deferred = $q.defer();
                    deferred.resolve(items)
                    return deferred.promise;
                },
                direction : function($q, $http) {
                    var deferred = $q.defer();
                    deferred.resolve("ru-en")
                    return deferred.promise;
                }
            }
        });
    }
    $scope.removeCard = function(item) {
        if (confirm("Удалить карточку со словом '"+item.word+"' ?")) {
            $http({
                url: "/student/cards/delete",
                headers: {'Content-Type': 'application/json;charset=UTF-8'},
                method: "DELETE",
                data: item
            }).success(function (data) {
                var idx = -1;
                for (var i = 0; i < $scope.list.length; i++) {
                    if ($scope.list[i].id == item.id) {
                        idx = i;
                        break;
                    }
                }
                $scope.list.splice(idx, 1);
                $scope.sharedProperties.success("Карточка удалена")
            }).error(function (data) {
                $scope.sharedProperties.error(data.message)
            });
        }
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
                            {word:""}
                        )
                    }
                    return deferred.promise;
                }
            }
        });

        modalInstance.result.then(function (changedItem) {
            // Добавляем слово
            $http({
                url: $scope.sharedProperties.getContextPath()+'/student/cards/update',
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

    /*******************
     * Скачивание файла
     *******************/
    $scope.download = function(item) {
        var $form = $("<form action='"+"/files/download/" + item.entryFile.id +"'></form>")
        $form.appendTo("body")
        $form.submit()
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
    $scope.playVideo = function(item) {
        var modalInstance = $modal.open({
            templateUrl : contextPath +'/pages/public/video',
            controller  : 'videoPlayerController',
            resolve: {
                item : function($q, $http) {
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

}

cardsStudentController.resolve = {
    model : function($q, $http) {
        var deferred = $q.defer();

        $http({
                method: 'GET',
                url: '/student/cards',
                headers: {'Content-Type': 'application/json;charset=UTF-8'}
            })
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