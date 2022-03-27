// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMYu56xw2KtwJdMAJW8y2IMklt4WSyt88",
  authDomain: "crud-app-71e42.firebaseapp.com",
  projectId: "crud-app-71e42",
  storageBucket: "crud-app-71e42.appspot.com",
  messagingSenderId: "131399965631",
  appId: "1:131399965631:web:e01fba94b1193dfe6e9f0a"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();

export {app, db}