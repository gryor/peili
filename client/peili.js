function Peili(options) {
	// location.origin + ':5048/'
	var socket = io.connect();
	var rooms = [];

	socket.on('reconnect', function () {
		rooms.forEach(function (room) {
			join(room);
		});
	});

	if(options.onconnect)
		socket.on('connect', options.onconnect);

	if(options.onreconnect)
		socket.on('reconnect', options.onreconnect);

	if(options.ondisconnect)
		socket.on('disconnect', options.ondisconnect);

	function join(room) {
		socket.emit('join', room);
		rooms.push(room);
	}

	function leave(room) {
		socket.emit('leave', room);

		var index = rooms.indexOf(room);

		if(index === -1)
			return;

		rooms = rooms.slice(0,index).concat(rooms.slice(index+1));
	}

	function emit(room, content) {
		socket.emit('broadcast', {
			room: room,
			content: content
		});
	}

	this.join = join;
	this.leave = leave;
	this.emit = emit;
}
