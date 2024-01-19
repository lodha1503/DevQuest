// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import "firebase/compat/auth";



const firebaseConfig = {
  apiKey: "AIzaSyDbvr1RFkW9Fyv6x9BaFGN5pEbc_xX3sRY",
  authDomain: "challenge-9e4a8.firebaseapp.com",
  projectId: "challenge-9e4a8",
  storageBucket: "challenge-9e4a8.appspot.com",
  messagingSenderId: "895202683599",
  appId: "1:895202683599:web:7d887f5eff3f05d5a125ba",
  measurementId: "G-GVYDE493D1"
};

// firebase.initializeApp({
//   apiKey: "AIzaSyDbvr1RFkW9Fyv6x9BaFGN5pEbc_xX3sRY",
//   authDomain: "challenge-9e4a8.firebaseapp.com",
//   projectId: "challenge-9e4a8"
// });

const firebaseApp= firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export {db,auth};