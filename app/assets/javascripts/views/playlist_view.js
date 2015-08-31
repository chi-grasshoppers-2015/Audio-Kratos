var PlaylistView = function(){

};

PlaylistView.prototype = {

  currentlyPlaying:
    function(song){
      $('.current-title').html(song.title);
      $('.current-artist').html(song.artist);
      $('.current-album').html(song.album);
  }

};
