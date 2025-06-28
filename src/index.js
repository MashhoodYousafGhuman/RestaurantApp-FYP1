import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter } from 'react-router-dom';
import AdminContextProvider from './context/AdminContextProvider';
import { CartProvider } from './context/CartContext'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AdminContextProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AdminContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
