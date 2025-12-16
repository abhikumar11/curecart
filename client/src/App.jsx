import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Login from './components/Login'
import Registration from './components/Registration'
import Layout from './components/Layout'
import Home from './components/Home'
import AdminLayout from "./components/admin/AdminLayout"
import AdminLogin from './components/admin/AdminLogin'
import AdminDashboard from './components/admin/AdminDashboard'
import Order from './components/Order'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import AdminProtectedRoute from './components/admin/AdminProtectedRoute'
import AddProduct from './components/admin/AddProduct';
import Oders from './components/admin/Oders';
import ProductList from './components/admin/ProductList';
const App = () => {
  return (
    <div>
      <ToastContainer position="top-center" autoClose={3000}
        newestOnTop={false}
        hideProgressBar={false}
        closeOnClick={false}
        theme="light"
      />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Registration />} />
          <Route path="order" element={<Order />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>

        <Route path="/seller" element={<AdminLayout />}>
          <Route path="login" element={<AdminLogin />} />
          <Route element={<AdminProtectedRoute />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<ProductList />} />
            <Route path="newproduct" element={<AddProduct />} />
            <Route path="orders" element={<Oders />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>
        </Route>

      </Routes>

    </div>
  )
}

export default App