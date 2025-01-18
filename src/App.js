import './App.scss';
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Register from './components/Authentication/Register';
// import Login from './components/Authentication/Login';
// import Order from './dashboard/Order';
// import Home from './dashboard/Home';
import AuthRoutes from './components/Authentication/AuthRoutes';
import { Toaster } from 'react-hot-toast';
import FrontEndRoutes from './dashboard/FrontEndRoutes';
import Home from './dashboard/Home';
import Hero from './dashboard/Hero';
import Order from './dashboard/Order';
import ForgotPassword from './components/Authentication/ForgotPassword';
import Register from './components/Authentication/Register';
import Login from './components/Authentication/Login';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './dashboard/LandingPage';
import Cloudinary from './dashboard/Cloudinary';



function App() {
  // <Register/>
  return (
    <>
    <div style={{backgroundColor: '#FAFAFA'}} >
{/* i have to make the all background-color: #FAFAFA; so i create the div and wrap the routes here and anything in it , so the all body color is same; */}
      <Toaster />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-Password' element={<ForgotPassword />} />
        <Route path='/home' element={<LandingPage />} />
        <Route path='/add-menu' element={<Home />} />
        <Route path='/order' element={<Order />} />
      </Routes>
      {/* <AuthRoutes />
   <FrontEndRoutes /> */}
      {/* <Cloudinary /> */}
    </div>
    </>
  );
}

export default App;