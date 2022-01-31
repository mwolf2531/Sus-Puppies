const axios = require('axios');

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
  socket.on('login', ({userName, password}) => {
    console.log(`Login attempt: userName ${userName} password: ${password}`);
    // TODO: login logic~
    const options = {
      url: '/login',
      method: 'post',
      baseURL: 'http://localhost:3000',
      data: {
        userName,
        password,
        socket: socket.id,
      },
    };
    console.log(options.data);
    axios(options)
    .then((res) => {
      console.log(`status: ${res.status} ${res.body}`);
      io.emit('login-success', res.body);
      //TODO: add a route for creating player state
    })
    .catch((e) => {
      console.log('Failed connection: ', e);
      io.emit('login-failed');
    });

  });
});
