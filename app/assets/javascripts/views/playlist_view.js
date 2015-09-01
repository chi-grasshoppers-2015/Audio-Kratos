var PlaylistView = function(){

};

PlaylistView.prototype = {

  currentlyPlaying:
    function(song){
      $('.current-title').html(song.title);
      $('.current-artist').html(song.artist);
      $('.current-album').html(song.album);
  },

  removeRows:
    function(){
      $('tbody').children().remove();
  },

  updateTable:
    function(songs){
      this.removeRows();
      for(var i = 0; i < songs.length; i++){
        $('tbody').append("<tr><td>"+ (parseInt(i) + 1) +"</td><td><a class='song-link' data-index='"+i+"' href='"+songs[i].url+"'>"+songs[i].title +"</a></td><td>"+ songs[i].artist +"</td><td>"+ songs[i].album +"</td><td>"+ songs[i].track +"</td><td>"+ songs[i].genre +"</td><td>holder</td></tr>")
      }

  },

  updatePlayingRow:
    function(index){
      $("a[data-index="+index+"]").parent().parent().addClass('playing');
  }

};
