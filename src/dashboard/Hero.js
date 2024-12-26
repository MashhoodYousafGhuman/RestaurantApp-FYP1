import React, { useContext } from 'react'
import heroImage from '../assest/images/pizza.jpg'
// import vectorPng from '../assets/pngs/heroImage.png'
import './hero.scss'
import Order from './Order'
import { Carousel } from 'antd';
import { Link } from 'react-router-dom'
import Items from './Items'
import { AdminContext } from '../context/AdminContextProvider'
// import LogosBanner from '../logosBanner/LogosBanner'
export default function Hero() {

  const { isAdmin } = useContext(AdminContext)
  console.log('isAdmin', isAdmin)

  const contentStyle = {
    height: '90vh',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };
  return (
    <>
      <Carousel autoplay>
        <div>
          {/* <h3 style={contentStyle}> */}
          <img src={heroImage} className='img-fluid'  alt="" id='img'/>
            <img src={'./'} alt="" />
          {/* </h3> */}
        </div>
        <div>
          <h3 style={contentStyle}>
          <img src={heroImage} className='img-fluid'  alt="" id='img'/>
          2
          </h3>
        </div>
        <div>
          <img src={heroImage} className='img-fluid'  alt="" id='img'/>
          <h3 style={contentStyle}>
          3
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
          <img src={heroImage} className='img-fluid'  alt="" id='img'/>
          4
          </h3>
        </div>
      </Carousel>

      {/* <div className="" id='hero-section' >
        <div className="container-fluid" id='cf' >

          <div className="row pt-5 pb-2" id='text'>
            <div className="col ">
              <h1 className='text-white' >DISCOVER FOODS <br/> THAT MATCH <br/> YOUR TASTE</h1>
              
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p className='text-white' >Delicious Pizza's, Burgers and much more</p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <button className='shopBtn' ><Link style={{textDecoration:'none',color:'white'}} to={'/order'}>Order Now</Link></button>
            </div>
          </div> */}
      {/* <div className="row pt-5 ">
            <div className="numbers d-flex">
              <div className="row" id='n1'>
                <div className="col">
                  <h3>200+</h3>
                  <p>International Food Brands</p>
                </div>
                <div className="col">
                  <h3>2000+</h3>
                  <p>High Quality Dishes</p>
                </div>
                <div className="col">
                  <h3>30000+</h3>
                  <p>Happy Costumers</p>
                </div>
              </div>
            </div>
          </div> */}
      {/* </div>
      </div> */}
      <Order />
    </>
  )
}
