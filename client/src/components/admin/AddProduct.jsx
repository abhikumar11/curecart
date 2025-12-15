import React from 'react'
import { FaSearch } from 'react-icons/fa';
const AddProduct = () => {
  return (
  <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Product Management</h1>
      
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        
       
        <div className="w-full md:w-auto">
          <button 
            className="w-full md:w-auto px-6 py-2 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 transition duration-300"
           >
            + Add Product
          </button>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
          <div className="relative w-full sm:w-48">
            <input 
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
            />
            
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <div className="w-full sm:w-auto">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500">
              <option value="">Filter: Disease</option>
              <option value="disease-a">Disease A</option>
              <option value="disease-b">Disease B</option>
            </select>
          </div>
          <div className="w-full sm:w-auto">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500">
              <option value="">Sort: Price</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>
          
        </div>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
             <th className="px-6 py-3 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Crocin 650mg Tablet 15'S</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Fever</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">30</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">500 In Stock</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a href="#" className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</a>
                <a href="#" className="text-red-600 hover:text-red-900">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AddProduct