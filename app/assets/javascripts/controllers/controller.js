var Controller = function (){
  this.canvas = new Canvas(this.minimizeDimensions());
};

Controller.prototype = {
  init:
    function() {
      this.bindEvents();
      this.audio = new AudioPlayer();
      this.playlist = new Playlist();
      setInterval(this.conduct.bind(this), 17)
      $('a.song-link').first().click();
      $("audio").trigger("pause");
    },

  bindEvents:
    function(){
      window.addEventListener('resize', this.resetCanvas.bind(this));
      // window.addEventListener('orientationchange', this.resetCanvas.bind(this))

      $(document).on('mousemove', this.mouse);
      $(document).on('click', "canvas", this.handleEnd.bind(this));
      $(document).on('touchstart', "canvas", this.handleStart.bind(this));
      $(document).on('touchend', "canvas", this.handleEnd.bind(this));
      $(document).on('click', 'a.song-link', this.updateSong.bind(this));
      document.addEventListener('ended', this.nextSong.bind(this), true);
  },

  loadSongs:
    function(songs){
      for(var i=0; i < songs.length; i++){
        song = new Song(  songs[i].s3_url,
                          songs[i].title,
                          songs[i].artist,
                          songs[i].album,
                          songs[i].track,
                          songs[i].genre
                        )

        this.playlist.songs.push(song)
      }

      console.log(this.playlist.songs);
  },

  updateSong:
    function(event){
      this.playlist.changeSong(event);
      this.addAudioSrc(this.playlist.currentURL);
      $("audio").trigger("play");
  },

  nextSong:
    function(event){
      console.log("made it into audio ended");
      $("a[data-index="+(parseInt(this.playlist.currentIndex)+1)+"]").click();
      $("audio").trigger("play");
  },

  addAudioSrc:
    function(url) {
      this.audio.init(url);
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
      this.canvas.touch = false;
      if (this.canvas.maximize) {
        this.canvas.maximize = false;
        this.canvas.update(this.minimizeDimensions())
      }
      else {
        this.canvas.maximize = true;
        this.canvas.update(this.maximizeDimensions())
      }
  },

  conduct:
    function(){
      this.audio.dataStream();
      this.canvas.drawList(this.audio);
  }

}
