// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWeA3g31BqXOxpf75691w9sqEJP6dgJ5I",
  authDomain: "groak-f947e.firebaseapp.com",
  projectId: "groak-f947e",
  storageBucket: "groak-f947e.appspot.com",
  messagingSenderId: "578100124299",
  appId: "1:578100124299:web:bb2e95fb266c202960128e",
  measurementId: "G-23HS8RP9H5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const firestore = getFirestore(app)
const storage = getStorage(app)

let analytics = null;
isSupported().then((result) => {
  if(result) {
    analytics = getAnalytics(app);
  }
})

export { auth, app, firestore, storage }
