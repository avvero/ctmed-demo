function translationController($scope, data, $http, $modalInstance, sharedProperties) {

    $scope.data = data
    $scope.sharedProperties = sharedProperties

    $scope.addToCard = function (word, translate, transcription, sentence) {
        $http({
            url: '/student/cards/insert',
            method: "POST",
            data: {
                word: word,
                translate: translate,
                transcription: transcription,
                lessonId: data.lessonId,
                context: sentence
            },
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        }).success(function (result) {
            $scope.sharedProperties.success("Слово добавлено в ваш словарь")
            data.cards.push(result)
        }).error(function (result, status) {
            $scope.sharedProperties.error(result.message)
        });
        $modalInstance.close(true);
    }
}