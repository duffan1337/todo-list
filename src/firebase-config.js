// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqBSJ6ADVve49j1KTw8BrtakJDNLj14Q0",
  authDomain: "todolist-31a8c.firebaseapp.com",
  databaseURL: "https://todolist-31a8c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todolist-31a8c",
  storageBucket: "todolist-31a8c.appspot.com",
  messagingSenderId: "338005648308",
  appId: "1:338005648308:web:4c4fdf6c38aeba1c71c8e1"
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth =getAuth(app)
export const provider = new GoogleAuthProvider()