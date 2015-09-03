var PlaylistView = function(){

};

PlaylistView.prototype = {

  currentlyPlaying:
    function(song){
      $('.current-title').html(song.title);
      $('.current-artist').html(song.artist);
      $('.current-album').html(song.album);
      $('.current-art').attr("src", song.album_url)
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



        // <form class="vote-form" id="new_vote" action="/votes" accept-charset="UTF-8" method="post"><input name="utf8" type="hidden" value="&#x2713;" /><input type="hidden" name="authenticity_token" value="MUZBVIgnEGanhbPhBU95PMs64u4UeY2TiYHhbBC3hq5oA5ju6wPgodM9SfvS2CaPznvx9ECnoBMHk88h1saolQ==" />
        //   <input value="2" type="hidden" name="vote[song_id]" id="vote_song_id" />
        //   <input value="1" type="hidden" name="vote[user_id]" id="vote_user_id" />
        //   <input value="1" type="hidden" name="vote[event_id]" id="vote_event_id" />
        //   <input value="1" type="hidden" name="vote[value]" id="vote_value" />
        //   <button name="button" type="submit" class="vote-button">
        //       <i class="fa fa-caret-up fa-2x"></i>
        //   </button>
        // </form>


























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
