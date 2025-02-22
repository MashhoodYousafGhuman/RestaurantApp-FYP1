import React from 'react'
import SubFooter from './SubFooter'
import logoPng from '../../assest/images/logo.png'
export default function Footer() {
  return (
    <>
      <footer>
        <div className="container" style={{marginTop:100}}>
          <div className="row -body-secondary">
            <div className="col">
              {/* col1 */}
              <img src={logoPng} alt="logoImage" style={{width:75,}} />
              <div className="col1 -black">
                <div style={{ width: 180, fontFamily: 'inter', }} className="text">
                  {/* <p>Savor the artistry where every dish is a <span style={{color:'#39DB4A',fontWeight:600}}>culinary</span> masterpiece</p> */}
                </div>
              </div>
            </div>
            <div className="col">
              {/* col2 */}
              <div className="col2 -danger">
                <div style={{ fontFamily: 'inter',   }}>
                  <h6 style={{color:'#39DB4A' ,fontWeight:600}}>Useful Links</h6>
                  <p>About Us</p>
                  <p>Events</p>
                </div>
              </div>
            </div>
            <div className="col">
              {/* col3 */}
              <div className="col3 -info">
                <div style={{ fontFamily: 'inter' }}>
                  <h6 style={{fontWeight:600}} >Main Menu</h6>
                  <p>Register</p>
                  <p>Login</p>
                  <p>Blogs</p>
                </div>
              </div>
            </div>
            <div className="col">
              {/* col4 */}
              <div className="col4 -danger-subtle">
                <div style={{ fontFamily: 'inter' }} >
                  <h6 style={{fontWeight:600}}>Contact Us </h6>
                  <p>email@example.com</p>
                  <p>32 2323 3232</p>
                  <p>Socail Media</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <SubFooter />
    </>
  )
}
