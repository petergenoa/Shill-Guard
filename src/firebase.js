import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLAgC49JbAinIXClUpmsP3NwI6OHwTP_Q",
  authDomain: "shillguard-eef35.firebaseapp.com",
  projectId: "shillguard-eef35",
  storageBucket: "shillguard-eef35.appspot.com",
  messagingSenderId: "953974233236",
  appId: "1:953974233236:web:f96464ab51bc4bac54fc81",
  measurementId: "G-2N9105NWS1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, db, storage };