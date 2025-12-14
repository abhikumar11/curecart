import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AdminProtectedRoute = () => {

 const token = localStorage.getItem("token");
    const isAuthenticated = !!token;
    const redirectPath="/seller/login";

    if (!isAuthenticated) {
        return <Navigate to={redirectPath}replace/>;
    }

    return <Outlet/>;
}

export default AdminProtectedRoute