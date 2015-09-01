var PlaylistsController = function(model, view){
  this.plModel= model;
  this.plView = view;

  console.log("hey!");
  console.log(this.plModel);
  console.log(this.plView)
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
      console.log(this.plModel.songs);

      var sortKey = $(event.target).html();
      var saniSortKey = sortKey.toLowerCase();
      console.log(saniSortKey);
      this.plModel.songs.sort(this.compareOnKey(saniSortKey))
      console.log(this.plModel.songs);
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
