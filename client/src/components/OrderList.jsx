import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Loader2, Package, Truck, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getMyOrders } from '../redux/actions/OrderAction'; 

const OrderList = () => {
  const dispatch = useDispatch();
  const getMonthLabels = () => ["Last 30 days", "Past 3 months", "2025", "2024"];
  const [filterDate, setFilterDate] = useState("Past 3 months");

  const { user } = useSelector((state) => state.userLogin);
  const { orders, loading, error } = useSelector((state) => state.myOrders);

  useEffect(() => {
    if (user && user._id) {
      dispatch(getMyOrders(user._id));
    }
  }, [dispatch, user]);

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen bg-white text-gray-800 font-sans">

      <div className="border-b border-gray-300 pb-2 mb-6 flex justify-between items-end">
        <h1 className="text-2xl font-normal text-gray-900">Your Orders</h1>
        <p className="text-sm text-gray-500">{orders?.length || 0} orders placed</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Orders placed in:</span>
          <select 
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="border border-gray-400 bg-[#f0f2f2] px-2 py-1 rounded shadow-sm outline-none focus:ring-1 focus:ring-teal-500"
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
          <Search className="absolute right-2 top-2 text-gray-400" size={18} />
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <Loader2 className="animate-spin mb-2" size={32} />
          <p className="font-medium">Fetching your medical history...</p>
        </div>
      ) : error ? (
        <div className="text-center py-20 text-red-500 bg-red-50 rounded-md border border-red-100">
          <p className="font-bold">Error: {error}</p>
          <button onClick={() => window.location.reload()} className="mt-2 text-sm underline">Try refreshing</button>
        </div>
      ) : orders?.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-md border border-dashed border-gray-300">
          <Package className="mx-auto text-gray-300 mb-2" size={48} />
          <p className="text-gray-500 font-bold text-lg">No orders found</p>
          <p className="text-gray-400 text-sm mb-4">You haven't placed any orders in this period.</p>
          <Link to="/" className="bg-teal-500 text-white px-6 py-2 rounded-md font-bold text-sm hover:bg-teal-600 transition shadow-sm">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders?.map((order) => (
            <div key={order._id} className="border border-gray-300 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow">

              <div className="bg-[#f6f6f6] p-3 border-b border-gray-300 flex flex-wrap justify-between items-center text-[13px]">
                <div className="flex gap-10">
                  <div>
                    <p className="text-gray-500 uppercase text-[11px] font-bold tracking-tight">Order Placed</p>
                    <p className="text-gray-700">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 uppercase text-[11px] font-bold tracking-tight">Total</p>
                    <p className="text-gray-700 font-bold">₹{order.totalAmount}</p>
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-gray-500 uppercase text-[11px] font-bold tracking-tight">Ship To</p>
                    <p className="text-blue-600 hover:text-orange-600 cursor-pointer font-medium">{user.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-500 uppercase text-[11px] font-bold tracking-tight">Order ID</p>
                  <p className="text-gray-700 font-mono">#{order._id.slice(-8).toUpperCase()}</p>
                </div>
              </div>

              <div className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex gap-4 items-start">

                  <div className="relative flex-shrink-0">
                    <div className="w-24 h-24 bg-white border border-gray-200 rounded-md overflow-hidden flex items-center justify-center p-1">
                      {}
                      {order.items?.[0]?.productId?.productImages?.[0] ? (
                        <img 
                          src={order.items[0].productId.productImages[0]} 
                          alt="product" 
                          className="w-full h-full object-contain"
                          onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=Pharmacy'; }}
                        />
                      ) : (
                        <div className="text-gray-300 flex flex-col items-center">
                          <Package size={28} />
                          <span className="text-[8px] font-bold text-gray-400 mt-1 uppercase text-center">
                            {typeof order.items?.[0]?.productId === 'string' ? 'Loading Data' : 'No Image'}
                          </span>
                        </div>
                      )}
                    </div>
                    {order.items.length > 1 && (
                      <span className="absolute -top-2 -right-2 bg-teal-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border-2 border-white shadow-sm">
                        +{order.items.length - 1} more
                      </span>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-[16px] font-bold text-blue-600 hover:text-orange-600 hover:underline cursor-pointer leading-snug mb-2">
                      {}
                      {order.items.map(item => item.name || item.productId?.productName || "Pharmacy Item").join(", ")}
                    </h3>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${order.orderStatus === 'delivered' ? 'bg-green-500' : 'bg-orange-400'}`}></div>
                        <p className="text-sm font-bold capitalize">
                          {order.orderStatus} 
                          {order.orderStatus === 'delivered' && <span className="text-gray-500 font-normal ml-1 text-xs">- on {new Date(order.updatedAt).toLocaleDateString()}</span>}
                        </p>
                      </div>
                      <p className="text-[12px] text-gray-500 flex items-center gap-1">
                        <span className="font-semibold text-gray-600">Payment:</span> {order.paymentStatus}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 w-full md:w-52">
                  <button className="flex items-center justify-center gap-2 w-full bg-[#24aeb1] hover:bg-[#1e9294] text-white py-2 rounded-md text-xs font-black uppercase tracking-wider shadow-sm transition-all active:scale-95">
                    <Truck size={14} /> Track Package
                  </button>
                  <Link 
                    to={`/orderdetail/${order._id}`}
                    className="flex items-center justify-center gap-2 w-full bg-white border border-gray-300 hover:bg-gray-50 py-2 rounded-md text-xs font-black uppercase tracking-wider text-gray-700 shadow-sm transition-all"
                  >
                    <ExternalLink size={14} /> View Details
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderList;