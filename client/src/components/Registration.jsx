import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/actions/UserAction';

const Registration = () => {

  const [frmData, setFrmData] = useState({name:"",email:"",password:""});
  const dispatch = useDispatch();
  const {loading,error,user}= useSelector((state)=>state.userRegister);
  
  useEffect(()=>{
     if (user) {
            alert("Registration Successful!");
        }
        if (error) {
            alert(`Error: ${error}`);
        }
  },[user,error])

  const handleInput = (e) => {
    setFrmData({ ...frmData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); 
      dispatch(registerUser(frmData));
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
     
      <div className="md:w-1/2 h-64 md:h-auto">
        <img
          src="https://plus.unsplash.com/premium_vector-1682269359035-d0de2962d5f9?q=80&w=1112&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Registration Background"
          className="w-full h-full object-cover"
        />
      </div>
    
      <div className="md:w-1/2 flex items-center justify-center bg-gray-100 p-10">
        <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">
          {loading && <h3>Loading...</h3>}
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Sign Up
          </h2>
          
         
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={frmData.name}
                onChange={handleInput}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={frmData.email}
                onChange={handleInput}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={frmData.password}
                onChange={handleInput}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Create password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2 rounded-xl font-semibold hover:bg-teal-700 transition"
             disabled={loading}
            >
             {loading ?"Creating Account...":"Sign Up"}
            </button>
          </form>
          <p className="text-center text-sm mt-5 text-gray-700">
            Already have an account?{" "}
            <a href="#" className="text-teal-600 font-semibold hover:underline">
              Login
            </a>
          </p>

        </div>
      </div>
    </div>
  )
}

export default Registration