import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCeujpsX6L38bRMcCI0Efo3w71FIiXHqig",
  authDomain: "mybookmarks-87e4d.firebaseapp.com",
  databaseURL: "https://mybookmarks-87e4d-default-rtdb.firebaseio.com",
  projectId: "mybookmarks-87e4d",
  storageBucket: "mybookmarks-87e4d.appspot.com",
  messagingSenderId: "473855109350",
  appId: "1:473855109350:web:d41b741bcddcac618ab327",
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };
