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
import ProtectedRoute from './utils/ProtectedRoute';
import AddProduct from './components/admin/AddProduct';
import Oders from './components/admin/AdminOders';
import ProductList from './components/admin/ProductList';
import Product from './components/Product';
import OrderSuccess from './components/pages/OrderSuccess';
import AdminOrders from './components/admin/AdminOders';
import OrderList from './components/OrderList';

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
    <Route path="cart" element={<Cart />} />
    <Route path="ordersuccess" element={<OrderSuccess />} />

    <Route path="/category/:cat" element={<Product/>}/>

    <Route element={<ProtectedRoute />}>
      <Route path="checkout" element={<Checkout />} />
      <Route path="sellorder" element={<AdminOrders/>} />
      <Route path="orders" element={<OrderList/>} />
      <Route path="orderdetail" element={<Order />} />
    </Route>
  </Route>

  <Route path="/seller" element={<AdminLayout />}>
    <Route path="login" element={<AdminLogin />} />
    
    <Route element={<ProtectedRoute adminOnly={true} />}>
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