var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// app.get('/', function(req, res){
//   res.send('Hello world');
// });
var users = []
http.listen(3030, function(){
  console.log('listening on *:3030');
});

io.on('connection', function(socket){
  console.log('a user connected');
  users.push("user")
  console.log("current count:" + users.length)
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    //## only returns first line, makes sense
    // console.log('message: ' + msg);
    // console.log("no emit?")
  });

  socket.on('ajaxsend', function(msg){
  	console.log(msg)
  	io.emit('ajaxreturn', "Ajax Returned")
  })





  socket.on('disconnect', function(){
    console.log('user disconnected');
    users.pop()
  	console.log("current count:" + users.length)
  });

});

