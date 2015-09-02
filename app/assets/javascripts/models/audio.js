var AudioPlayer = function(url){
    // document.body.appendChild(this.audio);
}


AudioPlayer.prototype = {
  init:
    function(url){
      this.audio = new Audio();
      this.audio.crossOrigin = "anonymous";
      this.audio.controls = true;
      this.audio.autoplay = false;
      this.audio.src = url;
      $('.controls').html(this.audio);
      this.context = new AudioContext();
      this.source = this.context.createMediaElementSource(this.audio);
      this.analyser = this.context.createAnalyser();
      this.source.connect(this.analyser)
      this.analyser.connect(this.context.destination);

  },

  updateAudioSrc:
    function(url){
      this.context.close().then(this.init(url));
  },

  dataStream:
    function(){
      this.analyser.fftSize = 2048;
      this.frequencyCount = this.analyser.frequencyBinCount
      this.binArray = new Uint8Array(this.analyser.frequencyBinCount);
      this.byteTime = this.analyser.getByteTimeDomainData(this.binArray);
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