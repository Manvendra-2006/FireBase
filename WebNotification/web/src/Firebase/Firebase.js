// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD72hN5YWmDSJdLebNldlbLInD5j5nyJrw",
  authDomain: "mini-project-7ecfd.firebaseapp.com",
  databaseURL: "https://mini-project-7ecfd-default-rtdb.firebaseio.com",
  projectId: "mini-project-7ecfd",
  storageBucket: "mini-project-7ecfd.firebasestorage.app",
  messagingSenderId: "172423282435",
  appId: "1:172423282435:web:1aa293b348a22f05bdb336",
  measurementId: "G-RCXKBDYCP2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const messaging = getMessaging(app);
