// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAn8cm4IehrfmJJaOeqh0xhwj5iGvq2pfs",
  authDomain: "bluetoothapp-4879b.firebaseapp.com",
  projectId: "bluetoothapp-4879b",
  storageBucket: "bluetoothapp-4879b.appspot.com",
  messagingSenderId: "320935716700",
  appId: "1:320935716700:web:e3eea835825af817214399",
  measurementId: "G-0NTTF2704X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
