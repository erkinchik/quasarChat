import firebase from "firebase/app";

import "firebase/analytics";

import "firebase/auth";
import "firebase/database";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCBWOkbRwiQOVZ_8QbCzoSqcP1mHH1TqzI",
  authDomain: "mychat-47b2f.firebaseapp.com",
  projectId: "mychat-47b2f",
  storageBucket: "mychat-47b2f.appspot.com",
  messagingSenderId: "519487119290",
  appId: "1:519487119290:web:614548bd1a939d443fc783",
};
// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth();
let firebaseDb = firebaseApp.database(
  "https://mychat-47b2f-default-rtdb.asia-southeast1.firebasedatabase.app"
);

export { firebaseAuth, firebaseDb };
