// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjMO2t-U7dy7PTMEA4JxKQVEuv9xo2LG0",
  authDomain: "iot-home-system-de90e.firebaseapp.com",
  projectId: "iot-home-system-de90e",
  storageBucket: "iot-home-system-de90e.firebasestorage.app",
  messagingSenderId: "823238731600",
  appId: "1:823238731600:web:c668a5f456d42b4f8aae55",
  measurementId: "G-ERVN414N68"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;