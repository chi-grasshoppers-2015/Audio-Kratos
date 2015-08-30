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

  drawRedBeats:
    function(audio){
      var scale = this.canvas.height/255;
      this.drawCanvas('#000')
      var barWidth = (this.canvas.width / audio.frequencyCount) * 7;
      var barHeight;
      var bars = 1000;
      x = 0;
      for(var i = 3; i < audio.frequencyCount; i++) {
        barHeight = Math.floor(audio.binArray[i] * scale);

        this.ctx.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
        this.ctx.fillRect(x,this.canvas.height-barHeight,barWidth,barHeight);
        x += barWidth + 1;
      }
    },

  drawCanoe:
    function(audio){
      this.drawCanvas('#000')
      var scale = this.canvas.height/255;
      var barWidth = (this.canvas.width / audio.frequencyCount) * 1.5;
      var barHeight;
      var x = 0;
      var bars = 400;
      for(var i = 0; i < audio.frequencyCount; i++) {
        barHeight = audio.binArray[i] * scale;

        this.ctx.fillStyle = '#18336d';
        this.ctx.fillRect(x,this.canvas.height-barHeight/2,barWidth,barHeight);
        this.ctx.fillRect(x,0,barWidth,barHeight);
        x += barWidth + 0.5;
      }
    },

  drawOsc:
    function(audio){
      this.drawCanvas("#004737");
      var quarterHeight = this.canvas.height/4;
      this.ctx.strokeStyle = "red";
      this.ctx.lineWidth = 1;

      this.ctx.beginPath();
      this.ctx.moveTo(0,0);
      this.ctx.lineTo(this.canvas.width,0);
      this.ctx.stroke();
      this.ctx.moveTo(0,this.canvas.height);
      this.ctx.lineTo(this.canvas.width,this.canvas.height);
      this.ctx.stroke();
      this.ctx.save();
      this.ctx.strokeStyle = "#006644";
      this.ctx.beginPath();
      this.ctx.setLineDash([5]);
      this.ctx.moveTo(0,quarterHeight);
      this.ctx.lineTo(this.canvas.width,quarterHeight);
      this.ctx.stroke();
      this.ctx.moveTo(0,quarterHeight*3);
      this.ctx.lineTo(this.canvas.width,quarterHeight*3);
      this.ctx.stroke();

      this.ctx.restore();
      this.ctx.beginPath();
      this.ctx.strokeStyle = "orange";
      this.ctx.moveTo(0,quarterHeight*2);
      this.ctx.lineTo(this.canvas.width,quarterHeight*2);
      this.ctx.stroke();

      this.ctx.strokeStyle = "white";
      if (audio.analyser) {
        audio.analyser.getByteTimeDomainData(audio.binArray);
      }

      this.ctx.beginPath();
      this.ctx.lineWidth = 2

      var sliceWidth = this.canvas.width * 1.0 / audio.frequencyCount;
      var x = 0;

      if (!audio.frequencyCount) {
        this.ctx.moveTo(0, this.height/2);
      }

      for (var i = 0; i < audio.frequencyCount; i++) {
        var v = audio.binArray[i] / 128.0;
        var y = v * (this.canvas.height/2);

        if (i === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      this.ctx.lineTo(this.canvas.width, this.canvas.height/2);
      this.ctx.stroke();

    },

    drawKit:
      function(audio){

      },

  drawList:
    function(audio){
      // this.drawRedBeats(audio);
      // this.drawCanoe(audio);
      this.drawOsc(audio);

  }
}
