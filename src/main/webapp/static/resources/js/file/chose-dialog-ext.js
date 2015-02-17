function fileBoxChoseDialogControllerExt($scope, items, sharedProperties, $modalInstance, audio) {

    $scope.sharedProperties = sharedProperties
    $scope.items = items

    /*******************
     * Плееры
     *******************/

    $scope.audio = audio // сервис

    /*******************
     * Файлы
     *******************/

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
    $scope.folders = function(item){
        return item.type == 'folder'
    };
    //Сортировка
    $scope.typeOrder = function(item){
        if ($scope.parent != null) {
            return item.parent.id == $scope.parent.id;
        } else {
            true;
        }
    };
    $scope.upload = function () {
        $scope.items.push({id: 1, name: "file1"});
    }
    $scope.select = function (item) {
        $scope.selected = item
//        $scope.onSelect(item)
    }
    $scope.play = function (item) {
        if (item.entryFileType.type == 'audio') {
            var url = $scope.contextPath + "/fileBox/download/" + item.id;
            audio.reload(url, item.name)
            audio.play()
        }
    }
    $scope.selectTarget = function (item) {
        if (item.type == "folder") {
            $scope.selected = null
            $scope.unSelectAll()
            $scope.parent = item
            $scope.updateBreadcrumbs(item)
        } else {
            $scope.selectUnSelect(item)
        }
    }
    $scope.selectRoot = function (item) {
        $scope.selected = null
        $scope.unSelectAll()
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
    $scope.getParentFolder = function() {
        var item = $scope.ROOT
        for (var i = 0; i < $scope.breadcrumbs.length; i++) {
            if ($scope.breadcrumbs[i].id == $scope.parent.parent) {
                item = $scope.breadcrumbs[i]
            }
        }
        return item;
    }
    $scope.selectedGroup = []
    $scope.isInSelectedGroup = function (item) {
        var result = false
        for (var i = 0; i < $scope.selectedGroup.length; i++) {
            if ($scope.selectedGroup[i].id == item.id) {
                result = true
                break
            }
        }
        return result
    }

    $scope.getCurrentFolderFiles = function() {
        var list = []
        for (var i = 0; i < $scope.items.length; i++) {
            if ($scope.parent.id == $scope.items[i].parent) {
                list.push( $scope.items[i])
            }
        }
        return list
    }
    $scope.selectUnSelect = function(item) {
        if ($scope.isInSelectedGroup(item)) {
            var idx = -1;
            for (var i = 0; i < $scope.selectedGroup.length; i++) {
                if ($scope.selectedGroup[i].id ==item.id) {
                    idx = i;
                    break;
                }
            }
            $scope.selectedGroup.splice(idx, 1);
        } else {
            $scope.selectedGroup.push(item)
        }
        item.isSelected = !item.isSelected
    }
    $scope.selectUnSelectAll = function() {
        var list = $scope.getCurrentFolderFiles()
        // Определим, есть выделенные
        if ($scope.selectedGroup.length > 0) {
            $scope.selectedGroup = []
        } else {
            for (var i = 0; i < list.length; i++) {
                if (list[i].type != "folder") {
                    $scope.selectedGroup.push(list[i])
                }
            }
        }
    }
    $scope.unSelectAll = function() {
        if ($scope.selectedGroup.length > 0) {
            $scope.selectedGroup = []
        }
    }
    $scope.ok = function () {
        $modalInstance.close($scope.selectedGroup);
    }
}

fileBoxChoseDialogControllerExt.resolve = {
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
    }
}

tutorApp.filter('reverse', function() {
    return function(items) {
        if (typeof(items) != "undefined" ) {
            return items.slice().reverse();
        }
    };
});

tutorApp.directive('ngRightClick', function($parse) {
    return function(scope, element, attrs) {
        var fn = $parse(attrs.ngRightClick);
        element.bind('contextmenu', function(event) {
            scope.$apply(function() {
                event.preventDefault();
                fn(scope, {$event:event});
            });
        });
    };
});