import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
export default function SubFooter() {
  return (
    <>
      <div className="container my-4  d-flex ">
        <div className="row w-50">
          <div className="col d-flex gap-4">
            <FaFacebook color={'#1877F2'}  size={20} />
            <FaInstagram color={'#E1306C'} size={20} />
            <FaLinkedin color={'#0077B5'}  size={20} />
            <FaYoutube color={'#FF0000'} size={20} />
          </div>
        </div>
        <div className="row w-75">
          <p style={{ fontFamily: 'inter',  }} className='mb-0'><code >  &copy; {new Date().getFullYear()} Powered by  log.MYG </code>  </p>
        </div>
      </div>
    </>
  )
}
