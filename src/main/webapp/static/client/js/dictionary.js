angular.module('dictionary', [])
    .directive('dictionary', ['$http', '$modal', function ($http, $modal) {
        function openModal($scope, dictionaryName, target, field, msize) {
            var modalInstance = $modal.open({
                templateUrl : '/client/view/dictionary_'+dictionaryName+'.html',
                controller  : 'dictionaryController',
                size: msize,
                resolve: {
                    items : function($q, $http) {
                        var deferred = $q.defer();

                        $http({method: 'GET', url: '/data/dictionary/'+dictionaryName})
                            .success(function(data) {
                                deferred.resolve(data)
                            })
                            .error(function(data){
                                deferred.resolve("error value");
                            });
                        return deferred.promise;
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                var fields = field.split('.')
                //TODO
                if (fields.length == 1) {
                    target[fields[0]] = selectedItem;
                } else if (fields.length == 2) {
                    target[fields[0]][fields[1]] = selectedItem;
                } else if (fields.length == 3) {
                    target[fields[0]][fields[1]][fields[2]] = selectedItem;
                }

            });
        }
//        return {
//            restrict: 'CA',
//            link: function (scope, element, attrs) {
//                element.bind('click', function (event) {
//                    openModal(scope, attrs.dictionary, attrs.target)
//                });
//            }
//        };

        return function($scope, element, attrs) {
            $scope.$watch(attrs.target, function(target){
                element.bind('click', function (event) {
                    openModal($scope, attrs.dictionary, target, attrs.field, attrs.msize)
                });
            });
        }
    }])
