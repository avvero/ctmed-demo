angular.module('lingua-file', ['angularFileUpload'])
    .factory('fileUploader', ['$fileUploader', function($fileUploader) {
        // create a uploader with options
        var uploader = $fileUploader.create({
            removeAfterUpload: true
        });

        // REGISTER HANDLERS

        uploader.bind('afteraddingfile', function (event, item) {
//            console.info('After adding a file', item);
        });

        uploader.bind('whenaddingfilefailed', function (event, item) {
//            console.info('When adding a file failed', item);
        });

        uploader.bind('afteraddingall', function (event, items) {
//            console.info('After adding all files', items);
        });

        uploader.bind('beforeupload', function (event, item) {
//            console.info('Before upload', item);
        });

        uploader.bind('progress', function (event, item, progress) {
//            console.info('Progress: ' + progress, item);
        });

        uploader.bind('success', function (event, xhr, item, response) {
            if (item.onSuccess) {
                item.onSuccess(item, response)
            }
        });

        uploader.bind('cancel', function (event, xhr, item) {
//            console.info('Cancel', xhr, item);
        });

        uploader.bind('error', function (event, xhr, item, response) {
            if (item.onError) {
                item.onError(item, response)
            }
        });

        uploader.bind('complete', function (event, xhr, item, response) {
//            console.info('Complete', xhr, item, response);
        });

        uploader.bind('progressall', function (event, progress) {
//            console.info('Total progress: ' + progress);
        });

        uploader.bind('completeall', function (event, items) {
//            console.info('Complete all', items);
        });
        return uploader
    }])
    .directive('ngFileChoose', [ '$parse', '$http', '$timeout', function($parse, $http, $timeout) {
        return function(scope, elem, attr) {
            var fn = $parse(attr['ngFileChoose']);
            elem.bind('change', function(evt) {
                var files = [], fileList, i;
                fileList = evt.target.files;
                if (fileList != null) {
                    for (i = 0; i < fileList.length; i++) {
                        files.push(fileList.item(i));
                    }
                }
                $timeout(function() {
                    fn(scope, {
                        $files : files,
                        $event : evt
                    });
                });
            });
            elem.bind('click', function(){
                this.value = null;
            });
        };
    } ]);
