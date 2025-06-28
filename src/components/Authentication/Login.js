import React, { useContext, useState } from 'react';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AdminContext } from '../../context/AdminContextProvider';

// const provider = new GoogleAuthProvider();
const initialState = { email: '', password: '' }
const Login = () => {
  const { dispatch } = useContext(AdminContext)

  const [user, setUser] = useState(initialState)
  const navigate = useNavigate()
  const handleValue = (e) => setUser((s) => ({ ...s, [e.target.name]: e.target.value }))
  const loginUser = (e) => {
    e.preventDefault();
    const auth = getAuth();
    const { email, password } = user
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
        const user = userCredential.user;
        if (user.email == "schoolold454@gmail.com") {
          // dispatch({ isAdmin: true, isAuthenicate: true, payload: { user } })
          dispatch({ type: 'SET_ADMIN', payload: { user } })
          console.log('user', user)
          toast.success('Admin Login Successfully')
          navigate('/')
          // ...
        } else {
          dispatch({ type: 'SET_USER_LOGIN', payload: { user } })
          console.log('user', user)
          toast.success('User Login Successfully')
          navigate('/')

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
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div className="container">
        <div
          className="card shadow p-4"
          style={{ maxWidth: "500px", margin: "0 auto", borderRadius: "16px" }}
        >
          <div className="text-center mb-4">
            <h2 className="text-success">Admin Credentials</h2>
            <p className="text-muted">Please login to continue</p>
          </div>

          <form onSubmit={loginUser} className="form">
            <div className="mb-3">
              <input
                onChange={handleValue}
                name="email"
                type="email"
                className="form-control"
                placeholder="Email"
              />
            </div>

            <div className="mb-3">
              <input
                onChange={handleValue}
                name="password"
                type="password"
                className="form-control"
                placeholder="Password"
              />
            </div>

            <Button
              type="primary"
              htmlType="submit"
              className="w-100 mt-2"
              style={{ backgroundColor: "#28a745", borderColor: "#28a745" }}
              onClick={loginUser}
            >
              Login
            </Button>

            {/* <div className="text-center mt-4">
              <p className="text-white">
                Don't have an account?{" "}
                <Link to="/register" className="text-warning text-decoration-none">
                Register
              </Link>
              </p>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
