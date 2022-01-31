const axios = require('axios');
const { instrument } = require('@socket.io/admin-ui');
const io = require('socket.io')(8900, {
  cors: {
    origin: ['http://localhost:3000', 'https://admin.socket.io'],
  },
});

const gameState = {
  timer: 90,
  previousResult: '',
  currentDay: 0,
  currentPhase: '',
  gameStatus: '',
  phaseResults: [],
  playerInfo: [],
  votes: [],
  wolves: {
    number: 0,
    players: [],
  },
  // host: {},
};

io.on('connection', (socket) => {
  const socketID = socket.id;
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
        socket: socketID,
      },
    };
    console.log(options.data);
    axios(options)
      .then(({ body, status, data }) => {
        console.log(`status: ${status} ${data}`);
        if (data !== 'Error, Bad Username/Password. Check Password') {
          const playerState = {username, player_id: socketID};
          if (gameState.playerInfo.length === 0) {
            playerState.host = true;
            gameState.host = playerState;
          } else {
            playerState.host = false;
          }
          gameState.playerInfo.push(playerState);
          io.emit('login-success', body);
          io.emit('playerInfo-feed', gameState.playerInfo);
          io.emit('playerState-feed', playerState);
        } else {
          io.emit('login-failed', 'Incorrect password!');
        }
        //TODO: add a route for creating player state
      })
      .catch((e) => {
        console.log('Failed connection: ', e);
        io.emit('login-failed', 'Failed to reach server!');
      });
  });

  //host logic
  socket.on('host-send', (messageOrObject) => {
    // change server game state based on host command

    // send game status to all players (including host)
    io.emit('gameStatus-feed', stringOfServerGameStatus);
  });

  // votes logic
  socket.on('vote-send', (whatever) => {
    // Voting logic and changing server game state here

    // if voting logic is finished send updated users array from game state
    io.emit('playerInfo-feed', array);
  });

  // phase change, HEADER update sender, sending an object based on gameState.previousResult, gameState.currentDay and gameState.currentPhase
  // io.emit('header-feed', object);

  //rulesSet sender TODO:
  // io.emit('ruleset-feed', object);

  // living chat logic
  socket.on('living-chat-send', (message) => {
    console.log('socket server recieved message from living:', message);
    io.emit('living-chat-feed', message);
  });

  // ghost chat logic
  socket.on('ghost-chat-send', (message) => {
    console.log('socket server recieved message from ghost:', message);
    io.emit('ghost-chat-feed', message);
  });

  // wolf chat logic
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
