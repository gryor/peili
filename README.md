Peili
=======
Peili allows socket.io clients to join and leave rooms, and broadcast messages
in specific rooms.

Example
=======
```node
var p = new Peili({host: location.origin + ':5048/'});
p.join('test', function(data) {console.log(data)});
p.emit('test', 'Hello World!');

Hello World!
```