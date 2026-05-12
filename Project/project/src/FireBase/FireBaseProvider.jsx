import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { getFirestore, collection, addDoc, getDoc, where, query, getDocs, setDoc, doc } from 'firebase/firestore'
import React, { createContext, useContext } from 'react'
const FireBaseContext = createContext()
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const firestore = getFirestore(app)
const googleprovider = new GoogleAuthProvider()// instance create
const githubprovider = new GithubAuthProvider()
export const useAuth = () => {
  return useContext(FireBaseContext)
}
const FireBaseProvider = ({ children }) => {
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }
  const signupwithgoogle = () => {
    return signInWithPopup(auth, googleprovider)
  }
  const signupwithgithub = () => {
    return signInWithPopup(auth, githubprovider)
  }
  const signout = () => {
    return signOut(auth)
  }
  const writedata = async (email, displayName, uid) => {
    await setDoc(doc(firestore, "users", uid), { // isse data set ho jayenga ek hi data baar baar nhi aayega
      uid: uid,
      email: email,
      displayName: displayName
    }, {
      merge: true
    })
  }

  const writeBookData = async (bookdata, uid) => {
    await setDoc(doc(firestore, "users", uid, "BookData", bookdata.isbnNumber), {
      BookName: bookdata.bookName,
      isbnNumber: bookdata.isbnNumber,
      price: bookdata.price,
      pic: bookdata.pic
    }, {
      merge: true
    })
  }
  const getBookData = async (uid) => {
    const res = collection(firestore, "users", uid, "BookData")
    const snapshot = await getDocs(res)
    const answer = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))
    return answer
  }
  const getSpecificData = async (uid,id) =>{
    const res = doc(firestore,"users",uid,"BookData",id)
    const data = await getDoc(res)
    const answer = data.data()
    return answer
  };
  
  return (
    <FireBaseContext.Provider value={{ signup, login, signupwithgoogle, signupwithgithub, signout, writedata, writeBookData, getBookData , getSpecificData }}  >
      {children}
    </FireBaseContext.Provider>
  )
}

export default FireBaseProvider