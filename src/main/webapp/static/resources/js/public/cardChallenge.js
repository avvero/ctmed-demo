function cardChallengeController($scope, items, direction, $modalInstance, audio, $http, sharedProperties) {

    $scope.sharedProperties = sharedProperties;

    // Изначальные данные
    $scope.items = items
    $scope.wellDefault = "          "

    // Новый элемент
    $scope.getNext = function() {
        return $scope.getOther(+1)
    }
    $scope.getPrev = function () {
        return $scope.getOther(-1)
    }
    /**
     * Получние следующего/предыдущего
     * @param step
     * @returns {*}
     */
    $scope.getOther = function (step) {
        $scope.well = $scope.wellDefault
        // Получаем элемент из списка
        var item = $scope.roll($scope.item, $scope.items, step)
        // Слово
        if (direction == "en-ru") {
            $scope.word = item.word
        } else {
            $scope.word = item.translate
        }
        $scope.description = item.description
        $scope.context = item.context
        $scope.example = item.example
        // Обнуляем флажки
        $scope.answerIsDone = false
        $scope.isShowDescription = false
        $scope.isShowContext = true
        $scope.isShowExample = false
        $scope.item = item
        return item
    }
    // Получение следующего элемента в списке
    $scope.roll = function (item, list, step) {
        // Если не начало
        if (item) {
            var idx = -1;
            if (step > 0) {
                for (var i = 0; i < list.length; i++) {
                    if (list[i].id == item.id) {
                        idx = i;
                        break;
                    }
                }
            } else {
                for (var i = list.length - 1; i >= 0; i--) {
                    if (list[i].id == item.id) {
                        idx = i;
                        break;
                    }
                }
            }
            if (idx >= list.length -1) {
                idx = 0
            } else {
                ++idx
            }
            return list[idx]
        } else {
            return list[0]
        }
    }

    $scope.item = $scope.getNext()
    $scope.answerIsDone = false


    // Функции
    $scope.ok = function () {
        audio.pause()
        $modalInstance.close();
    }

    $scope.showAnswer = function() {
        audio.pause()
        $scope.answerIsDone = true
        if (direction == "en-ru") {
            $scope.well = $scope.item.translate
        } else {
            $scope.well = $scope.item.word
        }
    }

    $scope.showDescription = function() {
        $scope.isShowDescription = true
    }

    $scope.showContext = function() {
        $scope.isShowContext = true
    }
    $scope.showExample = function() {
        $scope.isShowExample = true
    }

    $scope.setIsLearned = function () {
        var item = $scope.item
        item.isLearned = 1
        // Добавляем слово
        $http({
            url: '/student/cards/update',
            method: "POST",
            data: item,
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        }).success(function (data) {
            $scope.sharedProperties.success("Карточка изменена")
        }).error(function (data, status) {
            $scope.sharedProperties.error(data.message)
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