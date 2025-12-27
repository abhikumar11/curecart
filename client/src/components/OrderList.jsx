import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrderList = () => {
  const getMonthLabels = () => ["Last 30 days", "Past 3 months", "2025", "2024"];
  const [filterDate, setFilterDate] = useState("Past 3 months");

  const orders = [
    {
      id: 'CC-99042',
      date: 'December 24, 2025',
      status: 'In Transit',
      total: '566.40',
      items: 'Vitamin C + Zinc, Paracetamol'
    },
    {
      id: 'CC-98122',
      date: 'November 18, 2025',
      status: 'Delivered',
      total: '1,240.00',
      items: 'BP Monitor'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen bg-white text-gray-800 font-sans">
   
      <div className="border-b border-gray-300 pb-2 mb-6">
        <h1 className="text-2xl font-normal text-gray-900">Your Orders</h1>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Orders placed in:</span>
          <select 
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="border border-gray-400 bg-[#f0f2f2] px-2 py-1 rounded shadow-sm focus:border-blue-500 outline-none"
          >
            {getMonthLabels().map((label) => (
              <option key={label} value={label}>{label}</option>
            ))}
          </select>
        </div>

        <div className="relative w-full sm:w-72">
          <input 
            type="text" 
            placeholder="Search all orders" 
            className="w-full border border-gray-400 px-3 py-1.5 rounded shadow-sm outline-none focus:border-blue-500"
          />
          <Search className="absolute right-2 top-2 text-gray-500" size={18} />
        </div>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border border-gray-300 rounded-md overflow-hidden">
          
            <div className="bg-[#f6f6f6] p-3 border-b border-gray-300 flex flex-wrap justify-between items-center text-[13px]">
              <div className="flex gap-10">
                <div>
                  <p className="text-gray-500 uppercase text-[11px] font-bold">Order Placed</p>
                  <p>{order.date}</p>
                </div>
                <div>
                  <p className="text-gray-500 uppercase text-[11px] font-bold">Total</p>
                  <p>₹{order.total}</p>
                </div>
                <div>
                  <p className="text-gray-500 uppercase text-[11px] font-bold">Ship To</p>
                  <p className="text-blue-600 hover:text-orange-600 cursor-pointer">Customer Name</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-500 uppercase text-[11px] font-bold">Order # {order.id}</p>
                
              </div>
            </div>

            <div className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex gap-4">
             
                <div className="w-16 h-16 bg-gray-100 border border-gray-200 flex items-center justify-center text-[10px] text-gray-400 font-bold uppercase">
                  Product
                </div>
                
                <div>
                  <h3 className="text-[15px] font-bold text-blue-600 hover:text-orange-600 cursor-pointer leading-tight">
                    {order.items}
                  </h3>
                  <p className="text-sm mt-1">
                    Status: <span className={`font-bold ${order.status === 'Delivered' ? 'text-green-700' : 'text-gray-800'}`}>
                      {order.status}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 w-full md:w-48">
                <button className="w-full bg-[#24aeb1]  hover:bg-[#24aeb1] er border-[#24aeb1] text-white py-1.5 rounded-md text-sm shadow-sm transition hover:cursor-pointer">
                  Track Package
                </button>
                <Link 
                  to={`/order/${order.id}`}
                  className="w-full text-center bg-white border border-gray-300 hover:bg-gray-50 py-1.5 rounded-md text-sm shadow-sm transition"
                >
                  View order details
                </Link>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default OrderList;