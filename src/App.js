import { Toaster } from 'react-hot-toast';
import Home from './dashboard/Home';
import Order from './dashboard/Order';
import ForgotPassword from './components/Authentication/ForgotPassword';
import Login from './components/Authentication/Login';
import { Navigate, Route, Routes } from 'react-router-dom';
import LandingPage from './dashboard/LandingPage';
import ProtectedRouting from './dashboard/ProtectedRouting';
import { useContext } from 'react';
import { AdminContext } from './context/AdminContextProvider';
import Register from './components/Authentication/Register';



function App() {
  const { isAdmin } = useContext(AdminContext)
  return (
    <>
      <div style={{ backgroundColor: '#FAFAFA' }} >
        {/* i have to make the all background-color: #FAFAFA; so i cr
        eate the div and wrap the routes here and anything in it , so the all body color is same; */}
        <Toaster />
        <Routes>
          <Route path='/login' element={!isAdmin ? <Login /> : <Navigate to="/" />} />
          {/* <Route path='/register' element={<Register />} /> */}
          <Route path='/*' element={<Navigate to="/" />} />
          {/* <Route path='/forgot-Password' element={<ForgotPassword />} /> */}
          <Route path='/' element={<LandingPage />} />
          <Route path='/add-menu' element={
            <ProtectedRouting>
              <Home />
            </ProtectedRouting>
          } />
          <Route path='/order' element={<Order />} />
        </Routes>
      </div>
    </>
  );
}

export default App;