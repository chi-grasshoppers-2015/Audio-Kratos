var PlaylistsController = function(model, view){
  this.plModel= model;
  this.plView = view;

};

PlaylistsController.prototype = {
  init:
    function() {
      this.bindEvents();
  },

  bindEvents:
    function(){
      $('thead').on('click', 'th a', this.columnSort.bind(this));
      $('table').on('click','.vote-button', this.updateTablebyVotes.bind(this));
  },

  updateTablebyVotes:
    function(event){
      event.preventDefault();
      console.log("made it into the js vote section")

      this.plModel.songs.sort(this.compareOnKey("netVotes"))
      this.plView.updateEventTable(this.plModel.songs);
      this.plView.updatePlayingRow(this.plModel.currentSongIndex());
  },

  columnSort:
    function(event){
      event.preventDefault();
      var sortKey = $(event.target).html();
      var saniSortKey = sortKey.toLowerCase();
      this.plModel.songs.sort(this.compareOnKey(saniSortKey))
      this.plView.updateTable(this.plModel.songs);

      this.plView.updatePlayingRow(this.plModel.currentSongIndex());

  },

  compareOnKey:
    function(key){
      return function(a,b) {
        if (a[key] < b[key])
          return -1;
        if (a[key] > b[key])
          return 1;
        return 0;
      }
  }

}
