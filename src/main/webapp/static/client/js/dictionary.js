angular.module('dictionary', [])
    .directive('dictionary', ['$http', '$modal', function ($http, $modal) {
        function openModal($scope, dictionaryName, target) {
            var modalInstance = $modal.open({
                templateUrl : '/client/view/dictionary_'+dictionaryName+'.html',
                controller  : 'dictionaryController',
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
                target.name = selectedItem.name;
            });
        }
        return {
            restrict: 'CA',
            link: function (scope, element, attrs) {
                element.bind('click', function (event) {
                    openModal(scope, attrs.dictionary, attrs.target)
                });

            }
        };
    }])
