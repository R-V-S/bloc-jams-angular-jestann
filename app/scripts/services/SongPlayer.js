(function() {
    function SongPlayer() {
        var SongPlayer = {};
        
        /**
        * @desc Holds the curently playing song object
        * @type {Object}
        */
        var currentSong = null;
        
        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;
        
        
        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                currentSong.playing = null;
            }
            
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            currentSong = song;
        }
        
        /**
        * @function playSong
        * @desc Plays the current song using currentBuzzObject and sets the given song object's playing attribute to true
        * @param {Object} song
        */
        vr playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
            // why diff from above here, and not currentSong.playing?
        }        
        
        
        /**
        * @function SongPlayer.play
        * @desc Sets up and plays a new song or unpauses the current song when a play button is clicked
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
            if (currentSong !== song) {
                setSong(song);
                playSong(song);
            }
            else if (currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                    // had only the .play() line and not the song.playing = true line, but I think that's an error.
                }
            }
        };
        
        /**
        * @function SongPlayer.pause
        * @desc Pauses the currently playing song by pausing the currentBuzzObject and setting the given song object's playing attribute to false
        * @param {Object} song
        */
        SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
            // why pass in a song argument, and not just take for granted currentSong is already what is needed, like is done with currentBuzzObject?
        }
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();