import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Order from './Order'
import Hero from './Hero'

export default function FrontEndRoutes() {
  return (
    <>
      <Routes>
          {/* <Route path='/home' element={<Home />} />
          <Route path='/hero' element={<Hero />} />
          <Route path='/order' element={<Order />} /> */}
      </Routes>
      {/* <Order /> */}
    </>
  )
}
