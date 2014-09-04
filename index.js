var io = require('socket.io')(5048);
var crypto = require ('crypto');
var bunyan = require('bunyan');
var log = bunyan.createLogger({
	name: 'Peili'
});

io.on('connection', function(socket) {
	var id = crypto.createHash('sha256').update(socket.id).digest('hex');

	socket.join('id.' + id);

	log.info('Client ' + id + ' connected');

	socket.on('join', function(room) {
		socket.join('room.' + room);
		log.info('Client ' + id + ' joined room ' + room);
	});

	socket.on('leave', function(room) {
		socket.leave('room.' + room);
		log.info('Client ' + id + ' left room ' + room);
	});

	socket.on('broadcast', function (msg) {
		io.sockets.to('room.' + msg.room).emit('room.' + msg.room, {
			from: id,
			content: msg.content
		});

		log.info({client: id, from: id, content: msg.content});
	});

	socket.on('send', function (msg) {
		io.sockets.to('id.' + msg.to).emit('message', {from: id, content: msg.content});
	});

	socket.emit('id', id);
});