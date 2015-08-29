var Controller = function (){

};

Controller.prototype = {
  init:
    function(url) {
      this.bindEvents();
      this.canvas = new Canvas(this.minimizeDimensions());
      this.audio = new AudioPlayer(url);
      setInterval(this.conduct.bind(this), 17)
    },

  bindEvents:
    function(){
      window.addEventListener('resize', this.resetCanvas.bind(this))
      // window.addEventListener('orientationchange', this.resetCanvas.bind(this))
      $(document).on('mousemove', this.mouse)
      $(document).on('click', "canvas", this.handleEnd.bind(this))
      $(document).on('touchstart', "canvas", this.handleStart.bind(this))
      $(document).on('touchend', "canvas", this.handleEnd.bind(this))
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
