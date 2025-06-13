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
  apiKey: "AIzaSyD_7v1X0hv3j9GVm-Pa4iGlz8jxUfGEDGE",
  authDomain: "raspberrypitest-289f4.firebaseapp.com",
  databaseURL: "https://raspberrypitest-289f4-default-rtdb.firebaseio.com",
  projectId: "raspberrypitest-289f4",
  storageBucket: "raspberrypitest-289f4.firebasestorage.app",
  messagingSenderId: "690728591418",
  appId: "1:690728591418:web:d4b2f14d3d006b3c53d503",
  measurementId: "G-JT6P6N0HTG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics1 = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;

