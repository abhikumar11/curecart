import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {

       const {token} = useSelector((state) => state.userLogin);
     const isAuthenticated = !!token;
     const redirectPath = "/seller/login";

     if (!isAuthenticated) {
          return <Navigate to={redirectPath} replace />;
     }
     return <Outlet />;
};

export default AdminProtectedRoute;
