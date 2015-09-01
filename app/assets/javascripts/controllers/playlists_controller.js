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
