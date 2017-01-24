(function() {
    function SongPlayer(Fixtures) {
        var SongPlayer = {};
        
        /**
        * @desc Holds the currently playing album object
        * @type {Object}
        */
        var currentAlbum = Fixtures.getAlbum();
        
        /**
        * @desc Holds the curently playing song object
        * @type {Object}
        */
        SongPlayer.currentSong = null;
        // SongPlayer.currentSong.playing = false;
        // can't move it lower, as it is used in setSong
        
        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;
        
        /**
        * @function getSongIndex
        * @desc Returns the index of the given song
        * @param {Object} song
        */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
        
        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                song.playing = null;
            }
            
            currentBuzzObject = new buzz.sound(song.audioURL, {
                formats: ['mp3'],
                preload: true
            });
            
            SongPlayer.currentSong = song;
        }
        
        /**
        * @function playSong
        * @desc Plays the current song using currentBuzzObject and sets the given song object's playing attribute to true
        * @param {Object} song
        */
        vr playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
            // why diff from above here, and not currentSong.playing? (fixed to be equivalent)
        }        
                
        /**
        * @function SongPlayer.play
        * @desc Sets up and plays a new song or unpauses the current song when a play button is clicked
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (currentSong !== song) {
                setSong(song);
                playSong(song);
            }
            else if (currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                    // had only the .play() line and not the song.playing = true line, but I think that's an error, so I used playSong
                }
            }
        };
        
        /**
        * @function SongPlayer.pause
        * @desc Pauses the currently playing song by pausing the currentBuzzObject and setting the given song object's playing attribute to false
        * @param {Object} song
        */
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
            // why pass in a song argument, and not just take for granted currentSong is already what is needed, like is done with currentBuzzObject?
        }
        
        /**
        * @function SongPlayer.previous
        * @desc Moves to playing the next song after stopping the currently playing song; if on first song, stops the song and resets the player
        */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if (currentSongIndex < 0) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        setSong(currentAlbum.songs[0]);
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
    // was this also meant to be updated when injecting Fixtures?
})();