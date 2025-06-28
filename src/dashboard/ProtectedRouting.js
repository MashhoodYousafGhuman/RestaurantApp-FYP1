import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRouting = ({ children }) => {

    const [isAdmin, setIsAdmin] = useState(() => {
        return localStorage.getItem("isAdmin") === "true";
    });

    useEffect(() => {
        const admin = localStorage.getItem("isAdmin") === "true";
        setIsAdmin(admin)
    }, []);

    if (!isAdmin) {
        return <Navigate to={'/login'} replace />
    }

    return children;

}

export default ProtectedRouting;
