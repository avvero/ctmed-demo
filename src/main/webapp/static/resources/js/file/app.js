function fileBoxController($scope, items, sharedProperties, $http, $modal, audio, fileUploader) {
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

    /*******************
     * Загрузка файлов
     *******************/
    $scope.wrapParent = function() {
        return $scope.parent.id == null ? "0" : $scope.parent.id
    }

    $scope.uploader = fileUploader


    $scope.fileQueue = []
    $scope.getOptions =  function(){
        return {
            url: $scope.contextPath + '/fileBox/upload/' + $scope.wrapParent(),
            description: "Загрузка файла в библиотеку",
            onSuccess: function(item, response) {
                // file is uploaded successfully
                $scope.items.push(response)
                // Увеличиваем счетчик
                $scope.successUploadCount += 1
                $scope.sharedProperties.success("Файл '"+response.name+"' загружен в библиотеку")
            },
            onError: function(item, response) {
                $scope.sharedProperties.error(response.message)
            }
        }
    }
    $scope.onFileSelect = function($files) {
        $scope.fileQueue = $files
    }

    /**
     * Диалог
     */
    $scope.showUploadDialog = function () {
        $scope.fileQueue = []
        $('#upload').modal('show')
    }
    $scope.hideUploadDialog = function () {
        $('#upload').modal('hide')
    }

    $scope.uploadAll = function () {
        $scope.uploader.addToQueue($scope.fileQueue, $scope.getOptions());
        $scope.uploader.uploadAll()
        $scope.hideUploadDialog()
    }

   $scope.wrapParent = function() {
       return $scope.parent.id == null ? "0" : $scope.parent.id
   }

    /*******************
     * Создание папки
     *******************/
    $scope.folderName;

    $scope.showCreateFolderDialog = function () {

        $('#createFolder').modal('show')
    }
    $scope.hideCreateFolderDialog = function () {

        $('#createFolder').modal('hide')
    }
    $scope.createFolder = function () {
        $http({
            url: $scope.contextPath+"/fileBox/createFolder",
            method: "POST",
            data: {
                "name": $scope.folderName,
                "parent": $scope.parent.id
            }
        }).success(function (data, status, headers, config) {
            $scope.folderName = ""
            $('#createFolder').modal('hide')
            $scope.items.push(data)
        }).error(function (data, status, headers, config) {
            $scope.sharedProperties.error(data.message)
            $scope.folderName = ""
            $('#createFolder').modal('hide')
        });
    }

    /*******************
     * Удаление файла, папки
     *******************/
    $scope.showRemoveDialog = function() {
        $('#remove').modal('show')
    }
    $scope.remove = function () {
        $http({
            url: $scope.contextPath+"/fileBox/remove",
            method: "POST",
            data: {
                "id": $scope.selected.id
            }
        }).success(function (data, status, headers, config) {
                $('#remove').modal('hide')
                var idx = -1;
                for (var i = 0; i < $scope.items.length; i++) {
                    if ($scope.items[i].id == $scope.selected.id) {
                        idx = i;
                        break;
                    }
                }
                $scope.items.splice(idx, 1);
                $scope.selected = null
            }).error(function (data, status, headers, config) {
                $scope.sharedProperties.error(data.message)
                $('#remove').modal('hide')
                $scope.status = status;
            });
    }
    $scope.showRemoveAllDialog = function () {
        $('#removeAll').modal('show')
    }
    $scope.removeAll = function () {
        for (var i = 0; i < $scope.selectedGroup.length; i++) {
            var selected = $scope.selectedGroup[i]
            $http({
                url: $scope.contextPath+"/fileBox/remove",
                method: "POST",
                data: {
                    "id": selected.id
                }
            }).success(function (data, status, headers, config) {
                $('#remove').modal('hide')
                // Чистим список файлов
                var idx = -1;
                for (var j = 0; j < $scope.items.length; j++) {
                    if ($scope.items[j].id == selected.id) {
                        idx = j;
                        break;
                    }
                }
                $scope.items.splice(idx, 1);
                // Чистим список файлов 2
                var idx = -1;
                for (var j = 0; j < $scope.selectedGroup.length; j++) {
                    if ($scope.selectedGroup[j].id == selected.id) {
                        idx = j;
                        break;
                    }
                }
                $scope.selectedGroup.splice(idx, 1);
                $scope.selected = null
//                $scope.selectedGroup = []
            }).error(function (data, status, headers, config) {
                $scope.sharedProperties.error(data.message)
                $('#remove').modal('hide')
                $scope.status = status;
            });
        }
        $('#removeAll').modal('hide')
    }
    /*******************
     * Скачивание файла
     *******************/
    $scope.download = function() {
        var $form = $("<form action='"+ $scope.contextPath + "/fileBox/download/" + $scope.selected.id +"'></form>")
        $form.appendTo("body")
        $form.submit()
    }
    $scope.open = function(selected) {
        var $form = $("<form target=\"_blank\" action='"+ $scope.contextPath + "/stream/" + selected.id +"'></form>")
        $form.appendTo("body")
        $form.submit()
    }
    /*******************
     * Переименовывание файла
     *******************/
    $scope.newName
    $scope.showRenameDialog = function() {
        $scope.newName = ""
        $('#rename').modal('show')
    }
    $scope.hideRenameDialog = function() {
        $('#rename').modal('hide')
    }
    $scope.rename = function () {
        $http({
            url: $scope.contextPath + "/fileBox/rename",
            method: "POST",
            data: {
                "id": $scope.selected.id,
                "name" : $scope.newName
            }
        }).success(function (data, status, headers, config) {
                $('#rename').modal('hide')
                $scope.selected.name = data.name;
            }).error(function (data, status, headers, config) {
                $scope.sharedProperties.error(data.message)
                $('#rename').modal('hide')
                $scope.status = status;
            });
        $('#rename').modal('hide')
    }

    /*******************
     * Перемещение файла
     *******************/
    $scope.selectedFolder = []
    $scope.newParent = $scope.ROOT
//    $scope.showReplaceDialog = function() {
//        $scope.newParent = $scope.ROOT
//        $('#replace').modal('show')
//    }
    $scope.hideReplaceDialog = function() {
        $('#replace').modal('hide')
    }
    $scope.selectNewParent = function(item) {
        $scope.newParent = item
    }
    $scope.onlyFolders = function(item){
        return item.type == "folder"
    };
    $scope.replace = function () {
        $http({
            url: $scope.contextPath + "/fileBox/rename",
            method: "POST",
            data: {
                "id": $scope.selected.id,
                "name" : $scope.newName
            }
        }).success(function (data, status, headers, config) {
                $('#rename').modal('hide')
                $scope.selected.name = data.name;
            }).error(function (data, status, headers, config) {
                $scope.sharedProperties.error(data.message)
                $('#rename').modal('hide')
                $scope.status = status;
            });
        $('#rename').modal('hide')
    }

    /**
     * Добавление файла в родительский scope
     */
    $scope.addToScope = function(item) {
        $scope.sharedProperties.callFileAddingListener(item)
    }

    $scope.addAllToScope = function() {
        var list = $scope.getCurrentFolderFiles()
        var files = []
        // Список файлов формируем
        for (var i = 0; i < list.length; i++) {
            if (list[i].type != "folder") {
                files.push(list[i])
            }
        }
        for (var i = 0; i < files.length; i++) {
            $scope.sharedProperties.callFileAddingListener(files[i])
        }
    }

    /*******************
     * Перемещение файла
     *******************/

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
    $scope.showReplaceDialog = function() {
        if ($scope.selectedGroup.length == 0) {
            alert("Выберите файлы для перемещения")
            return;
        }
        var modalInstance = $modal.open({
            templateUrl : contextPath +'/fileBox/chose-folder-dialog',
            controller  : 'fileBoxChoseFolderDialogController',
            resolve: fileBoxChoseDialogController.resolve($scope.selectedGroup)
        });

        modalInstance.result.then(function (selectedItem) {
            if (selectedItem.id == $scope.parent.id) {
                $scope.sharedProperties.error("Нельзя перемещать в текущую папку")
            }
            // Подготовим список
            var list = []
            for (var i = 0; i < $scope.selectedGroup.length; i++) {
                list.push({
                    id: $scope.selectedGroup[i].id
                })
            }
            $http({
                url: $scope.sharedProperties.getContextPath()+'/fileBox/replaceButch',
                method: "POST",
                data: {
                    id: selectedItem.id,
                    files: list
                },
                headers: {'Content-Type': 'application/json;charset=UTF-8'}
            }).success(function (data) {
                // Обновим файлы
                for (var i = 0; i < $scope.selectedGroup.length; i++) {
                    $scope.selectedGroup[i].parent = selectedItem.id
                }
                $scope.selectedGroup = []
                $scope.sharedProperties.success("Файлы удачно перенесены")
            }).error(function (data, status) {
                $scope.sharedProperties.error(data.message)
            });


        }, function () {

        });
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
    $scope.showContextMenu = function() {
        $('.context-menu').contextmenu();
    }
}

fileBoxController.resolve = {
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

tutorApp.filter('foldersFirst', function() {
    return function(items, field, reverse) {
        var filtered = [];
        var files = [];
        angular.forEach(items, function(item) {
            if (item.entryFileType && item.entryFileType.type == 'folder') {
                filtered.push(item);
            } else {
                files.push(item);
            }
        });
        angular.forEach(files, function(item) {
            filtered.push(item);
        });
        return filtered;
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