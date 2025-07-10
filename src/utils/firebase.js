// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDu8eWeSoJUlQvTikMLZ1Ye-vbAUubDYmQ",
  authDomain: "movig-gpt.firebaseapp.com",
  projectId: "movig-gpt", 
  storageBucket: "movig-gpt.firebasestorage.app",
  messagingSenderId: "310026749245",
  appId: "1:310026749245:web:faf6050cdce2b63c26f154",
  measurementId: "G-3H6KDBTJSZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);