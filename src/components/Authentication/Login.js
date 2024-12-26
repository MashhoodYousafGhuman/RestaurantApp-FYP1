import React, { useContext, useState } from 'react';
import './register.scss'; // import your CSS file here if needed
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import auth from '../../config/firebase'
import { Button, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AdminContext } from '../../context/AdminContextProvider';

// const provider = new GoogleAuthProvider();
const initialState = { email: '', password: '' }
const Login = () => {
  const { isAdmin, dispatch } = useContext(AdminContext)
  console.log('isAdmin ? from Login File', isAdmin)

  const [user, setUser] = useState(initialState)
  const navigate = useNavigate()
  const handleValue = (e) => setUser((s) => ({ ...s, [e.target.name]: e.target.value }))
  const loginUser = (e) => {
    e.preventDefault();
    const auth = getAuth();
    const { email, password } = user
    // const ADMIN_EMAIL = "admin@myg.com";
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log('user', user)
        // ...
      } else {
        console.log('no user available')
        // User is signed out
        // ...
      }
    });
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (user.email == "admin@myg.com") {
          // dispatch({ isAdmin: true, isAuthenicate: true, payload: { user } })
          dispatch({ type: 'SET_ADMIN', payload: { user } })
          console.log('user', user)
          toast.success('Admin Login Successfully')
          navigate('/home')
          // ...
        } else {
          dispatch({ type : 'SET_USER_LOGIN', payload: { user } })
          console.log('user', user)
          toast.success('User Login Successfully')
          navigate('/home')

        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`err catched while loging in error:${error}`)
        toast.error('Incorrect Username or Password')
      });
  }
  return (
    <div >
      <div className="container">
        <div className="cta-form">
          <h2>Login form!</h2>
        </div>
        <form onSubmit={loginUser} className="form">
          <div className="form-group">
            <input onChange={handleValue} name='fullName' type="text" placeholder="Name" className="form__input" />
            <label htmlFor="name" className="form__label">Name</label>
          </div>

          <div className="form-group">
            <input onChange={handleValue} name='email' type="email" placeholder="Email" className="form__input" />
            <label htmlFor="email" className="form__label">Email</label>
          </div>

          <div className="form-group">
            <input onChange={handleValue} name='password' type="password" placeholder="Password" className="form__input" />
            <label htmlFor="password" className="form__label">Password</label>
          </div>
          {/* <div className="row">
            <div className="col">
            </div>
          </div> */}
          <div className="row">
            <div className="col">
              <Link to={'/forgot-Password'} className='w-100 '>Forgot Password</Link>
            </div>
          </div>
          <Button onClick={loginUser}>Login</Button>
          <div className="row">
            <div className="col">
              <Space>
                <p >Don't Have an Account? <Link to={'/register'}>Register</Link></p>
              </Space>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
