import React, { useContext } from 'react'
import { FaShoppingBasket, FaShoppingCart } from 'react-icons/fa';
import { MdAddShoppingCart } from 'react-icons/md'
import logoPng from '../../assest/images/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import { AdminContext } from '../../context/AdminContextProvider';
export default function Header({ totalItemsQuantity }) {
  const navigate = useNavigate();


  const { isAdmin } = useContext(AdminContext)
  console.log('isAdmin', isAdmin)
  const addMenu = () => navigate("/add-menu");

  return (
    <>

      <header className='' style={{ backgroundColor: '#FAFAFA', position: "sticky", top: 0, zIndex: 100, fontFamily: "poppins", }} >
        <nav style={styles.text} className="container-fluid  navbar navbar-expand-lg bg-body-tertiary">
          <div className=" m-2  container-fluid">
            <a aria-disabled className="navbar-brand" href="#">
              <img src={logoPng} style={{ width: 40 }} />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
                className="navbar-nav me-auto mb-2 mb-lg-0">
                {/* <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a aria-disabled  > Menu <Link to = {'/order'} /> </a>
                  <Link to="/order" >Menu</Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link " aria-disabled="true">
                    Contact
                  </a>
                </li> */}
                {
                  isAdmin &&
                  <li className="btn bt-info ms-2" onClick={addMenu}>
                    Access Admin Page
                  </li>
                }
              </ul>
              <div className='me-4' >
                <FaShoppingBasket size={25} color="grey" /> {totalItemsQuantity}
              </div>
              <button style={styles.shopBtn} className="btn btn-outline-success" type="submit">
                Register/Login
              </button>
            </div>
          </div>
        </nav>
      </header >
    </>
  )
}
const styles = {
  text: {
    fontFamily: "Poppins , serif",
    fontWeight: 500,
    fontStyle: 'normal',
    maxWidth: '89vw'
  },
  shopBtn: {
    backgroundColor: '#39DB4A',
    border: 'none',
    borderRadius: '40px',
    width: '155px',
    color: "white",
    fontSize: 15,
    height: '38px',
    fontFamily: "inter , serif",
  },
}