import React, { createContext, useReducer } from 'react';

export const AdminContext = createContext();

const getInitialState = () => {
  const isAdminFromStorage = localStorage.getItem('isAdmin') === 'true';
  return {
    isAdmin: isAdminFromStorage,
    isAuthenticated: isAdminFromStorage, 
    user: {}, 
  };
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'SET_USER_LOGIN':
      localStorage.setItem('isAdmin', 'false');
      return {
        ...state,
        isAdmin: false,
        isAuthenticated: true,
        user: payload.user,
      };

    case 'SET_ADMIN':
      localStorage.setItem('isAdmin', 'true');
      return {
        ...state,
        isAdmin: true,
        isAuthenticated: true,
        user: payload.user,
      };

    case 'SET_LOGOUT':
      localStorage.removeItem('isAdmin');
      return {
        isAdmin: false,
        isAuthenticated: false,
        user: {},
      };

    default:
      return state;
  }
};

export default function AdminContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, getInitialState());

  return (
    <AdminContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AdminContext.Provider>
  );
}
