<<<<<<< HEAD:client/src/components/firebase/firebase.js
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
=======
// import firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInWithPopup as popOut, GoogleAuthProvider, signOut, createUserWithEmailAndPassword } from "firebase/auth";



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
const gProvider = new GoogleAuthProvider(app);
const db = getFirestore(app);
const out = () => {
    signOut(auth).then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    }).then(clear);
}

const signInWithGoogle = async () => {
    try {
        const res = await popOut(auth, gProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
        setTheUser(user);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const signUp = e => {
    e.preventDefault();
    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    ).then(user => {
      console.lop(user)
    }).catch(err => {
      console.log(err)
    }).then(router.push('/login'))  

  }


export { db, app, auth, signInWithGoogle, out, signUp };
>>>>>>> bba1a4230864083b574c8b7b5967fff30180a2ce:src/components/firebase/firebase.js
