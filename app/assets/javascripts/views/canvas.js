var Canvas = function(dimensions){
  this.touch = false;
  this.maximize = false;
  this.update(dimensions);
}

Canvas.prototype = {

  update:
    function(dimensions){
      console.log("touch")
      this.canvas = document.createElement("canvas");
      this.canvas.setAttribute('width', dimensions.width);
      this.canvas.setAttribute('height', dimensions.height);
      this.ctx = this.canvas.getContext('2d');
      this.addCanvas();
  },

  addCanvas:
    function(){
      $(".viewer").html(this.canvas)
  },


  drawCanvas:
    function(color){
      this.ctx.fillStyle = color;
      this.ctx.fillRect(0,0, this.canvas.width, this.canvas.height);

  },

  drawMaximizer:
    function(){
      var x1 = this.canvas.width - 50
      var y1 = this.canvas.height - 50
      var x2 = this.canvas.width - 20
      var y2 = this.canvas.height - 20
      this.ctx.fillStyle = "white";
      this.ctx.fillRect( x1, y1, 5, 20)
      this.ctx.fillRect( x1, y1, 20, 5)
      this.ctx.fillRect( x2, y2, -5, -20)
      this.ctx.fillRect( x2, y2, -20, -5)
    },

  withinMaximizer:
    function(touchCoord){
      console.log(touchCoord)
      xmin = this.canvas.width - 50;
      ymin = this.canvas.height - 50;
      xmax = this.canvas.width - 20;
      ymax = this.canvas.height - 20;
      console.log(xmin, ymin, xmax, ymax)

      if( touchCoord.x >= xmin &&
          touchCoord.x <= xmax &&
          touchCoord.y >= ymin &&
          touchCoord.y <= ymax)
        return true
      else {
        return false
      }
    },

  drawRedBeats:
    function(audio){
      this.drawCanvas('#000')
      var barWidth = (this.canvas.width / audio.frequencyCount) * 7;
      var barHeight;
      var x = 0;
      var bars = 1000;
      for(var i = 0; i < audio.frequencyCount; i++) {
        barHeight = audio.binArray[i];

        this.ctx.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
        this.ctx.fillRect(x,this.canvas.height-barHeight,barWidth,barHeight);
        x += barWidth + 1;
      }
    },

  drawCanoe:
    function(audio){
      this.drawCanvas('#000')
      var barWidth = (this.canvas.width / audio.frequencyCount) * 1.5;
      var barHeight;
      var x = 0;
      var bars = 400;
      for(var i = 0; i < audio.frequencyCount; i++) {
        barHeight = audio.binArray[i];

        this.ctx.fillStyle = '#18336d';
        this.ctx.fillRect(x,this.canvas.height-barHeight/2,barWidth,barHeight);
        this.ctx.fillRect(x,0,barWidth,barHeight);
        x += barWidth + 0.5;
      }
    },

  drawList:
    function(audio){
      // this.drawMaximizer();
      // this.drawRedBeats(audio)
      this.drawCanoe(audio);

  }
}
