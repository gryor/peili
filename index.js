var io = require('socket.io')(5048);
var crypto = require ('crypto');
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
		io.sockets.to(msg.room).emit('room.' + msg.room, {
			from: crypto.createHash('sha256').update(socket.id).digest('hex'),
			content: msg.content
		});
		log.info({client: socket.id, broadcast: {
			from: crypto.createHash('sha256').update(socket.id).digest('hex'),
			content: msg.content
		}});
	});
});