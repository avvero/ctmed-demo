function dashboardPartnerController($scope, model, sharedProperties, $window, $sce, $location) {
    $scope.sharedProperties = sharedProperties
    $scope.user = model.user

    /**
     * VIDEO PLAYER
     * @type {number}
     */
    $scope.currentTime = 0;
    $scope.totalTime = 0;
    $scope.state = null;
    $scope.volume = 1;
    $scope.isCompleted = false;
    $scope.API = null;

    $scope.onPlayerReady = function(API) {
        $scope.API = API;
    };

    $scope.onCompleteVideo = function() {
        $scope.isCompleted = true;
    };

    $scope.onUpdateState = function(state) {
        $scope.state = state;
    };

    $scope.onUpdateTime = function(currentTime, totalTime) {
        $scope.currentTime = currentTime;
        $scope.totalTime = totalTime;
    };

    $scope.onUpdateVolume = function(newVol) {
        $scope.volume = newVol;
    };

    $scope.onUpdateSize = function(width, height) {
        $scope.config.width = width;
        $scope.config.height = height;
    };

    $scope.stretchModes = [
        {label: "None", value: "none"},
        {label: "Fit", value: "fit"},
        {label: "Fill", value: "fill"}
    ];

    $scope.par = function() {
        return new Date().getMilliseconds()
    }

    $scope.config = {
        width: 400,
        height: 200,
        autoHide: true,
        autoHideTime: 3000,
        autoPlay: false,
        responsive: true,
        stretch: $scope.stretchModes[1],
        source: {src: $sce.trustAsResourceUrl("http://www.html5rocks.com/en/tutorials/video/basics/devstories.webm??t=" + $scope.par()), type: "video/mp4"},
        sources: [
            {src: "/video/how_to_use_student.mp4", type: "video/mp4"}
        ],
        transclude: true,
        theme: {
            url: "assets/css/videogular.css",
            playIcon: "&#xe000;",
            pauseIcon: "&#xe001;",
            volumeLevel3Icon: "&#xe002;",
            volumeLevel2Icon: "&#xe003;",
            volumeLevel1Icon: "&#xe004;",
            volumeLevel0Icon: "&#xe005;",
            muteIcon: "&#xe006;",
            enterFullScreenIcon: "&#xe007;",
            exitFullScreenIcon: "&#xe008;"
        },
        plugins: {
            poster: {
                url: "img/how_to_use_student.png"
            }
        }
    };
    if (!$scope.$$phase) $scope.$apply()
}

dashboardPartnerController.resolve = {
    model : function($q, $http) {
        var deferred = $q.defer();

        $http({method: 'GET', url: '/partner/dashboard'})
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