// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1zRBymc36rDv-UD5lp9bgtT2BDSZt0LA",
  authDomain: "podcast-1014c.firebaseapp.com",
  projectId: "podcast-1014c",
  storageBucket: "podcast-1014c.appspot.com",
  messagingSenderId: "1007616744219",
  appId: "1:1007616744219:web:f661a6de84b0fead8091be",
  measurementId: "G-J9LN1MY3HW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export { auth, db, storage };
