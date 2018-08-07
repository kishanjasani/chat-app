var socket = io(); //this create an connection
// console.log(socket);
socket.on('connect', ()=> {
    console.log('Connected to server');
    // socket.emit('createMessage', {
    //     from:'Kishan',
    //     text:'yup, its work for me'
    // });
});

 socket.on('disconnect', () => {
     console.log('Disconnected from server');
 });

 socket.on('newMessage', (message)=> {
    console.log('newMessage', message);
 });