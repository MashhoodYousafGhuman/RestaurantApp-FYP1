import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
// import MenuItemContext from './contexts/MenuItemContext';
// import UserContextProvider from './contexts/UserContextProvider';
import { BrowserRouter } from 'react-router-dom';
import AdminContextProvider from './context/AdminContextProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    {/* <MenuItemContext> */}
    {/* <UserContextProvider> */}
    <AdminContextProvider>
      <App />
    </AdminContextProvider>
    {/* </UserContextProvider> */}
    {/* </MenuItemContext> */}
  </BrowserRouter>
  // </React.StrictMode>
);
