// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCI-an0tALPy5XCMfvlcHHfahk3EQElX4E",
  authDomain: "habit-tracker-backend.firebaseapp.com",
  projectId: "habit-tracker-backend",
  storageBucket: "habit-tracker-backend.firebasestorage.app",
  messagingSenderId: "194503016492",
  appId: "1:194503016492:web:e2c74e40b5012b90b59189",
  measurementId: "G-8VTMEMXED7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);