const axios = require('axios');
const { instrument } = require('@socket.io/admin-ui');
const io = require('socket.io')(8900, {
  cors: {
    origin: ['http://localhost:3000', 'https://admin.socket.io'],
  },
});

const gameState = {
  timer: 90,
  initTimer: 90,
  previousResult: 'Welcome to SusPuppies',
  currentDay: 0,
  currentPhase: 'day',
  phaseResults: [],
  playerInfo: [],
  gameStatus: 'setup',
  votes: [],
  initWolves: 1,
  wolves: {
    number: 0,
    players: [],
  },
  host: {},
};
/**
 * CountDown will decrement the timer property in the reference object and pass the result to the callback including 0.
 * This class has four methods. start, stop, countdown, and newCountDown
 * Only call start, stop, and newCountDown.
 * @param {object} objectReference This should be gameState. Otherwise object must have timer and initTimer properties with int values.
 * @param {function} cb Will be passed the new decremented timer value.
 * Example: timer === 90 -> cb(89). cb will never recieve 90 but will recieve 0
 * cb is not provided then default behavior will return timer value and update object.
 * @return {object} Returns new instance of CountDown.
 */
class CountDown {
  constructor(objectReference = gameState, cb = (time) => time) {
    this.gameState = objectReference;
    this.countDownReference;
    this.cb = cb;
    this.isCounting = false;
    this.countdown = this.countdown.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
  }
  /**
   * Do not call this function directly. It will create erratic behavior. Use start(), stop(), or newCountDown().
   * @param {boolean} isNewCountDown true will reset and continue countdown. false will generate a new countdown instance
   */
  countdown(isNewCountDown) {
    if (isNewCountDown) {
      this.stop();
      this.gameState.timer = this.gameState.initTimer;
    }
    if (this.gameState.timer > 1) {
      this.isCounting = true;
      this.countDownReference = setTimeout(this.countdown, 1000);
    }
    this.cb(--this.gameState.timer);
  }
  /**
   * Start() does not take any params. Will continue counting down or start new countdown based on object timer/initTimer properties.
   * Will not add an additional timer if called while actively counting down.
   * If you need a new countdown then call newCountDown()
   */
  start() {
    //TODO
    if (gameState.gameStatus === 'setup') {
      console.log('START', gameState.playerInfo);
      let numWolves = gameState.wolves.number;
      while (numWolves > 0) {
        let rando = Math.floor(Math.random() * gameState.playerInfo.length);
        console.log(rando);
        if (gameState.playerInfo[rando].role === 0) {
          gameState.playerInfo[rando].role = 2;
          numWolves--;
        }
      }
      console.log('WOLVES', gameState.playerInfo);
      gameState.gameStatus = 'playing';
      io.emit('gameState-feed', this.gameState);
    }
    if (this.isCounting) return;
    if (this.gameState.timer > 0) {
      this.countdown(false);
    } else {
      this.countdown(true);
    }
  }
  /**
   * Stops and clears countdown instance. Does not take params.
   */
  stop() {
    //TODO
    this.isCounting = false;
    clearTimeout(this.countDownReference);
  }
  /**
   * Creates a new countdown. Does not take any params
   * It will reset current countdown. This does not stop the countdown. Call stop() first before calling newCountDown().
   */
  newCountDown() {
    this.countdown(true);
  }
}

