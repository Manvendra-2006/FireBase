import React, { useEffect, useState } from 'react'
import SignUp from './Pages/signup'
import Login from './Pages/login'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './FireBase/FireBaseProvider'
import Home from './Pages/Home'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

const App = () => {
  const [user, setuser] = useState(null)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setuser(user)
      }
      else {
        setuser(null)
      }
    })
  }, [])

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user ? <Home data={user}/> : <Navigate to="/signup" />} />
          <Route path="/signup" element={user ? <Navigate to="/" /> : <SignUp />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App