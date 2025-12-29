import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ adminOnly = false }) => {

  const { token, user } = useSelector((state) => state.userLogin);
  const location = useLocation();

  const isAuthenticated = !!token;

  if (!isAuthenticated) {

    const loginPath = location.pathname.includes("/seller") ? "/seller/login" : "/login";
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  if (adminOnly && user?.role !== "admin") {

    return <Navigate to="/" replace />;
  }


  return <Outlet />;
};

export default ProtectedRoute;