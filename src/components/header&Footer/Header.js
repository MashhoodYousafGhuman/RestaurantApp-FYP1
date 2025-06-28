import React, { useContext, useEffect, useState } from 'react'
import { FaShoppingBasket, FaShoppingCart } from 'react-icons/fa';
import logoPng from '../../assest/images/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import { AdminContext } from '../../context/AdminContextProvider';
import { useCart } from '../../context/CartContext';
import { Button, Input, Modal, message } from 'antd';
export default function Header() {
  // const [isAdmin, setIsAdmin] = useState(() => {
  //   return localStorage.getItem("isAdmin") === "true";
  // });

  const navigate = useNavigate();
  const [cartModal, setCartModal] = useState(false)
  const [address, setAddress] = useState('');
  const [addressInput, setAddressInput] = useState(false)

  const hideCartModal = () => setCartModal(false)
  const showCartModal = () => setCartModal(true)

  let { cart, setCart, totalItemsQuantity, totalAmount } = useCart()

  const { isAdmin, dispatch } = useContext(AdminContext);
  // useEffect(() => {

  //   const admin = localStorage.getItem("isAdmin") === "true";
  //   setIsAdmin(admin);
  // }, []);
  const addMenu = () => navigate("/add-menu");

  const showAddressInput = () => {
    setAddressInput(true)
  }

  const handleOrder = () => {
    if (address.trim().length < 3) {
      message.error('Please enter your address');
      return;
    }
    message.success('Your Order has been Placed')
    setAddress('')
    setAddressInput(false)
    setCart([])
    setCartModal(false);
  }

  const handleLogout = () => {
    dispatch({ type: 'SET_LOGOUT' }); //  This clears isAdmin and localStorage
    navigate('/login'); 
  };

  return (
    <>

      <header className='' style={{ backgroundColor: '#FAFAFA', position: "sticky", top: 0, zIndex: 100, fontFamily: "poppins", }} >
        <nav style={styles.text} className="container-fluid  navbar navbar-expand-lg bg-body-tertiary">
          <div className=" m-2  container-fluid">
            <a aria-disabled className="navbar-brand" href="#">
              <img src={logoPng} style={{ width: 40 }} />
            </a>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
                className="navbar-nav me-auto mb-2 mb-lg-0">
                {
                  isAdmin &&
                  (
                    <li className="btn bt-info ms-2" onClick={addMenu}>
                      Access Admin Page
                    </li>
                  )
                }
              </ul>
              {
                isAdmin ? (
                  <button
                    onClick={handleLogout}
                    style={styles.shopBtn}
                    className="btn btn-outline-success me-5"
                  >
                    Logout
                  </button>
                ) :
                  (
                    <button style={styles.shopBtn} className="btn btn-outline-success me-5" >
                      <Link to="/login" style={{ textDecoration: 'none', color: 'white' }}>
                        Admin Route
                      </Link>
                    </button>
                  )
              }
            </div>
            <div onClick={showCartModal} className='me-3 ' style={{ cursor: "pointer" }}>
              {totalItemsQuantity > 0 && (
                <span className="start-100 badge rounded-pill bg-danger">
                  {totalItemsQuantity}
                </span>
              )}
              <FaShoppingBasket size={25} color="grey" />
            </div>
          </div>
        </nav>

      </header >
      <Modal
        title="Cart 🛒"
        open={cartModal}
        onCancel={hideCartModal}
        footer={[
          <Button key="back" onClick={hideCartModal}>
            Continue Shopping
          </Button>,
          addressInput && totalItemsQuantity > 0 ? (
            <Button
              onClick={handleOrder}
              key="submit"
              type="primary"

            >

              Confirm Order
            </Button>
          ) : (
            <Button
              onClick={showAddressInput}
              key="submit"
              type="primary"
              disabled={totalItemsQuantity === 0}
            >
              Proceed to Checkout
            </Button>
          )
        ]}
      >
        <div>
          {
            totalItemsQuantity === 0 ? (
              <p className="text-center text-muted fs-5">🛒 Your cart is empty, buddy!</p>
            ) : (
              <>
                {cart.map((cartItem, i) => {
                  if (!cartItem) return null;
                  const { name, price, quantity, picture } = cartItem;

                  return (
                    <div key={i} className="mb-3 p-3 border rounded shadow-sm bg-light d-flex justify-content-between align-items-center">
                      {/* Text Info */}
                      <div>
                        <p className="mb-1"><strong>🍽️ Item:</strong> {name}</p>
                        <p className="mb-1"><strong>💰 Price:</strong> Rs. {price}</p>
                        <p className="mb-0"><strong>🔢 Quantity:</strong> {quantity}</p>
                      </div>

                      {/* Image */}
                      <img
                        src={picture}
                        alt={name}
                        style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "10px", marginLeft: "15px" }}
                      />
                    </div>
                  );
                })}

                <div className="mt-4">
                  <p className="fw-bold text-success fs-5 d-flex align-items-center gap-2">
                    💳 Total Payable:
                    <span className="text-danger fs-4">Rs. {totalAmount}</span> 🎉
                  </p>
                </div>
              </>
            )
          }

        </div>
        {
          addressInput &&
          <div className=" me-3 mt-4 mb-3 ">
            <input
              name="address"
              type="text"
              className="form-control m-0 "
              placeholder="Enter Your Address Here"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        }
      </Modal >
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