import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Truck, Calendar, ShoppingBag } from 'lucide-react';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const orderId = `CC-${Math.floor(100000+900000)}`;
  const deliveryDate = "Monday, 29th Dec"; 

  return (
    <div className="bg-[#f3f7fb] min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle size={48} className="text-green-600" />
            </div>
          </div>
          <h1 className="text-2xl font-black text-gray-900 mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-500 text-sm mb-6">
            Your medicines are being processed by our licensed pharmacy partner.
          </p>
          <div className="bg-gray-50 rounded-lg py-3 px-4 inline-block border border-gray-100">
            <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">Order ID: </span>
            <span className="text-sm font-black text-[#24aeb1]">{orderId}</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
          <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Calendar size={18} className="text-[#24aeb1]" /> Delivery Timeline
          </h3>
          
          <div className="relative">
          
            <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-100"></div>

            <div className="space-y-8">
              <div className="flex gap-4 relative">
                <div className="z-10 bg-green-600 w-6 h-6 rounded-full flex items-center justify-center ring-4 ring-green-50">
                  <CheckCircle size={14} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">Order Confirmed</p>
                  <p className="text-xs text-gray-500">Today, 10:30 AM</p>
                </div>
              </div>

              <div className="flex gap-4 relative">
                <div className="z-10 bg-white border-2 border-[#24aeb1] w-6 h-6 rounded-full flex items-center justify-center">
                  <Package size={14} className="text-[#24aeb1]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">Pharmacy Processing</p>
                  <p className="text-xs text-gray-500">Expected by evening</p>
                </div>
              </div>

              <div className="flex gap-4 relative">
                <div className="z-10 bg-white border-2 border-gray-200 w-6 h-6 rounded-full flex items-center justify-center">
                  <Truck size={14} className="text-gray-300" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-400">Shipped</p>
                  <p className="text-xs text-gray-400">Arriving by {deliveryDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => navigate('/')}
            className="flex-1 bg-[#24aeb1] text-white py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-[#1e8f91] transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <ShoppingBag size={18} /> Continue Shopping
          </button>
          <button className="flex-1 bg-white border border-gray-200 text-gray-700 py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
            View Order Details
          </button>
        </div>

      </div>
    </div>
  );
};

export default OrderSuccess;