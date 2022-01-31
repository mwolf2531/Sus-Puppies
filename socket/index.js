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
  socket.on('login', ({ userName, password }) => {
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

socket.on('phase-change', () => {
  //Phase Change
  //0. Build Variables
  let numWolves = 0;
  let numVillagers = 0;
  for (let i = 0; i < gameState.users.length; i++) {
    if (gameState.users[i].role === 'wolf') {
      numWolves++;
    } else if (gameState.users[i].role === 'villager') {
      //This If statement would include || seer || healer if added
      numVillagers++;
    }
  }
  let numLiving = numWolves + numVillagers;

  //1. Tally Votes
  if (gameState.currentPhase === 'day') {
    let votes = {};
    //Villager Vote Logic
    for (let i = 0; i < gameState.votes.length; i++) {
      if (votes[gameState.votes[i][1]]) {
        votes[gameState.votes[i][1]]++;
      } else {
        votes[gameState.votes[i][1]] = 1;
      }
    }
    let voteKeys = Object.keys(votes);
    let maxVotes = -1;
    let victim = '';
    let majority = Math.round(numLiving / 2);
    for (let i = 0; i < voteKeys.length; i++) {
      if (votes[voteKeys[i]] > maxVotes) {
        victim = voteKeys[i];
        maxVotes = votes[voteKeys[i]];
      }
    }
    if (maxVotes >== majority) {
    //Hang Victim Wolf
  if (gameState.users[victim].role === 'wolf') {
    gameState.users[victim].role = 'deadWolf';
    numWolves--;
    gameState.phaseResults.push([gameState.currentDay, gameState.currentPhase, victim]);
  } else {
    //Hang Other Victim
    gameState.users[victim].role = 'deadVillager';
    numVillagers--;
    gameState.phaseResults.push([gameState.currentDay, gameState.currentPhase, victim]);
  }
}
  } else {
  //Wolf Vote Logic
  for (let i = 0; i < gameState.votes.length; i++) {
    if (votes[gameState.votes[i][1]]) {
      votes[gameState.votes[i][1]]++;
    } else {
      votes[gameState.votes[i][1]] = 1;
    }
  }
  let voteKeys = Object.keys(votes);
  let maxVotes = -1;
  let victim = '';
  for (let i = 0; i < voteKeys.length; i++) {
    if (votes[voteKeys[i]] > maxVotes) {
      victim = voteKeys[i];
      maxVotes = votes[voteKeys[i]];
    } else if (votes[voteKeys[i]] === maxVotes) {
      let coinFlip = (Math.floor(Math.random() * 2) == 0);
      if (coinFlip) {
        victim = voteKeys[i];
      }
    }
  }
  gameState.users[victim].role = 'deadVillager';
  numVillagers--;
  gameState.phaseResults.push([gameState.currentDay, gameState.currentPhase, victim]);
}

//2. Check if game has ended
if (numWolves === 0) {
  console.log('Wolves win');
} else (if wolves >== numVillagers) {
  console.log('Wolves Win');
} else
//3. Game Continues
if (gameState.currentPhase === 'day') {
  gameState.currentPhase = 'night';
} else {
  gameState.currentPhase = 'day';
  gameState.currentDay++;
}
});