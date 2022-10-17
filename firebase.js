import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyALnsrSPa6R5UBrEnzY47E-pqbWuHmMsDE",
  authDomain: "gifted-chat-42d11.firebaseapp.com",
  projectId: "gifted-chat-42d11",
  storageBucket: "gifted-chat-42d11.appspot.com",
  messagingSenderId: "479108116035",
  appId: "1:479108116035:web:568bb23c000e6da7426ef6"
};

// Initialize Firebase
let app = initializeApp(firebaseConfig);

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
}else{
    app = firebase.app()
}

const db = app.firestore();
const auth = firebase.auth();

export {db,auth};