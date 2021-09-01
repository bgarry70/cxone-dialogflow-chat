const express = require('express');
const socket = require('socket.io');
const bodyParser = require("body-parser");
const app = express();
const server = app.listen(80, () => {
    console.log('Server Started..');
});



app.use(express.static('public'));
const io = socket(server);

app.use(bodyParser.json());

app.post("/now", function(request, response) {
response.send('hello world')  
console.log(request.body);
var test = { message: 'dsada', handle: 'eddie' }
io.sockets.emit('chat', test);

});



io.on('connection', (socket) => {
    console.log('socket connected..', socket.id);

    socket.on('chat', (data) => {console.log(data);
        io.sockets.emit('chat', data);
    });

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    });
});

