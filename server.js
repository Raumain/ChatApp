const io = require('socket.io')(3000, {
    cors: {
      origin: "*",
    },
  });

const users = {};

io.on('connection', socket => {
    socket.on('new-user', namE =>{
        users[socket.id] = namE;
        socket.broadcast.emit('user-connected', namE);
    })
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', {message: message, name: users[socket.id]});
    });
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id]);
        delete users[socket.id];
    });
});

