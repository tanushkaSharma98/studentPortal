import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
<<<<<<< Updated upstream:client/src/root files/main.js
import App from './App.jsx'
=======
import App from './App.js'
>>>>>>> Stashed changes:client/src/index.jsx
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
