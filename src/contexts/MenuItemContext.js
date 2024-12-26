import React, { createContext, useState } from 'react'

export const MenuContext = createContext()
export default function MenuItemContext({children}) {
    let initialState = {name : '' , description : '' , price : '' , category : '' , picture : ' ' }
    const [value , setValue] = useState(initialState)
    const [menu , setMenu] = useState(JSON.parse(localStorage.getItem('item')) || [ ])

    const getRandomId=Math.random().toString(26).slice(2)

    let {name , description , price , category , picture} = value
    let menuItem = {name , description , price , category , picture ,id:getRandomId}
    
  return (
    <MenuContext.Provider value={{value , setValue , menu , setMenu , menuItem}} >
      {children}
    </MenuContext.Provider>
  )
}