io.on('connection', (socket) => {
  const countdownTimer = new CountDown(gameState, (time) => {
    io.emit('timer-feed', time);
  });
  const socketID = socket.id;
  socket.on('login', ({ username, password, picture }) => { //TODO: receive picture
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
        picture,
      },
    };
    console.log(options.data);
    axios(options)
      .then(({ body, status, data }) => {
        console.log(`status: ${status} ${data}`);
        if (data !== 'Error, Bad Username/Password. Check Password') {
          const playerState = { username, player_id: socketID, role: 0, picture }; //TODO: add picture to playerState
          if (gameState.playerInfo.length === 0) {
            playerState.host = true;
            gameState.host = playerState;
          } else {
            playerState.host = false;
          }
          gameState.playerInfo.push(playerState);
          socket.emit('login-success', body);
          io.emit('playerInfo-feed', gameState.playerInfo);
          console.log('playerStateIOIO:', playerState);
          io.to(socketID).emit('playerState-feed', playerState);
          io.emit('gameState-feed', gameState);
        } else {
          socket.emit('login-failed', 'Incorrect password!');
        }
        //TODO: add a route for creating player state
      })
      .catch((e) => {
        console.log('Failed connection: ', e);
        socket.emit('login-failed', 'Failed to reach server!');
      });
  });

  //host logic
  socket.on('host-send', (messageOrObject) => {
    // change server game state based on host command
    if (messageOrObject === 'pause') {
      // send game status to all players (including host)
      countdownTimer.stop();
      gameState.gameStatus = 'paused';
      io.emit('gameStatus-feed', 'paused');
    } else if (messageOrObject === 'resume') {
      gameState.gameStatus = 'playing';
      io.emit('gameStatus-feed', 'playing');
      countdownTimer.start()
    } else if (typeof messageOrObject === 'object') {
      console.log(messageOrObject);
      const { numPlayers, numWolves, timer, seer, medic } = messageOrObject;
      gameState.timer = timer;
      gameState.initTimer = timer;
      gameState.wolves.number = numWolves;
      gameState.expectedPlayers = numPlayers;
      gameState.isSeer = seer;
      gameState.isMedic = medic;
      io.emit('gameState-feed', gameState);
    } else if (messageOrObject === 'start') {
      countdownTimer.start();
      io.emit('gameStatus-feed', 'start');
    } else if (messageOrObject === 'setup') {
      //TODO: setup logic
        //this is when a new game is being created
    }

    //rulesSet sender TODO:
    // io.emit('ruleset-feed', object);
  });

  // votes logic
  socket.on('vote-send', (voteTuple) => {
    console.log('socket server recieved voteTuple: ', voteTuple);
    // Voting logic and changing server game state here
    gameState.votes.push(voteTuple);
    console.log('vote submitted state', gameState);
    let numWolves = 0;
    let numVillagers = 0;
    for (let i = 0; i < gameState.playerInfo.length; i++) {
      if (gameState.playerInfo[i].role === 2) {
        numWolves++;
      } else if (gameState.playerInfo[i].role === 0) {
        //This If statement would include || seer || healer if added
        numVillagers++;
      }
    }
    let numLiving = numWolves + numVillagers;
    if (gameState.currentPhase === 'day') {
      if (gameState.votes.length === numLiving || gameState.timer === 0) {
        console.log('initiating phase change!');
        phaseChange(countdownTimer);
        let returnObj = {
          timer: gameState.timer,
          previousResult: gameState.previousResult,
          currentDay: gameState.currentDay,
          currentPhase: gameState.currentPhase,
          phaseResults: gameState.phaseResults,
          playerInfo: gameState.playerInfo,
        };

        io.emit('gameState-feed', returnObj);
      }
    } else {
      if (gameState.votes.length === numWolves || gameState.timer === 0) {
        phaseChange(countdownTimer);
        let returnObj = {
          timer: gameState.timer,
          previousResult: gameState.previousResult,
          currentDay: gameState.currentDay,
          currentPhase: gameState.currentPhase,
          phaseResults: gameState.phaseResults,
          playerInfo: gameState.playerInfo,
        };

        io.emit('gameState-feed', returnObj);
      }
    }
  });

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

  socket.on('disconnect', (reason) => {
    console.log(`user ${socket.id} disconnected`);
    if (gameState.playerInfo.length !== 0) {
      if (gameState.playerInfo[0].player_id === socket.id) {
        if (gameState.playerInfo.length > 1) {
          gameState.playerInfo[1].host = true;
          gameState.playerInfo.shift();
          console.log(
            `Host disconnected, ${gameState.playerInfo[0].username} is the new host`
          );
        }
      }
    }
  });
});

instrument(io, { auth: false });
// how to use socket.io admin ui. ::::
// start up servers in terminal
// go to "admin.socket.io"  in browser
// clear path option in browser and toggle websocket only option on

