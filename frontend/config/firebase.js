// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAvRgR3AVZzsmVukZYhuzN5TnXhWGUQs9M",
    authDomain: "turbogo-9857b.firebaseapp.com",
    projectId: "turbogo-9857b",
    storageBucket: "turbogo-9857b.appspot.com",
    messagingSenderId: "1022265708128",
    appId: "1:1022265708128:web:7b123152fd74ee8c71bd05"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)