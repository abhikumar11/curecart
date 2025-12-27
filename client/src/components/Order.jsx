import React from 'react';
import { ChevronLeft, MapPin, CreditCard, Package, Truck, CheckCircle, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Order = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-10 bg-[#fbfbfb] min-h-screen">
      
      {/* 1. Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <Link to="/orders" className="p-2 bg-white shadow-sm border border-gray-100 rounded-full hover:bg-gray-50 transition">
            <ChevronLeft size={20} className="text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Order #CC-99042</h1>
            <p className="text-sm text-gray-500">Placed on 24 Dec 2025, 10:30 AM</p>
          </div>
        </div>
       
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-6">
      
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-teal-50 rounded-lg text-teal-600">
                <Truck size={20} />
              </div>
              <h2 className="font-bold text-gray-800">Estimated Delivery: Tomorrow</h2>
            </div>
            
            <div className="relative flex justify-between">
              {/* Progress Line */}
              <div className="absolute top-4 left-0 w-full h-0.5 bg-gray-100 -z-0"></div>
              <div className="absolute top-4 left-0 w-2/3 h-0.5 bg-teal-500 -z-0"></div>

              {['Placed', 'Shipped', 'On the Way', 'Delivered'].map((step, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-4 border-white shadow-sm ${
                    i <= 2 ? 'bg-teal-500 text-white' : 'bg-gray-200 text-white'
                  }`}>
                    {i <= 1 ? <CheckCircle size={14} /> : i === 2 ? <Truck size={14} /> : <Package size={14} />}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-tight ${i <= 2 ? 'text-teal-600' : 'text-gray-400'}`}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Items List */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-50 bg-gray-50/50">
              <h3 className="font-bold text-gray-800 text-sm">Items Ordered (2)</h3>
            </div>
            <div className="divide-y divide-gray-50">
              {[1, 2].map((item) => (
                <div key={item} className="p-5 flex gap-4 items-center">
                  <div className="w-20 h-20 bg-gray-50 rounded-xl flex items-center justify-center text-3xl border border-gray-100">
                    📦
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 text-base">Vitamins C + Zinc 500mg</h4>
                    <p className="text-xs text-gray-500 font-medium mt-1">Sold by: Apollo Pharmacy</p>
                    <div className="flex items-center gap-4 mt-3">
                        <span className="text-sm font-black text-gray-900">₹240.00</span>
                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md font-bold text-[10px]">QTY: 1</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar (1/3 width) */}
        <div className="space-y-6">
          
          {/* Delivery Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="flex items-center gap-2 font-bold text-gray-800 mb-4 text-sm">
              <MapPin size={18} className="text-teal-600" /> Delivery Address
            </h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p className="font-bold text-gray-900">John Doe</p>
              <p>Plot No 45, Golden Heights</p>
              <p>HSR Layout, Bangalore</p>
              <p>Karnataka - 560102</p>
              <p className="pt-2 text-gray-400">Mobile: +91 98XXX XXX01</p>
            </div>
          </div>

          {/* Payment Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="flex items-center gap-2 font-bold text-gray-800 mb-4 text-sm">
              <CreditCard size={18} className="text-teal-600" /> Payment Summary
            </h3>
            <div className="text-sm space-y-3">
              <div className="flex justify-between text-gray-500">
                <span>Items Subtotal</span>
                <span>₹480.00</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping Fee</span>
                <span className="text-teal-600 font-bold uppercase text-[10px]">Free</span>
              </div>
              
              <div className="flex justify-between font-black text-gray-900 text-lg pt-1">
                <span>Order Total</span>
                <span>₹566.40</span>
              </div>
              
              <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                 <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Method</p>
                 <p className="text-xs font-bold text-gray-700">UPI (Google Pay)</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Order;