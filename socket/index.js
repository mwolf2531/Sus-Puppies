const io = require('socket.io')(8900, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('user connected with socket id :', socket.id);

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
