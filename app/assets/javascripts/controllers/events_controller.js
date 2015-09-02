var EventsController = function (id){
  this.eventId = id
  this.canvas = new Canvas(this.minimizeDimensions());
};

EventsController.prototype = {
  init:
    function() {
      this.bindEvents();
      this.audio = new AudioPlayer();
      this.playlist = new Playlist();
      this.playlistView = new PlaylistView();
      setInterval(this.conduct.bind(this), 17)
  },

  bindEvents:
    function(){
      window.addEventListener('resize', this.resetCanvas.bind(this));
      // window.addEventListener('orientationchange', this.resetCanvas.bind(this))

      $(document).on('mousemove', this.mouse);
      $(document).on('click', "canvas", this.handleEnd.bind(this));
      $(document).on('touchstart', "canvas", this.handleStart.bind(this));
      $(document).on('touchend', "canvas", this.handleEsc.bind(this));
      $(".more-controls").on("click", 'a.forward', this.nextSong.bind(this));
      $(".visual-control").on("click", 'a.change', this.changeTheme.bind(this));

      // $(document).on('keyup', this.handleEnd.bind(this))
      $(document).on('click', 'a.song-link', this.updateSong.bind(this));
      document.addEventListener('ended', this.nextSong.bind(this), true);
      // document.addEventListener("webkitfullscreenchange", this.fullScreenHandle.bind(this));
  },

  loadSongs:
    function(songs){
      this.playlist.songs = [];
      for(var i=0; i < songs.length; i++){
        song = new Song(  songs[i].id,
                          songs[i].s3_url,
                          songs[i].title,
                          songs[i].artist,
                          songs[i].album,
                          songs[i].track,
                          songs[i].genre,
                          songs[i].album_url,
                          songs[i].net_votes
                        )

        this.playlist.songs.push(song)
      }
  },

  loadFromTable:
    function(){

      // identify the table in the Dom

      // loop through the table to pull the data from each


    },


  updateSong:
    function(event){
      this.playlist.changeSong(event);
      this.playlistView.currentlyPlaying(this.playlist.currentSong);
      this.addAudioSrc(this.playlist.currentSong.url);
      this.ajaxUpdateCurrent(this.playlist.currentSong.id)
      $("audio").trigger("play");
  },

  ajaxUpdateCurrent:
    function(id){
      var currentSong = {"event": {"current_song_id": id}}
      var url = "/events/" + this.eventId

      var newSongOrder;
      var token = $('meta[name="csrf-token"]').attr("content")

      var request = $.ajax({
        // dataType: "json",
        type: "PUT",
        url: url,
        data: (currentSong),
        headers: {
          'X-CSRF-Token': token
        }
      })

      var self = this;
      request.done(function(response) {
        $('tbody').html(response["attachmentPartial"])
        newSongOrder = response["songs"]
        console.log("done")
        self.loadSongs(newSongOrder);
      })
  },

  nextSong:
    function(event){
      event.preventDefault();
      $("a[data-index="+(parseInt(this.playlist.currentSongIndex())+2)+"]").click();
     $("audio").trigger("play");
  },

  prevSong:
    function(event){
      event.preventDefault();
      $("a[data-index="+(parseInt(this.playlist.currentSongIndex())-1)+"]").click();
      $("audio").trigger("play");
  },

  changeTheme:
    function(){
      event.preventDefault();
      this.canvas.changeTheme();
    },

  addAudioSrc:
    function(url) {
      if(this.audio.context){
        this.audio.updateAudioSrc(url);
      }
      else {
      this.audio.init(url);
      };
  },

  resetCanvas:
    function(event){
      if (this.canvas.maximize) {
        this.canvas.update(this.maximizeDimensions());
      }
      else {
        this.canvas.update(this.minimizeDimensions());
      }
  },

  fullScreenHandle:
    function(){
      if (this.canvas.maximize){
        document.webkitExitFullscreen();
        this.canvas.update(this.minimizeDimensions())
      }
    },

  mouse:
    function(mouse){
      mouseX = mouse.clientX;
      mouseY = mouse.clientY;
  },

  minimizeDimensions:
    function(){
      return { height: Math.floor(window.innerHeight * 0.50),
               width:  Math.floor(window.innerWidth * 0.70) }
  },

  maximizeDimensions:
    function(){
      return { height: window.innerHeight,
               width:  window.innerWidth }
  },

  handleStart:
    function(event){
      event.preventDefault();
      this.canvas.touch = true;
  },

  handleEnd:
    function(event){
      if (this.canvas.maximize) {
        this.canvas.maximize = false;
        document.webkitExitFullscreen();
        this.canvas.update(this.minimizeDimensions())
      }
      else {
        this.canvas.maximize = true;
        $(".viewer").get(0).webkitRequestFullscreen();
        this.canvas.update(this.maximizeDimensions())
      }
  },

  handleEsc:
    function(event){
      if(event.keyCode == 27 && this.canvas.maximize) {
        this.handleEnd
      }
  },

  conduct:
    function(){
      this.audio.dataStream();
      this.canvas.drawList(this.audio);
  }

}
