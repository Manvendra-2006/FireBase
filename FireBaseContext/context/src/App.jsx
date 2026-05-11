import React, { useEffect } from 'react'
import { app, useAuth } from './FireBase/FireBaseProvider'
import { useState } from 'react'
import Signup from './pages/signup'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

const App = () => {
 const [user,setuser] = useState(null)
  const auth = getAuth(app)
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if(user){
        setuser(user)
      }
      else{
        setuser(null)
      }
    })
  },[])
  if(user===null){
    return (
    <div>
    <Signup/>
    </div>
  )
  }

  return (
    <div>
     <h1>User logged in </h1>
      <h1>{user.email}</h1>
      <button onClick={()=>signOut(auth)}>loout</button>
    </div>
  )
}

export default App