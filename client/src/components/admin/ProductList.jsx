import React, { useEffect } from 'react';
import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from '../../redux/actions/ProductAction';

const ProductList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  const { productList, loading } = useSelector((state) => state.products);
  console.log(productList)
  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Product Management</h1>
        <span className="bg-teal-100 text-teal-700 px-4 py-1 rounded-full text-sm font-semibold">
          Total: {productList?.length || 0} Products
        </span>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between mb-6 space-y-4 lg:space-y-0 lg:space-x-6">
        <div className="w-full lg:w-auto">
          <select className="w-full lg:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none bg-white shadow-sm">
            <option value="">Filter: Disease</option>
            <option value="fever">Fever</option>
            <option value="diabetes">Diabetes</option>
          </select>
        </div>

        <div className="relative w-full lg:max-w-2xl flex-grow">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none shadow-sm"
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="w-full lg:w-auto">
          <select className="w-full lg:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none bg-white shadow-sm">
            <option value="">Sort: Price</option>
            <option value="low-high">Low to High</option>
            <option value="high-low">High to Low</option>
          </select>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr><td colSpan="5" className="text-center py-10 text-gray-500">Loading products...</td></tr>
              ) : (
                productList?.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                   
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-12 w-12 flex-shrink-0">
                          <img 
                            className="h-12 w-12 rounded-lg object-cover border border-gray-100" 
                            src={item.productImages?.[0] || 'https://via.placeholder.com/150'} 
                            alt={item.productName} 
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-bold text-gray-900">{item.productName}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full uppercase italic">
                        {item.category}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-bold">
                      ₹{item.price}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className={`text-sm font-semibold ${item.inStock==0?'text-red-600':item.inStock>10?"text-green-600":"text-orange-600"}`}>
                          {item.inStock>0?`${item.inStock} units`:"Out of Stock"}
                        </span>
                        <span className="text-[10px] text-gray-400 uppercase">{item.inStock>0?"Available":""}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <button className="text-teal-600 hover:text-teal-800 mr-4 transition-colors cursor-pointer">
                        <FaEdit className="inline mr-1" /> Edit
                      </button>
                      <button className="text-red-500 hover:text-red-700 transition-colors cursor-pointer">
                        <FaTrash className="inline mr-1" /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;