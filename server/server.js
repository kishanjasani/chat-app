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
    socket.on('disconnect', () => {
        console.log('User Disconnected from server');
    });
});
app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Server is listening on ${port} port`)
})