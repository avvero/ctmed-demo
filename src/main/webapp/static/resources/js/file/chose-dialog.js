function fileBoxChoseDialogController($scope, fileUploader, $modalInstance, options, params, sharedProperties) {
    $scope.sharedProperties = sharedProperties

    /*******************
     * Загрузка файлов
     *******************/
    $scope.wrapParent = function() {
        return $scope.parent.id == null ? "0" : $scope.parent.id
    }

    $scope.uploader = fileUploader
    $scope.params = params


    $scope.fileQueue = []
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
        $scope.uploader.addToQueue($scope.fileQueue, options);
        $scope.uploader.uploadAll()
        $scope.hideUploadDialog()
    }

    $scope.wrapParent = function() {
        return $scope.parent.id == null ? "0" : $scope.parent.id
    }

    $scope.ok = function () {
        $scope.sharedProperties.success("Началась загрузка файлов...")
        $scope.uploadAll()
        $modalInstance.close();
    }

}