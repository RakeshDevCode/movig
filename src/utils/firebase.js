// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5QTASOjJT35sCmu8FOy7ikLjYR4o4RLw",
  authDomain: "movig-744e9.firebaseapp.com",
  projectId: "movig-744e9",
  storageBucket: "movig-744e9.firebasestorage.app",
  messagingSenderId: "449769688706",
  appId: "1:449769688706:web:636bae698ecc61c0dbee9b",
  measurementId: "G-ZYJSJ465NF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);