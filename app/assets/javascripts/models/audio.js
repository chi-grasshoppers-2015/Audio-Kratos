var AudioPlayer = function(url){
    this.init(url);
    document.body.appendChild(this.audio);
    this.context = new AudioContext();
    this.source = this.context.createMediaElementSource(this.audio);
    this.analyser = this.context.createAnalyser();
    this.source.connect(this.analyser)
    this.analyser.connect(this.context.destination);
}


AudioPlayer.prototype = {
  init:
    function(url){
      this.audio = new Audio();
      this.audio.src = url;
      this.audio.crossOrigin = "anonymous";
      this.audio.controls = true;
      this.audio.autoplay = false;

  },

  dataStream:
    function(){
      this.fftSize = 256;
      this.frequencyCount = this.analyser.frequencyBinCount
      this.binArray = new Uint8Array(this.analyser.frequencyBinCount);
      this.freqData = this.analyser.getByteFrequencyData(this.binArray);

  },

  fetch:
    function() {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', this.url, true);
      xhr.responseType = 'arraybuffer';
      xhr.onload =
        function() {
          this.decode(xhr.response);
          }.bind(this);
          xhr.send();
  },

  decode:
    function( arrayBuffer ) {
      this.ac.decodeAudioData(arrayBuffer, function( audioBuffer ) {
        this.buffer = audioBuffer;
        console.log(this.buffer)
      }.bind(this));
  }

}

