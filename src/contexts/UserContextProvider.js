import React, { createContext, useState } from 'react'

export  const UserContext = createContext()

export default function UserContextProvider({children}) {

    let user = {fullName : '' , email : '' , password : ''}
    const [state , setState] = useState(user)


  return (
    <>
    <UserContext.Provider value={{state , setState}} >
        {children}
    </UserContext.Provider>
    </>
  )
}
