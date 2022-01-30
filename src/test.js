// Import the functions you need from the SDKs you need

import {
  getDatabase,
  ref,
  set,
  onValue,
  push,
  update,
  child,
} from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcf1dGs8NmySy5P9oRoggd4y-aSIXxZco",
  authDomain: "sus-puppies.firebaseapp.com",
  databaseURL: "https://sus-puppies-default-rtdb.firebaseio.com",
  projectId: "sus-puppies",
  storageBucket: "sus-puppies.appspot.com",
  messagingSenderId: "132969167509",
  appId: "1:132969167509:web:f45792a0d2f09aef4f799c",
  measurementId: "G-FSJ9VERHPW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getDatabase(app);

const logDB = (db) => {
  console.log(db)
}

function writeUserData(name) {
  // create game state
  console.log(name);
  set(ref(db), {
    gameState: {
      user: name,
      email: `${name}@suspup.com`,
    },
  });
}
// reflect the new change in state.

// able to reac and write the state.

export default writeUserData