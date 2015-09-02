var WebSocket = function (){
	this.socket = io.connect('localhost:3030')
	this.socket.on('tableUpdate', this.tableUpdate())
};

WebSocket.prototype = {
  init:
    function() {
      this.bindEvents();

  },

  bindEvents:
  	function(){
  		// Voting events bound here
  		// $(document).on('click', #votebuttonup, this.upVoteSocket.bind(this));
  		// $(document).on('click', #votebuttondown, this.downVoteSocket.bind(this));
  },

  upVoteSocket:
  	function(){
  		// ajax to update database and rerender table
  		this.socket.emit('upVoteClick', 'user has made an upvote!')
  },

  downVoteSocket:
  	function(){

  },

  tableUpdate:
  	function(){

  },


}