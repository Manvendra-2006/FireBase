import React from 'react'
import { useAuth } from './FireBase/FireBaseProvider'
import { useState } from 'react'
const App = () => {
  const firebase = useAuth()
  console.log(firebase.signup)
   const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSignup = (e) =>{
    e.preventDefault()
    firebase.signup(email,password)
  }
  return (
    <div>

      <h2>Signup</h2>

      <form onSubmit={(e)=>handleSignup(e)}>
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

        <button type="submit">Signup</button>
      </form>
    </div>
  )
}

export default App