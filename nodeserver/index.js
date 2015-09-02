var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// app.get('/', function(req, res){
//   res.send('Hello world');
// });

http.listen(3030, function(){
  console.log('listening on *:3030');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    //## only returns first line, makes sense
    // console.log('message: ' + msg);
    // console.log("no emit?")
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

});

// var http = require("http");
// var url = require('url');
// var fs = require('fs');
// var io = require('socket.io');

// var server = http.createServer(function(request, response){
//     console.log('Connection');
//     var path = url.parse(request.url).pathname;

//     switch(path){
//         case '/':
//             response.writeHead(200, {'Content-Type': 'text/html'});
//             response.write('hello world');
//             break;
//         case 'socket.html':
//             fs.readFile(__dirname + path, function(error, data){
//                 if (error){
//                     response.writeHead(404);
//                     response.write("opps this doesn't exist - 404");
//                 }
//                 else{
//                     response.writeHead(200, {"Content-Type": "text/html"});
//                     response.write(data, "utf8");
//                 }
//             });
//             break;
//         default:
//             response.writeHead(404);
//             response.write("opps this doesn't exist - 404");
//             break;
//     }
//     response.end();
// });

// server.listen(3030);

// io.listen(server);