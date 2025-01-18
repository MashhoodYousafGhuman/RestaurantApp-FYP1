import React from 'react'
import { FaShoppingBasket, FaShoppingCart } from 'react-icons/fa';
import { MdAddShoppingCart } from 'react-icons/md'
export default function Header() {
  return (
    <>
      <header className='' style={{ backgroundColor: ' #FAFAFA', fontFamily: "poppins", }} >
        <nav style={styles.text} className="container-fluid  navbar navbar-expand-lg bg-body-tertiary">
          <div className=" m-2  container-fluid">
            <a className="navbar-brand" href="#">
              Navbar
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
                display: "flex", // Flexbox for layout
                justifyContent: "center", // Center horizontally
                width: "100%", // Ensure the container spans the full width
                // backgroundColor:'aqua'
              }}
                className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Menu
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link " aria-disabled="true">
                    Contact
                  </a>
                </li>
              </ul>
              <div className='me-4' >
              <FaShoppingBasket size={25} color="grey"  />
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
    width: '160px',
    color: "white",
    height: '45px',
    fontFamily: "inter , serif",
  },
}