import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}
export const app = initializeApp(firebaseConfig)
console.log(import.meta.env.VITE_FIREBASE_API_KEY)
console.log(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN)
console.log(import.meta.env.VITE_FIREBASE_DATABASEURL)
console.log(import.meta.env.VITE_FIREBASE_PROJECTID)
console.log(import.meta.env.VITE_FIREBASE_STORAGEBUCKET)
console.log(import.meta.env.VITE_FIREBASE_MESSAGESENDERID)
console.log( import.meta.env.VITE_FIREBASE_APPID)