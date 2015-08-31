var Playlist = function(){
    this.currentURL = null;
    this.currentIndex = null;
    this.currentTitle = null;
    this.currentArtist = null;
    this.currentAlbum = null;
    this.currentTrack = null;
    this.currentGenre = null;

    this.songs = [];
    this.currentSong = null;
};

Playlist.prototype = {

  createSong:
    function(url, title, artist, album, track, genre){
      song = Song.new(url, title, artist, album, track, genre);

  },

  changeSong:
    function(event){
      event.preventDefault();

      // identify the row that has the song details
      var row = $(event.target).parent().parent();
      console.log("row");
      console.log(row);
      // remove the "playing" from existing current played song
      $('.playing').removeClass('playing')

      // assign the "active" class to the row that was clicked
      row.addClass('playing');

      // find the data in the row of the link that was clicked
      this.currentURL = $(event.target).attr('href');
      this.currentIndex = $(event.target).attr('data-index');
      this.currentTitle = $(event.target).html();

      this.currentAlbum = row.find('.album').html();
      this.currentArtist = row.find('.artist').html();
      this.currentTrack = row.find('.track').html();
      this.currentGenre = row.find('.genre').html();

      console.log(this.currentAlbum);
      console.log(this.currentIndex);
  },

}
