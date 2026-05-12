import React, { useEffect } from 'react'
import { messaging } from './Firebase/Firebase'
import { getToken } from "firebase/messaging"

const App = () => {

async function requestPermission() {
  const permission = await Notification.requestPermission();

  if (permission === "granted") {

    // ✅ Pehle service worker register karo
    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js"
    );

    // ✅ Phir token lo, registration pass karo
    const token = await getToken(messaging, {
  vapidKey: "BChu79FtY1O_PgHeiCDrE8A5jVKPbLfROohdkKhPy_y5umito8QYmgo1DA429THpPgTQJqojJdlapMYwQAkO-UY",
  serviceWorkerRegistration: registration,
});

    console.log("Token:", token);

  } else if (permission === "denied") {
    alert("You denied notifications");
  }
}

  useEffect(() => {
    requestPermission()
  }, [])

  return (
    <div>

    </div>
  )
}

export default App