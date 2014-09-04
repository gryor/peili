var io = require('socket.io')(5048);
var bunyan = require('bunyan');
var log = bunyan.createLogger({
	name: 'Peili'
});

io.on('connection', function(socket) {
	log.info('Client ' + socket.id + ' connected');

	socket.on('join', function(room) {
		socket.join(room);
		log.info('Client ' + socket.id + ' joined room ' + room);
	});

	socket.on('leave', function(room) {
		socket.leave(room);
		log.info('Client ' + socket.id + ' left room ' + room);
	});

	socket.on('broadcast', function (msg) {
		io.sockets.to(msg.room, msg.content);
		log.info({client: socket.id, broadcast: msg});
	});
});