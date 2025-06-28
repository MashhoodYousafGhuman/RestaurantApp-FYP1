import Aos from "aos";
import 'aos/dist/aos.css';
import React, { Suspense, lazy, useEffect, useState } from "react";
import { Button, Image, Modal } from "antd";
import { collection, getDocs, query } from "firebase/firestore/lite";
import { firestore } from "../config/firebase";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
const Loadingloader = lazy(() => import("../components/Loader/Loadingloader"));

export default function Order() {
  const [isLoading, setIsLoading] = useState(false)
  const [cartModal, setCartModal] = useState(false)
  const [itemQuantities, setitemQuantities] = useState({})
  const [menu, setMenu] = useState([])
  const { cart, setCart } = useCart()
  const [burgerItems, setBurgerItems] = useState([])
  const [pizzaItems, setPizzaItems] = useState([])
  const [dealItems, setDealItems] = useState([])

  useEffect(() => {
    Aos.init({
      duration: 500,
      once: true,
      delay: 0,
    });
  }, []);
  useEffect(() => {
    if (!isLoading && menu.length > 0) {
      Aos.refresh();
    }
  }, [isLoading, menu]);


  const showCartModal = () => setCartModal(true)
  const hideCartModal = () => setCartModal(false)

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const q = query(collection(firestore, "Menus"));
      const querySnapshot = await getDocs(q);
      const items = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMenu(items);

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1800);
      setIsLoading(false);
    }
  }
  useEffect(() => { fetchData() }, [])
  // const addMenu = () => navigate("/add-menu");

  // const increaseitemQuantities = (id) => {
  //     setitemQuantities((s)=> ({...s , [id] : (s[id] || 0 ) + 1}) ) 
  //     console.log('id', id)
  //   }

  const increaseitemQuantities = (id) => setitemQuantities(s => ({ ...s, [id]: (s[id] || 1) + 1 }))

  const decreaseitemQuantities = (id) => setitemQuantities((s) => {
    const currentQuantity = s[id] || 1;
    if (currentQuantity > 1) {
      return { ...s, [id]: currentQuantity - 1 }
    } else {
      return s;
    }
  })

  const handleAddToCart = (id) => {
    // console.log('id', id)
    const item = menu.find(menuItems => menuItems.id === id);
    // console.log('item', item)

    let quantity = itemQuantities[id] || 1;
    // console.log('quantity', quantity)

    try {
      if (quantity > 0) {
        // console.log('quantity', quantity)
        setCart((s) => {
          // console.log('s', s)

          const existingItem = s.find(cartItem => cartItem.id === id)
          // console.log('existingItem', existingItem)

          if (existingItem) {
            return s.map(cartItem =>
              cartItem.id === id
                ? { ...cartItem, quantity: cartItem.quantity + quantity }
                : cartItem
            )
          }
          else {
            // console.log('existingItem', existingItem)
            return [...s, { ...item, quantity }]
          }
        })
        toast.success('Item Added to Cart Successfully')
      }
    } catch (error) {
      toast.error('Error while adding Item to Cart')
    }
  };

  useEffect(() => {
    if (menu.length > 0) {
      const burgers = [], pizzas = [], deals = [];
      menu.forEach(item => {
        if (item.category === 'Burger') burgers.push(item);
        else if (item.category === 'Pizza') pizzas.push(item);
        else if (item.category === 'Deals') deals.push(item);
      });
      setBurgerItems(burgers);
      setPizzaItems(pizzas);
      setDealItems(deals);
    }
  }, [menu]);

  return (
    <>
      {isLoading
        ?
        (<Suspense fallback={<div>Loading...</div>}>
          <Loadingloader />
        </Suspense>)
        :
        (<div className="container"  >
          <div className="row ">
            <div className="col ">
              <h3 style={{ fontFamily: 'inter' }} className="">Burgers</h3>
              <br />
            </div>
          </div>
          <div className="row" data-aos="fade-up">
            {burgerItems.map((item, i) => {
              if (!item) return null;
              let { name, description, price, picture, id } = item;
              return (
                <div className=" col-6 col-lg-3 mt-0 mb-3 ">
                  <div key={item.id || i} style={styles.Card}>
                    <div className="mb-3" style={{ display: 'flex', justifyContent: "center", paddingTop: 30, paddingRight: 20, }}>
                      <Image loading="lazy" width={170} height={130} src={picture} alt={name} style={{ borderRadius: 40, border: 'none' }} />
                    </div>
                    <p className="mb-1" style={{ fontFamily: "inter", fontWeight: 550 }} >{name}</p>
                    <p className="mb-1 me-3 " style={{ fontFamily: "inter", fontWeight: 400 }}>{description}</p>
                    <p style={{ fontFamily: "inter", fontWeight: 400 }}> {price}</p>
                    <div className="text-center mb-2">
                      <Button onClick={() => decreaseitemQuantities(id)}> - </Button>
                      <span> {itemQuantities[id] || 1} </span>
                      <Button onClick={() => increaseitemQuantities(id)}> + </Button>
                    </div>
                    <button style={styles.cartBtn} className="btn btn-primary" onClick={() => handleAddToCart(id)} > Add to cart </button>
                  </div>
                </div>
              );
            })
            }
          </div>
          {dealItems && (
            <div className="row" data-aos="fade-left">
              <div className="col-12">
                <h3 style={{ fontFamily: 'inter' }} className="mt-2 mb-2">Deals</h3>
              </div>
              <div className="row" >
                {dealItems.map((item, i) => {
                  if (!item) return null;
                  let { name, description, price, picture, id } = item;
                  return (
                    <div className=" col-12 col-sm-6  col-lg-3 mt-3 ">
                      <div key={item.id || i} style={styles.Card}>
                        <div className="mb-3" style={{ display: 'flex', justifyContent: "center", paddingTop: 30, paddingRight: 20, }}>
                          <Image loading="lazy" width={170} height={130} src={picture} alt={name} style={{ borderRadius: 40, border: 'none' }} />
                        </div>
                        <p className="mb-1" style={{ fontFamily: "inter", fontWeight: 550 }} >{name}</p>
                        <p className="mb-1" style={{ fontFamily: "inter", fontWeight: 400 }}>{description}</p>
                        <p style={{ fontFamily: "inter", fontWeight: 400 }}>{price}</p>
                        <div className="text-center mb-2">
                          <Button onClick={() => decreaseitemQuantities(id)}> - </Button>
                          <span> {itemQuantities[id] || 1} </span>
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
            <div className="row " data-aos="fade-down" >
              <div className="col-12">
                <h3 style={{ fontFamily: 'inter' }} className="mt-4 mb-2">Pizza</h3>
              </div>
              <div className="row mb-2" >
                {pizzaItems.map((item, i) => {
                  if (!item) return null;
                  let { name, description, price, picture, id } = item;
                  return (
                    <div className=" col-12 col-sm-6  col-lg-3 mt-3 ">
                      <div key={item.id || i} style={styles.Card}>
                        <div className="mb-3" style={{ display: 'flex', justifyContent: "center", paddingTop: 30, paddingRight: 20, }}>
                          <Image loading="lazy" width={170} height={130} src={picture} alt={name} style={{ borderRadius: 40, border: 'none' }} />

                        </div>
                        <p className="mb-1" style={{ fontFamily: "inter", fontWeight: 550 }} >{name}</p>
                        <p className="mb-1" style={{ fontFamily: "inter", fontWeight: 400 }}>{description}</p>
                        <p style={{ fontFamily: "inter", fontWeight: 400 }}>{price}</p>
                        <div className="text-center mb-2">
                          <Button onClick={() => decreaseitemQuantities(id)}> - </Button>
                          <span> {itemQuantities[id] || 1} </span>
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
        </div>)
      }
      {/* Cart Model  for showing total items*/}
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
              <div key={cartItem.id || i}  >
                <p className="mb-0" >{name}</p>
                <p className="mb-0" >Price : {price}</p>
                <p className="mb-0">quantity : {quantity}</p>
              </div>
            );
          })}
        </div>
      </Modal>
      <hr style={{ marginTop: 55, color: '#39DB4A' }} />
    </>
  );
}

const styles = {
  Card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 40,
    paddingLeft: 20,
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  },
  cartBtn: {
    backgroundColor: '#39DB4A',
    border: 'none',
    marginTop: 8,
    marginBottom: 18,
  }
}