function lessonContentOrderController($scope, items, $modalInstance, $http) {

    // Изначальные данные
    $scope.items = items

    $scope.items.sort(function(a, b){
        return a.orderNumber - b.orderNumber;
    });

    /**
     * Сортировка D-D
     * @type {{stop: stop}}
     */
    $scope.sortableOptions = {
        axis: 'y',
        stop: function(e, ui) {
            for (var i = 0; i <  $scope.items.length; i++) {
                $scope.items[i].orderNumber = i
            }
        }
    };

    // Функции
    $scope.ok = function () {
        $modalInstance.close($scope.items);
    }
}