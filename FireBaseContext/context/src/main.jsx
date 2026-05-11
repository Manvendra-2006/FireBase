import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import FireBaseProvider from './FireBase/FireBaseProvider.jsx'

createRoot(document.getElementById('root')).render(
  <FireBaseProvider>
  <StrictMode>
    <App />
  </StrictMode>,
  </FireBaseProvider>

)
