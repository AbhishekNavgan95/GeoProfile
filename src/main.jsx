import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Browser } from 'appwrite'
import { BrowserRouter } from 'react-router-dom'
import { LoadingBarContainer } from "react-top-loading-bar";
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <LoadingBarContainer>
      <Toaster />
      <App />
    </LoadingBarContainer>
  </BrowserRouter>
)
