import React, { createContext, useReducer } from 'react'
export const AdminContext = createContext()
const initialState = { isAdmin: false, isAuthenicate: false, user: {} }
export default function AdminContextProvider({ children }) {
    const reducer = (state, { type, payload }) => {
        console.log('Reducer received:', { type, payload });
        switch (type) {
            case 'SET_USER_LOGIN': return { ...state, isAdmin: false, isAuthenicate: true, user: payload.user };
            case 'SET_ADMIN': return { ...state, isAdmin: true, isAuthenicate: true, user: payload.user }
            case 'SET_LOGOUT': return initialState
            default: return state
        }

    }
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <AdminContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AdminContext.Provider>
    )
}
