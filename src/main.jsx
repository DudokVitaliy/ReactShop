import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.jsx'
import ScrollToTop from './components/Functional/ScrollToTop.jsx'
import { AuthProvider } from './features/context/AuthContex.jsx';
import { CartProvider } from './features/context/CartContext.jsx';
import { Provider } from 'react-redux'
import {store} from './store/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
        <BrowserRouter>
        <Provider store={store}>
            <ScrollToTop />
            <CartProvider>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </CartProvider>
        </Provider>
        </BrowserRouter>
    </StrictMode>
)
