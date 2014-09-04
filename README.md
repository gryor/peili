Peili
=======
Peili allows socket.io clients to join and leave rooms, and broadcast messages
in specific rooms.

Example
=======
```javascript
var p = new Peili({host: location.origin + ':5048/', onmessage: function(data) {console.log(data);}});
p.join('test', function(data) {console.log(data);});
p.broadcast('test', 'Hello World!');
p.send('<client id>', 'Hello You'); // Own id is p.id

{from: <client id>, content: 'Hello World!'}
{from: <client id>, content: 'Hello You!'}
```