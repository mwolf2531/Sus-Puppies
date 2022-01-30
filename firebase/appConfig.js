// Import the functions you need from the SDKs you need
import {
  getDatabase,
  ref,
  set,
  onValue,
  push,
  update,
  child,
  get,
} from 'firebase/database';
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDNPBRScS8W-4XlfMowxyJZLstHOFNTom4',
  authDomain: 'sus-pupies.firebaseapp.com',
  databaseURL: 'https://sus-pupies-default-rtdb.firebaseio.com',
  projectId: 'sus-pupies',
  storageBucket: 'sus-pupies.appspot.com',
  messagingSenderId: '847459761131',
  appId: '1:847459761131:web:9fb4657ae1977e66b477ae',
  measurementId: 'G-2T5P8FPWZJ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function writeUserData(name, email) {
  // create game state
  set(ref(db), {
    gameState: {
      user: name,
      email: email,
    },
  });
}

// writeUserData('user', 'example@example.com');

// const starCountRef = ref(db);
// onValue(starCountRef, (snapshot) => {
//   console.log(snapshot.val());
// });

async function updateUserEmail(username, email, nickname) {
  // A post entry.
  const postData = {
    user: username,
    email: email,
    nickname: nickname,
  };

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates['gameState'] = postData;
  const results = await update(ref(db), updates);
  console.log(results);
}

updateUserEmail('user', 'newEmail@example.com', 'dogman');

// Routes:==========================================

//Get Entire Gamestate Function
const getGameState = async () => {
  const currentGame = ref(db);
  let result;
  get(currentGame).then((snapshot) => {
    if (snapshot.exists()) {
      console.log('why', snapshot.val());
      result = (snapshot.val());
      return(result);
    }
  }).catch((error) => {
    console.log(error);
  });
}

const updateGameState = async (gameState) => {
  const updates = {};
  updates['gameState'] = gameState;
  const results = await update(ref(db), updates);
  console.log(results);
  return results;
}

const phaseCycle = () => { };
// phase cycle
// if end of game
// set game status = ended
// update previous result to 'gameover' or whatever
// else
// cycle phase
// reset chat for wolves and villagers (leave ghost)
// reset timer
// day -> night or night -> day
// if night -> day, increment day counter
// update previous result
// clear voting

const routes = {
  joinGame: () => { },
  // join game
  // create host if playerinfo array is empty
  // if playerinfo length greater than one
  // push player  into playerInfo array
  startGame: () => { },
  // start game
  // set game status from setup to playing
  // user submits 'x' number of wolves
  // set 'x' players to wolf roles randomly
  // reset gamestate
  // timer 90
  // day = 0
  // clear previous results
  // clear all chats
  // reset phaseresults array
  pauseGame: () => { },
  // pause game
  // set game status to pause
  // if host changes state to pause or if player disconnected
  resumeGame: () => { },
  // resume game
  // set game status to playing
  ghostChatSubmit: async (player_id, message) => {
    // ghostChat => submit message
    // takes id, message
    const gameState = await getGameState();
    const infoArray = gameState.playerInfo
    for (let i = 0; i < infoArray.length; i++) {
      if (infoArray[i].player_id === player_id) {
        let name = infoArray[i].name;
        break;
      }
    }
    // store as name and message (based on playerInfo data)
    const submission = [name, message];
    gameState.ghostChats.push(submission);
    const result = await updateGameState(gameState);
    return(result);
  },
  villagerChatSubmit: () => { },
  // living chat => submit message
  wolfChatSubmit: () => { },
  // wolf chat => submit message
  playerVoteSubmit: () => { },
  // player votes => submit vote
  // check for all votes
  // if not all votes send game state
  // check for majority
  // kill player on majority
  // phase cycle
  // send state
  wolfVoteSubmit: () => { },
  // wolf votes => submit vote
  // SEER && HEALER LOGIC
  // wolves have to vote
  // if null
  // kill random (any villager)
  // if one out of two total votes
  // kill only vote
  // on tie,
  // random between both votes submitted
  // majority
  // kill submitted majority
  // update phaseResults array
  // phase cycle
  // send
};
const data = await getGameState();
console.log('Conlog', data);