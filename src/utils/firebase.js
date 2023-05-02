// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUaWx626F3W5n7siHNXkVb4sIMzn9Ua5Y",
  authDomain: "bluetoothapp-74eda.firebaseapp.com",
  projectId: "bluetoothapp-74eda",
  storageBucket: "bluetoothapp-74eda.appspot.com",
  messagingSenderId: "226736747920",
  appId: "1:226736747920:web:88b6eef2cf6ed3f909ef15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
