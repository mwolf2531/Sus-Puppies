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
