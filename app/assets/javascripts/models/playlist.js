var Playlist = function(){
  this.URL;
  this.current_index: null;
  this.current_title: null;
  this.current_artist: null;
  this.current_album: null;
  this.current_track: null;
  this.current_genre: null;
};

Playlist.prototype = {

  getURL:
    function(event){
      return $(event.target).attr('href')
  }

}
