import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './store/auth.jsx';
import { Provider } from 'react-redux';
import store from './store/store.js';


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
   <AuthProvider>
   <StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </StrictMode>
  </AuthProvider>
  </Provider>
  

)
