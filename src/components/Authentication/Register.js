import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Button, Space } from 'antd';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const provider = new GoogleAuthProvider();
const initialState = { email: '', password: '' }
const Register = () => {
  const [user, setUser] = useState(initialState)
  const handleValue = (e) => setUser((s) => ({ ...s, [e.target.name]: e.target.value }))

  function signInWithGoogle() {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // Successful sign-in
        const user = result.user;
        console.log("User registered using google:", user);
        // You can save user info or redirect them here
      })
      .catch((error) => {
        console.error("Error during Google Sign-In:", error);
      });
  }
  const registerUser = () => {
    const auth = getAuth();
    const { email, password } = user
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log('user', user)
        sendEmailVerification(auth.currentUser)
          .then(() => {
            console.log('auth.currentUser', auth.currentUser)
            console.log('Email verification sent!')
            // Email verification sent!
            // ...
          })
          .catch((err) => {
            console.log('err cathed while registration', err)
            console.log('Email verification sent Failed!')
          });
        // ...
        toast.success('User Registered Successfully')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('errorMessage', errorMessage)
        toast.error('error while registering user')
        // ..
      });

  }
  return (
    <div >
      <div className="container">
        <div className="cta-form">
          <div className="row">
            <div className="col">
              <h2>Fill out the Registration form!</h2>
            </div>
          </div>
        </div>
        <form onSubmit={registerUser} className="form">
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
          <div className="row">
            <div className="col">
              <Space>
                <Button className='w-100' onClick={registerUser}>Register</Button>
                <Button className='w-100' onClick={signInWithGoogle}>Sign in with Google</Button>
              </Space>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p className=' m-2'>Already Have an account? <Link to={'/'} > Login</Link></p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
