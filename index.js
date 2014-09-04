var io = require('socket.io')(5048);
var bunyan = require('bunyan');
var log = bunyan.createLogger({
	name: 'Peili'
});

io.on('connection', function(socket) {
	log.info('Client connected');

	socket.on('join', function(room) {
		socket.join(room);
		log.info('Client joined room ' + room);
	});

	socket.on('leave', function(room) {
		socket.leave(room);
		log.info('Client left room ' + room);
	});

	socket.on('broadcast', function (msg) {
		io.sockets.to(msg.room, msg.content);
		log.info({broadcast: msg});
	});
});