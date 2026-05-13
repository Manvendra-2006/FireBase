import React, { useEffect } from 'react'
import { getMessaging, getToken } from "firebase/messaging";
import { messaging } from './Firebase/Firebase';

const App = () => {
  async function requestPermission(){
    const permission = await Notification.requestPermission()
    if(permission==="granted"){
      // generate token
      const token = await getToken(messaging,{vapidKey:'BJ6zn9SGja4ixpwf6ssAZKfpzG0JmED-hC92o020n1ZlX0TH4Fl-0p8bzfAgM3wamXy0jQoQBiHf1rAiMAS5QPA'})
      console.log("Token is generated",token)
    }
    else if(permission==="denied"){
      alert("You denied for notifcation")
    }
  }
  useEffect(()=>{
    requestPermission()
    },[])
  return (
    <div>

    </div>
  )
}

export default App