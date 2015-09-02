var Playlist = function(){
    this.songs = [];
    this.currentSong = null;
};

Playlist.prototype = {

  createSong:
    function(url, title, artist, album, track, genre, art, netVotes){
      song = Song.new(url, title, artist, album, track, genre, art, netVotes);
  },

  currentSongIndex:
    function(){
      return this.songs.indexOf(this.currentSong)
  },

  chooseSong:
    function(index){
      return this.songs[index];
  },

  findNextSong:
    function(){
  },

  changeSong:
    function(event){
      event.preventDefault();

      var row = $(event.target).parent().parent();

      $('.playing').removeClass('playing')

      row.addClass('playing');

      var index = $(event.target).attr('data-index');

      // select the corresponding song in the array with choose song
      // set the new current song to this new selected song
      this.currentSong = this.chooseSong(index);

  },




}
