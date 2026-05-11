import React from 'react'
import { useAuth } from './FireBase/FireBaseProvider'
import { useState } from 'react'
const App = () => {
  const firebase = useAuth()
  console.log(firebase.signup)
  console.log(firebase.login)
  console.log(firebase.signupwithGoogle)
   const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const signup = (e) =>{
    e.preventDefault()
    firebase.signup(email,password)
  }
  const signupwithgoogle= ()=>{
     firebase.signupwithGoogle()
     .then((res)=>console.log("Sign in successfully",res))
     .catch((err)=>console.log("Error",err))
  }
  return (
    <div>

      <h2>Signup</h2>

      <form >
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />

        <button onClick={signup}>Signup</button>
        <button type='button' onClick={signupwithgoogle}>Sign UP with Google</button>
      </form>
    </div>
  )
}

export default App