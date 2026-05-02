import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <App />         {/*Wraps entire app with AuthContext. Now ANY component can access const { user, login, logout } = useContext(AuthContext); */}
    </AuthProvider>
    
  </StrictMode>,
)
