var Playlist = function(){
    this.songs = [];
    this.currentSong = null;
};

Playlist.prototype = {

  createSong:
    function(url, title, artist, album, track, genre){
      song = Song.new(url, title, artist, album, track, genre);
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

      // // find the data in the row of the link that was clicked
      // this.currentURL = $(event.target).attr('href');
      // this.currentTitle = $(event.target).html();

      // this.currentAlbum = row.find('.album').html();
      // this.currentArtist = row.find('.artist').html();
      // this.currentTrack = row.find('.track').html();
      // this.currentGenre = row.find('.genre').html();


      // find the index of the row clicked
      var index = $(event.target).attr('data-index');

      // select the corresponding song in the array with choose song
      // set the new current song to this new selected song
      this.currentSong = this.chooseSong(index);

  },

}
