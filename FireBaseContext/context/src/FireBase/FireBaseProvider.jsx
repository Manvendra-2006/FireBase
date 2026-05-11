import React, { createContext, useContext } from 'react'

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
const FireBaseContext = createContext()
export const useAuth = () =>{
  return  useContext(FireBaseContext)
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASEURL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGESENDERID,
  appId: import.meta.env.VITE_FIREBASE_APPID
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const FireBaseProvider = ({children}) => {
    const signup = (email,password) =>{
      return  createUserWithEmailAndPassword(auth,email,password)
    }
    const login = (email,password)=>{
        return signInWithEmailAndPassword(auth,email,password)
    }
  return (
    <FireBaseContext.Provider value={{signup,login}}>
        {children}
    </FireBaseContext.Provider>
  )
}

export default FireBaseProvider