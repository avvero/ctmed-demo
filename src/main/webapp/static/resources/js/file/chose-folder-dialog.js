function fileBoxChoseFolderDialogController($scope, items, selectedGroup, sharedProperties, $modalInstance) {
    $scope.sharedProperties = sharedProperties
    $scope.items = items

    /*******************
     * Файлы
     *******************/

    // Сначала уберем лишние папки (чтобы саму в себя папку не скопировали)
    for (var i = 0; i < selectedGroup.length; i++) {
        if (selectedGroup[i].type == "folder") {
            for (var j = 0; j < $scope.items.length; j++) {
                if ($scope.items[j].id == selectedGroup[i].id) {
                    $scope.items.splice(j, 1);
                    break;
                }
            }
        }
    }

    $scope.contextPath = contextPath
    $scope.selected = null
    $scope.ROOT = {id: null, name: "Root"}
    $scope.parent = $scope.ROOT
    // События
    // Загружаем список из JSP

    $scope.getItemById = function (id) {
        for (var i = 0; i < $scope.items.length; i++) {
            if ($scope.items[i].id == id) {
                return $scope.items[i];
            }
        }
    }
    $scope.byParent = function(item){
        return $scope.parent.id == item.parent
    };
    //Сортировка
    $scope.typeOrder = function(item){
        if ($scope.parent != null) {
            return item.parent.id == $scope.parent.id;
        } else {
            true;
        }
    };
    $scope.select = function (item) {
        $scope.selected = item
    }
    $scope.ok = function () {
        if ($scope.selected == null) {
            $scope.selected = $scope.parent
        }
        $modalInstance.close($scope.selected);
    }
    $scope.selectFolder = function (item) {
        if (item.type == "folder") {
            $scope.selected = null
            $scope.parent = item
            $scope.updateBreadcrumbs(item)
        }
    }
    $scope.selectRoot = function (item) {
        $scope.selected = null
        $scope.parent = item
        $scope.updateBreadcrumbs(item)
    }
    //Обновление хлебных крошек
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

    $scope.wrapParent = function() {
        return $scope.parent.id == null ? "0" : $scope.parent.id
    }

    /**
     * Добавление файла в родительский scope
     */
    $scope.addToScope = function(item) {
        $scope.sharedProperties.callFileAddingListener(item)
    }
}

fileBoxChoseDialogController.resolve = function(selectedGroup) {
    return {
        items : function($q, $http) {
            var deferred = $q.defer();

            $http({method: 'GET', url: '/fileBox/files'})
                .success(function(data) {
                    deferred.resolve(data)
                })
                .error(function(data){
                    //actually you'd want deffered.reject(data) here
                    //but to show what would happen on success..
                    deferred.resolve("error value");
                });

            return deferred.promise;
        },
        selectedGroup: function($q) {
            var deferred = $q.defer();
            deferred.resolve(selectedGroup)
            return deferred.promise;
        }
    }
}

tutorApp.filter('reverse', function() {
    return function(items) {
        if (typeof(items) != "undefined" ) {
            return items.slice().reverse();
        }
    };
});