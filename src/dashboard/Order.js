import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { MenuContext } from "../contexts/MenuItemContext";
import { Button, Image, Modal } from "antd";
import { collection, getDocs, query } from "firebase/firestore/lite";
import { firestore } from "../config/firebase";
import toast from "react-hot-toast";
import { AdminContext } from "../context/AdminContextProvider";

export default function Order() {
  const navigate = useNavigate();

  const { isAdmin } = useContext(AdminContext)
  console.log('isAdmin from Order File', isAdmin)
  const [cartModal, setCartModal] = useState(false)
  const [itemQuantities, setitemQuantities] = useState({})
  const [menu, setMenu] = useState([])
  const [cart, setCart] = useState([])
  // id is also getting from menu because menu is an array where the menuitem is storing;
  // const { menu } = useContext(MenuContext);
  console.log('menu', menu)
  const showCartModal = () => setCartModal(true)
  const hideCartModal = () => setCartModal(false)

  const fetchData = async () => {
    const q = query(collection(firestore, "Menus"));
    let array = []
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      let data = doc.data()
      console.log('data', data)
      array.push(data)
      console.log(doc.id, " => ", doc.data());
    });
    setMenu(array)
  }
  useEffect(() => { fetchData() }, [])
  const addMenu = () => navigate("/add-menu");

  // const increaseitemQuantities = (id) => {
  //     setitemQuantities((s)=> ({...s , [id] : (s[id] || 0 ) + 1}) ) 
  //     console.log('id', id)
  //   }

  const increaseitemQuantities = (id) => setitemQuantities(s => ({ ...s, [id]: (s[id] || 0) + 1 }))

  const decreaseitemQuantities = (id) => setitemQuantities((s) => {
    const currentQuantity = s[id] || 1;
    if (currentQuantity > 0) {
      return { ...s, [id]: currentQuantity - 1 }
    } else {
      return s;
    }
  })

  const handleAddToCart = (id) => {
    console.log('id', id)
    const item = menu.find(menuItems => menuItems.id === id);
    console.log('item', item)

    let quantity = itemQuantities[id] || 1;
    console.log('quantity', quantity)

    try {
      if (quantity > 0) {
        console.log('quantity', quantity)
        setCart((s) => {
          console.log('s', s)

          const existingItem = s.find(cartItem => cartItem.id === id)
          console.log('existingItem', existingItem)

          if (existingItem) {
            return s.map(cartItem =>
              cartItem.id === id
                ? { ...cartItem, quantity: cartItem.quantity + quantity }
                : cartItem
            )
          }
          else {
            console.log('existingItem', existingItem)
            return [...s, { ...item, quantity }]
          }
        })
        toast.success('Item Added to Cart Successfully')
      }
    } catch (error) {
      toast.error('Error while adding Item to Cart')
    }
  };
  const totalItemsQuantity = cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
  console.log('menu', menu)
  const burgerItems = menu.filter((item) => item.category === 'Burger')
  const pizzaItems = menu.filter((item) => item.category === 'Pizza')
  const dealItems = menu.filter((item) => item.category === 'Deals')
  console.log('burgerItems', burgerItems)
  return (
    <>
      {isAdmin &&
        <button className="btn btn-info ms-2" onClick={addMenu}>
          Admin Page
        </button>
      }
      {/* <p className=" ms-2 mb-0 btn btn-info" onClick={showCartModal} >Check Items : {totalItemsQuantity} </p> */}
      {/* <p className=" ms-2 mb-0 btn btn-info"  ><Link to={'/home'} >Home</Link></p> */}

      <div className="container"  >
        <div className="row  ">
          <div className="col">
            <h3 style={{fontFamily:'inter'}} className="">Burgers</h3>
            <br />
          </div>
        </div>
        <div className="row">
          {burgerItems.map((item, i) => {
            if (!item) return null;
            let { name, description, price, category, picture, id } = item;
            return (
              <div className=" col-12 col-sm-6  col-lg-3 mt-3 ">
                <div key={i} style={styles.Card}>
                  <div className="mb-3" style={{ display: 'flex', justifyContent: "center", paddingTop: 30, paddingRight: 20, }}>
                    <Image width={170} height={130} src={'https://g-cdn.blinkco.io/ordering-system/55485/dish_image/1734695083.jpg'} style={{ borderRadius: 40, border: 'none' }} />
                  </div>
                  <p className="mb-1" style={{ fontFamily: "inter", fontWeight: 550 }} >{name}</p>
                  {/* <p>{description}</p> */}
                  <p style={{ fontFamily: "inter", fontWeight: 400 }}> {price}</p>
                  {/* <p>{category}</p> */}
                  <div className="text-center mb-2">
                    <Button onClick={() => decreaseitemQuantities(id)}> - </Button>
                    <span>{itemQuantities[id] || 1} </span>
                    <Button onClick={() => increaseitemQuantities(id)}> + </Button>
                  </div>
                  <button style={styles.cartBtn} className="btn btn-primary" onClick={() => handleAddToCart(id)} > Add to cart </button>
                </div>
              </div>
            );
          })}
        </div>
        {dealItems && (
          <div className="row">
            <div className="col-12">
              <h3 style={{fontFamily:'inter'}} className="mt-3">Deals</h3>
            </div>
            <div className="row">
              {dealItems.map((item, i) => {
                if (!item) return null;
                let { name, description, price, category, picture, id } = item;
                return (
                  <div className=" col-12 col-sm-6  col-lg-3 mt-3 ">
                    <div key={i} style={styles.Card}>
                      {/* <Image width={200} height={200} src={picture} /> */}
                      <div className="mb-3" style={{ display: 'flex', justifyContent: "center", paddingTop: 30, paddingRight: 20, }}>
                        <Image width={170} height={130} src={'https://g-cdn.blinkco.io/ordering-system/55485/dish_image/1734695083.jpg'} style={{ borderRadius: 40, border: 'none' }} />
                      </div>
                      <p className="mb-1" style={{ fontFamily: "inter", fontWeight: 550 }} >{name}</p>
                      <p className="mb-1" style={{ fontFamily: "inter", fontWeight: 400 }}>{description}</p>
                      <p style={{ fontFamily: "inter", fontWeight: 400 }}>{price}</p>
                      {/* <p>{category}</p> */}
                      <div className="text-center mb-2">
                        <Button onClick={() => decreaseitemQuantities(id)}> - </Button>
                        <span>{itemQuantities[id] || 1} </span>
                        <Button onClick={() => increaseitemQuantities(id)}> + </Button>
                      </div>
                      <button style={styles.cartBtn} className="btn btn-primary" onClick={() => handleAddToCart(id)} > Add to cart </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {pizzaItems.length > 0 && (
          <div className="row">
            <div className="col-12">
              <h3 style={{fontFamily:'inter'}} className="mt-3">Pizza</h3>
            </div>
            <div className="row">
              {pizzaItems.map((item, i) => {
                if (!item) return null;
                let { name, description, price, category, picture, id } = item;
                return (
                  <div className=" col-12 col-sm-6  col-lg-3 mt-3 ">
                    <div key={i} style={styles.Card}>
                      {/* <Image width={200} height={200} src={picture} /> */}
                      <div className="mb-3" style={{ display: 'flex', justifyContent: "center", paddingTop: 30, paddingRight: 20, }}>
                        <Image width={170} height={130} src={'https://g-cdn.blinkco.io/ordering-system/55485/dish_image/1734695083.jpg'} style={{ borderRadius: 40, border: 'none' }} />
                      </div>
                      <p className="mb-1" style={{ fontFamily: "inter", fontWeight: 550 }} >{name}</p>
                      {/* <p>{description}</p> */}
                      <p style={{ fontFamily: "inter", fontWeight: 400 }}>{price}</p>
                      {/* <p>{category}</p> */}
                      <div className="text-center mb-2">
                        <Button onClick={() => decreaseitemQuantities(id)}> - </Button>
                        <span>{itemQuantities[id] || 1} </span>
                        <Button onClick={() => increaseitemQuantities(id)}> + </Button>
                      </div>
                      <button style={styles.cartBtn} className="btn btn-primary" onClick={() => handleAddToCart(id)} > Add to cart </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {/* Cart Model */}
        <Modal title='Cart' open={cartModal} onCancel={hideCartModal}
          footer={[
            <Button key="back" onClick={hideCartModal}>
              Close
            </Button>
          ]}
        >
          <div>
            {cart.map((cartItem, i) => {
              if (!cartItem) return null;
              let { name, price, quantity, } = cartItem;
              return (
                <div key={i}  >
                  <p className="mb-0" >{name}</p>
                  <p className="mb-0" >Price : {price}</p>
                  <p className="mb-0">quantity : {quantity}</p>
                </div>
              );
            })}
          </div>
        </Modal>
            <hr style={{marginTop:55 ,color:'#39DB4A'}} />
      </div>
    </>
  );
}

{/* <div class="row ">
  <div class="col-12 col-sm-6  col-lg-3 mt-3 " id="mart">
    <div class="card border-0  ">
      <img src="./WhatsApp Image 2024-02-27 at 9.50.27 AM (1).jpeg" alt="" />
        <span class="bg-black text-white  position-absolute py-2 px-3"> Barn House</span>
    </div>
  </div>
</div> */}

const styles = {
  Card: {
    backgroundColor: "#FFFFFF",
    // height:323,
    borderRadius: 40,
    paddingLeft: 20,
    // width:446,
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  },
  cartBtn: {
    backgroundColor: '#39DB4A',
    border: 'none',
    marginTop: 8,
    marginBottom: 18,
  }
}