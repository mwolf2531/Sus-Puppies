const axios = require('axios');
const { instrument } = require('@socket.io/admin-ui');
const io = require('socket.io')(8900, {
  cors: {
    origin: ['http://localhost:3000', 'https://admin.socket.io'],
  },
});

var gameState = {
  timer: 90,
  previousResult: '',
  currentDay: 0,
  currentPhase: '',
  gameStatus: '',
  phaseResults: [],
  users: [],
  votes: [],
  wolves: {
    number: 0,
    players: [],
  },
  host: {},
};

io.on('connection', (socket) => {
  socket.on('login', ({ username, password }) => {
    console.log(`Login attempt: userName ${username} password: ${password}`);
    // TODO: login logic~
    const options = {
      url: '/login',
      method: 'post',
      baseURL: 'http://localhost:3000',
      data: {
        username,
        password,
        socket: socket.id,
      },
    };
    console.log(options.data);
    axios(options)
      .then((res) => {
        console.log(`status: ${res.status} ${res.data}`);
        if (res.data !== "Error, Bad Username/Password. Check Password"){
          io.emit('login-success', res.body);
        } else {
          io.emit('login-failed', 'Incorrect password!')
        }
        //TODO: add a route for creating player state
      })
      .catch((e) => {
        console.log('Failed connection: ', e);
        io.emit('login-failed', 'Failed to reach server!');
      });
  });

  socket.on('living-chat-send', (message) => {
    console.log('socket server recieved message from living:', message);
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
