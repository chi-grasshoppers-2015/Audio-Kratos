var Playlist = function(){
    // this.currentURL = null;
    // this.currentIndex = null;
    // this.currentTitle = null;
    // this.currentArtist = null;
    // this.currentAlbum = null;
    // this.currentTrack = null;
    // this.currentGenre = null;

    this.songs = [];
    this.currentSong = null;
};

Playlist.prototype = {

  createSong:
    function(url, title, artist, album, track, genre){
      song = Song.new(url, title, artist, album, track, genre);

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

      // identify the row that has the song details
      var row = $(event.target).parent().parent();

      // remove the "playing" from existing current played song
      $('.playing').removeClass('playing')

      // assign the "active" class to the row that was clicked
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
