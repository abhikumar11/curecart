import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails } from '../redux/actions/OrderAction';
import { Package, MapPin, CreditCard, ChevronLeft, Printer, Info } from 'lucide-react';

const Order = () => {
  const { orderid } = useParams();
  const dispatch = useDispatch();

  const { order, loading, error } = useSelector((state) => state.orderDetails || {});
  const { user } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (orderid) {
      dispatch(getOrderDetails(orderid));
    }
  }, [dispatch, orderid]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen text-teal-600">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mb-4"></div>
      <p className="font-bold">Fetching order summary...</p>
    </div>
  );

  if (error) return (
    <div className="max-w-4xl mx-auto p-20 text-center">
      <div className="bg-red-50 border border-red-200 p-6 rounded-md">
        <p className="text-red-500 font-bold mb-2">Failed to load order details</p>
        <p className="text-sm text-red-400">{error}</p>
        <Link
          to="/orders"
          className="
   inline-flex items-center justify-center gap-1.5 
    bg-[#24aeb1] text-white px-3 py-1.5 rounded 
    text-[10px] font-bold uppercase tracking-wide
    hover:bg-[#1c8c8e] transition-all active:scale-95 shadow-sm
  "
        >
          <ChevronLeft
            size={14}
            className="transition-transform group-hover:-translate-x-1"
          />
          <span>Return to Orders</span>
        </Link>
      </div>
    </div>
  );

  if (!order || !order._id) return null;

  return (
    <div className="bg-gray-50 min-h-screen py-8 font-sans">
      <div className="max-w-4xl mx-auto px-4">

        { }
        <div className="flex justify-between items-center mb-6 print:hidden">
          <Link to="/orders" className="flex items-center text-sm text-teal-600 font-bold hover:underline">
            <ChevronLeft size={18} /> Back to My Orders
          </Link>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded shadow-sm text-xs font-bold uppercase hover:bg-gray-50 transition"
          >
            <Printer size={14} /> Print Invoice
          </button>
        </div>

        { }
        <div className="bg-white border border-gray-300 rounded-t-md p-6">
          <div className="flex flex-wrap justify-between items-start gap-4">
            <div>
              <h1 className="text-xl font-black text-gray-900 uppercase tracking-tight">Order Details</h1>
              <p className="text-sm text-gray-500 mt-1">
                Ordered on {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'N/A'}
                <span className="mx-2">|</span>
                <span className="font-mono">Order # {order._id?.toUpperCase()}</span>
              </p>
            </div>
            <div className="flex flex-col items-end">
              <span className={`inline-block px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${order.orderStatus === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                {order.orderStatus}
              </span>
              {order.orderStatus !== 'delivered' && (
                <p className="text-[10px] text-gray-400 mt-2 flex items-center gap-1 uppercase font-bold">
                  <Info size={10} /> Estimated Delivery: 3-5 Days
                </p>
              )}
            </div>
          </div>
        </div>

        { }
        <div className="grid md:grid-cols-3 border-x border-b border-gray-300 bg-white rounded-b-md mb-6 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          { }
          <div className="p-6">
            <h3 className="text-[11px] font-black text-gray-400 uppercase mb-3 flex items-center gap-2">
              <MapPin size={14} /> Shipping Address
            </h3>
            <p className="text-sm font-bold text-gray-800">{user?.name || "Customer"}</p>
            <p className="text-xs text-gray-600 leading-relaxed mt-1">
              { }
              {typeof order.shippingAddress === 'object'
                ? `${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}`
                : order.shippingAddress}
            </p>
          </div>

          { }
          <div className="p-6">
            <h3 className="text-[11px] font-black text-gray-400 uppercase mb-3 flex items-center gap-2">
              <CreditCard size={14} /> Payment Method
            </h3>
            <p className="text-sm text-gray-800 font-medium">Digital Transaction</p>
            <p className="text-[10px] text-gray-500 mt-1 uppercase font-bold tracking-tighter">
              Status: <span className={order.paymentStatus === 'paid' ? 'text-green-600' : 'text-orange-600'}>{order.paymentStatus}</span>
            </p>
          </div>

          { }
          <div className="p-6 bg-gray-50/50">
            <h3 className="text-[11px] font-black text-gray-400 uppercase mb-3 flex items-center gap-2">
              <Package size={14} /> Order Summary
            </h3>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Items Total:</span>
                <span className="font-bold">₹{order.totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping:</span>
                <span className="text-green-600 font-bold uppercase text-[10px]">Free</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200 mt-2">
                <span className="text-sm font-black text-gray-800">Grand Total:</span>
                <span className="text-sm font-black text-teal-600">₹{order.totalAmount}</span>
              </div>
            </div>
          </div>
        </div>

        { }
        <div className="bg-white border border-gray-300 rounded-md overflow-hidden shadow-sm">
          <div className="p-4 bg-gray-50 border-b border-gray-300">
            <h2 className="text-xs font-black uppercase text-gray-700 tracking-widest">Items in this shipment</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {order.items.map((item, index) => (
              <div key={index} className="p-6 flex items-center gap-6 hover:bg-gray-50/50 transition">
                <div className="w-20 h-20 flex-shrink-0 border border-gray-100 rounded-md p-1 bg-white shadow-inner">
                  <img
                    src={item.productId?.productImages?.[0] || '/api/placeholder/80/80'}
                    alt="product"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-grow">
                  <h4 className="text-sm font-bold text-blue-600 hover:text-orange-600 transition cursor-pointer">
                    {item.productId?.productName || "Product Name Not Available"}
                  </h4>
                  <p className="text-[11px] text-gray-500 mt-1">CureCart Verified Pharmacy Product</p>
                  <div className="flex items-center gap-4 mt-3">
                    <p className="text-sm font-black text-gray-900">₹{item.price}</p>
                    <p className="text-[11px] text-gray-400 font-bold uppercase px-2 py-0.5 bg-gray-100 rounded">Qty: {item.quantity}</p>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <Link
                    to={`/product/${item.productId?._id}`}
                    className="bg-white border border-gray-300 text-[10px] font-black uppercase px-4 py-2 rounded hover:bg-gray-50 tracking-widest transition"
                  >
                    Buy again
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Order;