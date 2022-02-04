// import firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInWithPopup as popOut, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC52EwaYj8HhuwwqMqX4giHPW3x0Jp-gTk",
    authDomain: "hospital-service-922ad.firebaseapp.com",
    projectId: "hospital-service-922ad",
    storageBucket: "hospital-service-922ad.appspot.com",
    messagingSenderId: "464660010482",
    appId: "1:464660010482:web:6e22d09251a8d90295876b",
    measurementId: "G-BNH39MM08S"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);


export { db, app, auth, googleProvider, popOut };