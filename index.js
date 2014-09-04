var io = require('socket.io')(5048);
var bunyan = require('bunyan');
var log = bunyan.createLogger({
	name: 'Peili'
});

io.on('connection', function(socket) {
	socket.on('join', function(room) {
		socket.join(room);
	});

	socket.on('leave', function(room) {
		socket.leave(room);
	});

	socket.on('broadcast', function (msg) {
		io.sockets.to(msg.room, msg.content);
	});
});