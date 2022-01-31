const { instrument } = require('@socket.io/admin-ui');
const io = require('socket.io')(8900, {
  cors: {
    origin: ['http://localhost:3000', 'https://admin.socket.io'],
  },
});

const users = [];

io.on('connection', (socket) => {
  socket.on('join-server', (info) => {
    const user = {
      username,
      id: socket.id,
    };
    users.push(user);
    io.emit('users', users);
  });

  socket.on('living-chat-send', (message) => {
    console.log('socket server recieved message from ghost:', message);
    io.emit('living-chat-feed', message);
  });
  socket.on('ghost-chat-send', (message) => {
    console.log('socket server recieved message from ghost:', message);
    io.emit('ghost-chat-feed', message);
  });
  socket.on('wolf-chat-send', (message) => {
    console.log('socket server recieved message from wolf:', message);
    io.emit('wolf-chat-feed', message);
  });
});

instrument(io, { auth: false });
// how to use socket.io admin ui. ::::
// start up servers in terminal
// go to "admin.socket.io"  in browser
// clear path option in browser and toggle websocket only option on
