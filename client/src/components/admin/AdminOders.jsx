import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Eye, Download, Loader2 } from 'lucide-react';
import { getAllOrders } from '../../redux/actions/OrderAction';
import {Link} from "react-router-dom";
const AdminOrders = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const { loading, error, orders } = useSelector((state) => state.allOrders);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const filteredOrders = orders?.filter((order) => {
    const statusMatch = activeTab === 'All' || order.orderStatus === activeTab;
    const searchMatch = order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    return statusMatch && searchMatch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'text-orange-700 font-bold';
      case 'Shipped': return 'text-blue-700 font-bold';
      case 'Delivered': return 'text-green-700 font-bold';
      case 'Cancelled': return 'text-red-700 font-bold';
      default: return 'text-gray-700';
    }
  };

  if (loading) return <div className="p-10 text-center text-sm text-gray-600">Loading orders...</div>;

  return (
    <div className="bg-[#f4f4f4] min-h-screen p-6 font-sans text-gray-800">

      { }
      <div className="flex justify-between items-center mb-4 bg-white p-4  shadow-sm">

        <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 border border-gray-400 text-xs font-semibold text-gray-700 hover:bg-gray-200 uppercase">
          <Download size={14} /> Export to CSV
        </button>
      </div>

      { }
      <div className="bg-white border border-gray-300 mb-0.5">
        <div className="flex flex-wrap items-center justify-between p-3 gap-4">
          <div className="flex border border-gray-300 divide-x divide-gray-300">
            {['All', 'Pending', 'Shipped', 'Delivered'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-tight transition-colors ${activeTab === tab ? 'bg-gray-800 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search by ID or Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 pl-8 pr-3 py-1.5 border border-gray-400 text-xs focus:border-blue-500 outline-none"
            />
            <Search className="absolute left-2 top-2 text-gray-500" size={14} />
          </div>
        </div>
      </div>

      { }
      <div className="bg-white border border-gray-300 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="px-4 py-3 text-xs uppercase font-bold text-gray-600 border-r border-gray-200">Order ID</th>
              <th className="px-4 py-3 text-xs uppercase font-bold text-gray-600 border-r border-gray-200">Date</th>
              <th className="px-4 py-3 text-xs uppercase font-bold text-gray-600 border-r border-gray-200">Customer Name</th>
              <th className="px-4 py-3 text-xs uppercase font-bold text-gray-600 border-r border-gray-200">Order Total</th>
              <th className="px-4 py-3 text-xs uppercase font-bold text-gray-600 border-r border-gray-200">Current Status</th>
              <th className="px-4 py-3 text-xs uppercase font-bold text-gray-600 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders?.map((order) => (
              <tr key={order._id} className="border-b border-gray-200 hover:bg-gray-50 text-xs">
                <td className="px-4 py-3 font-mono text-blue-700 underline cursor-pointer">
                  {order._id.toUpperCase()}
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 font-medium">
                  {order.user?.name || "Unregistered Guest"}
                </td>
                <td className="px-4 py-3 font-semibold text-gray-900">
                  INR {order.totalAmount.toLocaleString()}
                </td>
                <td className={`px-4 py-3 uppercase text-[10px] ${getStatusColor(order.orderStatus)}`}>
                  {order.orderStatus}
                </td>
                <td className="px-4 py-3 text-center">
                  <Link
    to={`/seller/orderdetail/${order._id}`} 
    className="px-3 py-1 border border-gray-300 bg-gray-50 text-gray-600 hover:bg-white hover:text-blue-600 transition shadow-sm font-bold uppercase text-[10px]"
  >
    View Details
  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredOrders?.length === 0 && (
          <div className="p-10 text-center text-sm text-gray-500 italic">
            No records found matching your criteria.
          </div>
        )}
      </div>

      { }
      <div className="mt-2 text-[10px] text-gray-500 flex justify-between uppercase font-semibold">
        <span>Records count: {filteredOrders?.length}</span>
      </div>
    </div>
  );
};

export default AdminOrders;