import React, { useEffect, useState } from 'react'
import SignUp from './Pages/signup'
import Login from './Pages/login'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './FireBase/FireBaseProvider'
import Home from './Pages/Home'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AddListing from './Pages/AddList'
import Navbar from './components/Navbar'
import DetailPage from './Pages/DetailPage'
import Update from './Pages/Update'

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
          <Route element={<Navbar />}>
            <Route path="/" element={user ? <Home data={user} /> : <Navigate to="/signup" />} />
            <Route path="/signup" element={user ? <Navigate to="/" /> : <SignUp />} />
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
            <Route path="/book/add" element={<AddListing data={user} />} />
            <Route path='/book/detail/:id' element={<DetailPage data={user}/>}/>
            <Route path="/book/detail/update/:id" element={<Update data={user}/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App