const io = require('socket.io')(8900, {
  cors: {
    origin: '*',
  },
});

const array = [];

io.on('connection', (socket) => {
  console.log('user connected with socket id :', socket.id);

  socket.on('living-chat-send', (message) => {
    console.log('socket server recieved message :', message);
    io.emit('living-chat-feed', message);
  });
});
