const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const port = process.env.PORT || 3100;
const publicPath = path.join(__dirname,'../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket)=> {
    console.log('New user connected');
    socket.emit('newMessage', {
        from : 'Admin',
        text: 'welcome to the chat app',
        createAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'new user joined',
        createAt: new Date().getTime()
    });
    // socket.emit('newMessage', {
    //     from: 'server',
    //     text: 'Message from server',
    //     createAt: 123
    // });

    socket.on('createMessage', (message) => {
        console.log(message.from);
        console.log(message.text);
        // io.emit('newMessage', {
        //     from: message.from,
        //     text:message.text,
        //     createAt: new Date().getTime()
        // });
        socket.broadcast.emit('newMessage', {
            from: message.from,
            text: message.text,
            createAt: message.createAt
        }); 
    });

    socket.on('disconnect', () => {
        console.log('User Disconnected from server');
    });
});
app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Server is listening on ${port} port`)
})