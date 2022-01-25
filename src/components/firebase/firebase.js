import firebase from 'firebase/compat/app';

const firebaseConfig = {
    apiKey: "AIzaSyC52EwaYj8HhuwwqMqX4giHPW3x0Jp-gTk",
    authDomain: "hospital-service-922ad.firebaseapp.com",
    projectId: "hospital-service-922ad",
    storageBucket: "hospital-service-922ad.appspot.com",
    messagingSenderId: "464660010482",
    appId: "1:464660010482:web:6e22d09251a8d90295876b",
    measurementId: "G-BNH39MM08S"
};

// const initApp = initializeApp(firebaseConfig);
// auth.languageCode = 'it';
// const auth = getAuth();

// window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
firebase.initializeApp(firebaseConfig);

export { firebase };




// import { initializeApp } from "firebase/app";
// // import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: "AIzaSyC52EwaYj8HhuwwqMqX4giHPW3x0Jp-gTk",
//   authDomain: "hospital-service-922ad.firebaseapp.com",
//   projectId: "hospital-service-922ad",
//   storageBucket: "hospital-service-922ad.appspot.com",
//   messagingSenderId: "464660010482",
//   appId: "1:464660010482:web:6e22d09251a8d90295876b",
//   measurementId: "G-BNH39MM08S"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);