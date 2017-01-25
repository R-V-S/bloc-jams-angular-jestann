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
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
            // why diff from above here, and not currentSong.playing? (fixed to be equivalent)
        }
        
        var stopSong = function(song) {
            currentBuzzObject.stop();
            song.playing = null;
        }
                
        /**
        * @function SongPlayer.play
        * @desc Sets up and plays a new song or unpauses the current song when a play button is clicked
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
            }
            else if (SongPlayer.currentSong === song) {
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
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            if (currentSongIndex < 0) {
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        }
        
        // It seems like there is a need to at some point set the initial current song and set the .playing property to be false, otherwise my play and pause buttons both display 
        setSong(currentAlbum.songs[0]);
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
    // was this also meant to be updated when injecting Fixtures?
})();