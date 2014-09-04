function Peili(options) {
	// location.origin + ':5048/'
	var socket = io.connect(options.host);
	var rooms = {};

	socket.on('reconnect', function () {
		for(room in rooms)
			socket.emit('join', room);
	});

	if(options.onconnect)
		socket.on('connect', options.onconnect);

	if(options.onreconnect)
		socket.on('reconnect', options.onreconnect);

	if(options.ondisconnect)
		socket.on('disconnect', options.ondisconnect);

	function join(room, callback) {
		rooms[room] = callback;
		socket.emit('join', room);
		socket.on('room.' + room, rooms[room]);
	}

	function leave(room) {
		if(rooms[room]) {
			socket.removeListener('room.' + room, rooms[room]);
			delete rooms[room];
		}

		socket.emit('leave', room);
	}

	function emit(room, content) {
		socket.emit('broadcast', {room: room, content: content});
	}

	this.join = join;
	this.leave = leave;
	this.emit = emit;
}