const phaseChange = (countdownTimer) => {
  //Phase Change
  //0. Build Variables
  let numWolves = 0;
  let numVillagers = 0;
  for (let i = 0; i < gameState.playerInfo.length; i++) {
    if (gameState.playerInfo[i].role === 2) {
      numWolves++;
    } else if (gameState.playerInfo[i].role === 0) {
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
    if (maxVotes >= majority && victim !== 'NULL') {
      //Hang Victim Wolf
      for (let i = 0; i < gameState.playerInfo.length; i++) {
        if (gameState.playerInfo[i].username === victim) {
          if (gameState.playerInfo[i].role === 2) {
            gameState.playerInfo[i].role = 3;
            numWolves--;
            gameState.phaseResults.push([
              gameState.currentDay,
              gameState.currentPhase,
              victim,
            ]);
          } else {
            //Hang Other Victim
            gameState.playerInfo[i].role += 1;
            numVillagers--;
            gameState.phaseResults.push([
              gameState.currentDay,
              gameState.currentPhase,
              victim,
            ]);
          }
          gameState.previousResult = victim + ' was killed yesterday!';
        }
      }
    } else {
      victim = 'No one';
      gameState.phaseResults.push([
        gameState.currentDay,
        gameState.currentPhase,
        victim,
      ]);
      gameState.previousResult = 'No one was killed yesterday.';
    }
  } else {
    //Wolf Vote Logic
    let votes = {};
    for (let i = 0; i < gameState.votes.length; i++) {
      let player = playerInfo.find(player => player.username === votes[i][0]);
      if (player.role === 4) {
        let seerTarget = votes[i][1];
      } else if (player.role === 6) {
        let healerTarget = votes[i][1];
      } else if (votes[gameState.votes[i][1]]) {
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
        let coinFlip = Math.floor(Math.random() * 2) == 0;
        if (coinFlip) {
          victim = voteKeys[i];
        }
      }
    }
    if (maxVotes === -1 || victim === 'NULL') {
      //TODO: choose a living non-wolf at random to kill
    }
    if (victim !== healerTarget) {
      for (let i = 0; i < gameState.playerInfo.length; i++) {
        if (gameState.playerInfo[i].username === victim) {
          gameState.playerInfo[i].role += 1;
          numVillagers--;
          gameState.phaseResults.push([
            gameState.currentDay,
            gameState.currentPhase,
            victim,
          ]);
          gameState.previousResult = victim + ' was eaten last night!';
        }
      }
    } else {
      victim = 'No one';
      gameState.phaseResults.push([
        gameState.currentDay,
        gameState.currentPhase,
        victim,
      ]);
      gameState.previousResult = victim + ' was eaten last night!';
    }
  }
  //2. Check if game has ended
  if (numWolves === 0) {
    gameState.previousResult = 'Villagers Win!';
    let returnObj = {
      timer: gameState.timer,
      previousResult: gameState.previousResult,
      currentDay: gameState.currentDay,
      currentPhase: gameState.currentPhase,
      phaseResults: gameState.phaseResults,
      playerInfo: gameState.playerInfo,
      gameStatus: 'ended',
    };
    io.emit('gameState-feed', returnObj);
    countdownTimer.stop();
    console.log('Villagers win');
  } else if (numWolves >= numVillagers) {
    gameState.previousResult = 'Wolves Win!';
    let returnObj = {
      timer: gameState.timer,
      previousResult: gameState.previousResult,
      currentDay: gameState.currentDay,
      currentPhase: gameState.currentPhase,
      phaseResults: gameState.phaseResults,
      playerInfo: gameState.playerInfo,
      gameStatus: 'ended',
    };
    io.emit('gameState-feed', returnObj);
    countdownTimer.stop();
    console.log('Wolves Win');
  }
  //3. Game Continues
  else if (gameState.currentPhase === 'day') {
    gameState.currentPhase = 'night';
    gameState.votes = [];
    io.emit('gameState-feed', gameState);
    countdownTimer.newCountDown();
  } else {
    gameState.currentPhase = 'day';
    gameState.currentDay++;
    gameState.votes = [];
    io.emit('gameState-feed', gameState);
    countdownTimer.newCountDown();
  }
};
