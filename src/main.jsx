import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter  } from 'react-router'
import './index.css'
import App from './App.jsx'
import ScrollToTop from './components/Functional/ScrollToTop.jsx'
import { AuthProvider } from './features/context/AuthContex.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
