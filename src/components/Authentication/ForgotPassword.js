import React, { useState } from 'react';
import { getAuth, onAuthStateChanged, sendPasswordResetEmail, } from "firebase/auth";
import { Button } from 'antd';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

// const provider = new GoogleAuthProvider();
const ForgotPassword = () => {
    const [existingEmail, setExistingEmail] = useState({ email: '' })
    const handleValue = (e) =>  setExistingEmail({ email: e.target.value })
    const navigate = useNavigate()
    // console.log('existingEmail', existingEmail)
    const forgotPassword =  () => {
        const auth = getAuth();
        const user = auth.currentUser
        console.log('user', user)
        console.log('auth.currentUser.email', auth.currentUser.email)
        const { email } = existingEmail
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
        sendPasswordResetEmail(auth, email)
            .then(() => {
                console.log('Email send successfully',email)
                // Password reset email sent!
                toast.success('Password Reset Email has been Sent! Check your Mail-Box')
                navigate('/')
                // ..
            })
            .catch((error) => {
                console.log('email send failed')
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('errorMessage', errorMessage)
                toast.error('Error while Sending Password Reset Email')
                // ..
            });
    }
    return (
        <div >
            <div className="container">
                <div className="cta-form">
                    <h2>Forgot Password!</h2>
                </div>
                <form onSubmit={forgotPassword} className="form">
                    <div className="form-group">
                        <input onChange={handleValue} name='fullName' type="email" placeholder="Name" className="form__input" />
                        <label htmlFor="name" className="form__label">Forgot Password</label>
                    </div>

                    {/* <div className="form-group">
                        <input onChange={handleValue} name='email' type="email" placeholder="Email" className="form__input" />
                        <label htmlFor="email" className="form__label">Email</label>
                    </div>

                    <div className="form-group">
                        <input onChange={handleValue} name='password' type="password" placeholder="Password" className="form__input" />
                        <label htmlFor="password" className="form__label">Password</label>
                    </div> */}
                    {/* <div className="row">
            <div className="col">
            </div>
          </div> */}
                    {/* <div className="row">
                        <div className="col">
                            <Link to={'/forgot-Password'} className='w-100 '>Forgot Password</Link>
                        </div>
                    </div> */}
                    <Link to={'/'}>Login</Link>
                    <Button className='ms-2' onClick={forgotPassword}>Submit</Button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
