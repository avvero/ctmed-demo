function createFolderDialogController($scope, $modalInstance) {
    $scope.ok = function (folderName) {
        if (folderName && /.+/.test(folderName)) {
            $modalInstance.close(folderName);
        } else {
            alert("Введите имя для папки")
        }
    }

}