import React, { useContext } from 'react'
import heroImage from "../assest/images/burger-food_884653-6867.jpg"
import './hero.scss'
import Order from './Order'
import { AdminContext } from '../context/AdminContextProvider'
import Header from '../components/header&Footer/Header';
import Footer from '../components/header&Footer/Footer';
import 'animate.css';

export default function Hero() {

  const { isAdmin } = useContext(AdminContext)
  console.log('isAdmin', isAdmin)
  return (
    <>
      <Header/>
      <div className="d-flex mb-5 " id='hero-section' >
        <div className="container-fluid d-flex ps-4" id='cf' >
      
          <div className="bg-body-  p-4 w-50">
          <div className="row bg-dangser">

            <div className="row   " id='text'>
              <div className="col ">
                <h1 style={styles.text} className='text' >DISCOVER FOODS THAT MATCH YOUR <span style={{color:'#39DB4A', lineHeight:'1.5'}}>TASTE</span></h1>

              </div>
            </div>
            <div className="row pt-1">
              <div className="col">
                <p className='delicousLine' style={{fontFamily:"Inter , serif", fontWeight:500, color:'#4A4A4A'}}  >Delicious Pizza's, Burgers and much more</p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <button className='shopBtn' style={styles.shopBtn} >Order Now</button>
              </div>
            </div>
          </div>
          </div>
          <div className="row d-none d-sm-block bg-warninsg">
            <div className="col  ">
              <div style={styles.borderImage} className="img-fluid ">
                <img className='animate  img-fluid' src={heroImage}  style={{ width: '100%', height: '100%' }} alt="burgerImage" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Order />
      <Footer />
    </>
  )
}
const styles = {
  borderImage: {
    width: '480px', // Adjust size as needed
    height: '480px',
    borderRadius: '50%',
    overflow: 'hidden',
  },
  text: {
    fontFamily: "Inter , serif",
    fontOpticalSizing: "auto",
    fontWeight: 800,
    fontStyle: "Bold",
  },
  shopBtn:{
    backgroundColor: '#39DB4A',
    border: 'none',
    borderRadius: '40px',
    width: '120px',
    height: '45px',
    color:'white'
},
}
