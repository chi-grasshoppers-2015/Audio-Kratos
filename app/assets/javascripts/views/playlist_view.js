var PlaylistView = function(){

};

PlaylistView.prototype = {

  currentlyPlaying:
    function(song){
      $('.current-title').html(song.title);
      $('.current-artist').html(song.artist);
      $('.current-album').html(song.album);
      $('.current-art').attr("src", song.art)
  },

  removeRows:
    function(){
      $('tbody').children().remove();
  },

  updateTable:
    function(songs){
      this.removeRows();
      for(var i = 0; i < songs.length; i++){
        $('tbody').append("<tr><td class='col-md-1'>"+ (parseInt(i) + 1) +"</td><td class='col-md-3'><a class='song-link' data-index='"+i+"' href='"+songs[i].url+"'>"+songs[i].title +"</a></td><td class='col-md-2'>"+ songs[i].artist +"</td><td class='col-md-3'>"+ songs[i].album +"</td><td class='col-md-1'>"+ songs[i].track +"</td><td class='col-md-2'>"+ songs[i].genre +"</td></tr>")
      }
  },

  updateEventTable:
    function(songs){
      this.removeRows();
      for(var i = 0; i < songs.length; i++){
        $('tbody').append("<tr><td class='col-md-1'></td><td class='col-md-1'></td><td class='col-md-1'>" + songs[i].netVotes + "</td><td class='col-md-3'><a class='song-link' data-index='"+i+"' href='"+songs[i].url+"'>"+songs[i].title +"</a></td><td class='col-md-2'>"+ songs[i].artist +"</td><td class='col-md-3'>"+ songs[i].album +"</td></tr>")
      }
  },

  updatePlayingRow:
    function(index){
      $("a[data-index="+index+"]").parent().parent().addClass('playing');
  }

};
