import React, { useState } from 'react';
import { 
  Search, Filter, Eye, 
  PackageCheck, Truck, XCircle, 
  ChevronRight, Download 
} from 'lucide-react';

const AdminOrders = () => {
  const [activeTab, setActiveTab] = useState('All');

  const orders = [
    { id: 'ORD-5521', date: '24 Dec 2025', customer: 'Rahul Sharma', total: '₹1,250', status: 'Pending', items: 3 },
    { id: 'ORD-5520', date: '23 Dec 2025', customer: 'Priya Patel', total: '₹450', status: 'Shipped', items: 1 },
    { id: 'ORD-5519', date: '23 Dec 2025', customer: 'Amit Verma', total: '₹2,100', status: 'Delivered', items: 5 },
    { id: 'ORD-5518', date: '22 Dec 2025', customer: 'Sneha Gupta', total: '₹890', status: 'Cancelled', items: 2 },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending': return 'bg-orange-100 text-orange-600';
      case 'Shipped': return 'bg-blue-100 text-blue-600';
      case 'Delivered': return 'bg-teal-100 text-teal-600';
      case 'Cancelled': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return <PackageCheck size={14} />;
      case 'Shipped': return <Truck size={14} />;
      case 'Cancelled': return <XCircle size={14} />;
      default: return <ChevronRight size={14} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-800 uppercase tracking-tight">Order Fulfillment</h1>
          <p className="text-gray-500 text-sm">Manage and track your incoming medicine orders</p>
        </div>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition">
             <Download size={16} /> Export CSV
           </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex bg-gray-50 p-1 rounded-xl">
            {['All', 'Pending', 'Shipped', 'Delivered'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                  activeTab === tab 
                  ? 'bg-white text-teal-600 shadow-sm' 
                  : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="relative flex-1 max-w-sm">
            <input 
              type="text" 
              placeholder="Search Order ID or Customer..." 
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-sm"
            />
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-black text-gray-400">Order Details</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-black text-gray-400">Customer</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-black text-gray-400">Items</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-black text-gray-400">Total Price</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-black text-gray-400">Status</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-black text-gray-400 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-teal-50/30 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="text-sm font-black text-teal-600 uppercase">{order.id}</p>
                    <p className="text-[10px] text-gray-400 font-bold">{order.date}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-gray-800">{order.customer}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {order.items} Products
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-black text-gray-900">{order.total}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${getStatusStyle(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button className="p-2 bg-gray-50 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition" title="View Details">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 bg-gray-50 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition" title="Change Status">
                        <Truck size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Placeholder */}
        <div className="p-4 border-t border-gray-50 flex items-center justify-between text-xs font-bold text-gray-400">
          <span>Showing 1-4 of 124 orders</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-100 rounded-md hover:bg-gray-50 transition">Prev</button>
            <button className="px-3 py-1 bg-teal-600 text-white rounded-md">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;