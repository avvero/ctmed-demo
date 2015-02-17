angular.module('lingua', [])
    .factory('audio', ['$document', function($document) {
        var audioElement = $document[0].createElement('audio'); // <-- Magic trick here
        var track = {};
        return {
            audioElement: audioElement,
            isPlaying: false,
            updatePlaying: function(val) {
                this.isPlaying = val
            },
            playing: function() {
                return this.isPlaying
            },
            _play: function(filename) {
                audioElement.src = filename;
                audioElement.play();     //  <-- Thats all you need
                this.updatePlaying(!this.isPlaying)
            },
            play: function() {
                audioElement.play();     //  <-- Thats all you need
                this.updatePlaying(true)
                track.state = 'play'
            },
            pause: function() {
                audioElement.pause();     //  <-- Thats all you need
                this.updatePlaying(false)
                track.state = 'pause'
            },
            playPause: function() {
                if (this.isPlaying) {
                    audioElement.pause(false);     //  <-- Thats all you need
                } else {
                    audioElement.play(true);     //  <-- Thats all you need
                }
                this.updatePlaying(!this.isPlaying)
            },
            getTrack: function(){
                return track
            },
            reload: function(filename, name) {
//            audioElement.pause()
                audioElement.src = filename;
                track.name = name;
            }
            // Exersise for the reader - extend this service to include other functions
            // like pausing, etc, etc.

        }
    }])
