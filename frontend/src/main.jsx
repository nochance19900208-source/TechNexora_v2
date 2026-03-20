import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import Preloader from './components/Preloader.jsx'
import './styles/index.css'
import './styles/components.css'
import './styles/pages.css'
import './styles/preloader.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Preloader />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
