import React from 'react'

const AdminLogin = () => {
  return (
       <div className="min-h-screen flex flex-col md:flex-row">

      <div className="md:w-1/2 h-64 md:h-auto">
        <img
          src="https://plus.unsplash.com/premium_vector-1682269359035-d0de2962d5f9?q=80&w=1112&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Medicine"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="md:w-1/2 flex items-center justify-center bg-gray-100 p-10">
        <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow">

          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Login
          </h2>
          <form className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2 rounded-xl font-semibold hover:bg-teal-700 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin