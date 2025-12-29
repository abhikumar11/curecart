import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getOrderDetails, updateOrderStatus } from '../../redux/actions/OrderAction';
import { UPDATE_ORDER_RESET } from '../../redux/constants';
import { toast } from 'react-toastify';
import { Package, User, MapPin, ClipboardList, ArrowLeft, IndianRupee } from 'lucide-react';

const AdminOrderDetail = () => {
  const { orderid } = useParams();
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");

  const { order, loading, error } = useSelector((state) => state.orderDetails);
  const { isUpdated, error: updateError } = useSelector((state) => state.orderUpdate || {});

  useEffect(() => {
    dispatch(getOrderDetails(orderid));

    if (isUpdated) {
      toast.success("Order Database Updated");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
    if (updateError || error) {
      toast.error(updateError || error);
    }
  }, [dispatch, orderid, isUpdated, updateError, error]);

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateOrderStatus(orderid, status));
  };

  if (loading || !order?._id) return (
    <div className="flex items-center justify-center min-h-screen bg-[#f4f4f4]">
      <div className="text-xs font-bold uppercase tracking-widest text-gray-400 animate-pulse">
        Retrieving Order Manifest...
      </div>
    </div>
  );

  return (
    <div className="bg-[#f4f4f4] min-h-screen p-4 font-sans text-gray-800">
      <div className="max-w-5xl mx-auto">

        {}
        <div className="mb-6 flex justify-between items-center">
          <Link to="/admin/orders" className="flex items-center gap-1 text-[10px] font-bold uppercase text-blue-700 hover:underline">
            <ArrowLeft size={12} /> Back to Master List
          </Link>
          <div className="px-3 py-1 bg-white border border-gray-300 text-[10px] font-mono shadow-sm">
            TXN_ID: {order._id}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {}
          <div className="md:col-span-2 space-y-6">

            {}
            <div className="bg-white border border-gray-300 shadow-sm overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
                <User size={14} className="text-gray-500" />
                <h2 className="text-xs font-black uppercase tracking-wider text-gray-600">Fulfillment Details</h2>
              </div>
              <div className="p-4 grid grid-cols-2 gap-6 text-xs">
                <div className="space-y-3">
                  <div>
                    <p className="text-[9px] font-bold text-gray-400 uppercase mb-1">Account Holder</p>
                    <p className="font-bold text-gray-900">{order.customerId?.name || "Unregistered Account"}</p>
                    <p className="text-blue-600 italic text-[11px]">{order.customerId?.email}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-gray-400 uppercase mb-1">Customer Identifier</p>
                    <p className="font-mono bg-gray-100 px-1 inline-block text-[10px]">
                        {typeof order.customerId === 'string' ? order.customerId : order.customerId?._id}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-gray-400 uppercase mb-1 flex items-center gap-1">
                    <MapPin size={10} /> Shipping Destination
                  </p>
                  <p className="text-gray-700 leading-relaxed font-medium bg-blue-50/50 p-2 border-l-2 border-blue-200">
                    {order.shippingAddress}
                  </p>
                </div>
              </div>
            </div>

            {}
            <div className="bg-white border border-gray-300 shadow-sm">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
                <Package size={14} className="text-gray-500" />
                <h2 className="text-xs font-black uppercase tracking-wider text-gray-600">Manifest Summary</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50/50 border-b border-gray-200 text-[9px] uppercase font-bold text-gray-500">
                    <tr>
                      <th className="px-4 py-3">Product</th>
                      <th className="px-4 py-3">Price</th>
                      <th className="px-4 py-3 text-center">Qty</th>
                      <th className="px-4 py-3 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {order.items?.map((item) => (
                      <tr key={item._id} className="text-xs hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 border border-gray-200 p-1 flex-shrink-0 bg-white">
                                <img 
                                    src={item.productId?.productImages?.[0] || '/placeholder.png'} 
                                    className="w-full h-full object-contain"
                                    alt="thumb" 
                                />
                            </div>
                            <div>
                              <p className="font-bold text-gray-900 uppercase">{item.name}</p>
                              <p className="text-[9px] text-gray-400 font-mono italic">SKU: {item.productId?._id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 font-mono text-gray-600 italic">₹{item.price}</td>
                        <td className="px-4 py-4 text-center font-bold">{item.quantity}</td>
                        <td className="px-4 py-4 text-right font-black text-teal-700">₹{item.price * item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-gray-50 p-4 flex justify-between items-center border-t border-gray-200">
                <span className="text-[10px] font-bold uppercase text-gray-500">Order Final Value</span>
                <span className="text-lg font-black text-gray-900 font-mono">
                  INR {order.totalAmount?.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {}
          <div className="md:col-span-1 space-y-4">
            <div className="bg-white border border-gray-400 p-6 sticky top-6 shadow-md">
              <div className="flex items-center gap-2 mb-6 border-b border-gray-200 pb-3">
                <ClipboardList size={14} className="text-gray-500" />
                <h2 className="text-xs font-black uppercase tracking-wider">Control Panel</h2>
              </div>

              <div className="mb-8 p-3 bg-blue-50 border-l-4 border-blue-500">
                <p className="text-[9px] font-bold text-blue-400 uppercase">Live Pipeline Status</p>
                <p className="text-sm font-black text-blue-900 uppercase tracking-widest">{order.orderStatus}</p>
              </div>

              <form onSubmit={updateHandler} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-gray-500 uppercase ml-1">Update Progress</label>
                  <select 
                    className="w-full border border-gray-300 text-xs p-3 outline-none focus:ring-1 focus:ring-blue-500 bg-gray-50 font-semibold"
                    onChange={(e) => setStatus(e.target.value)}
                    value={status}
                  >
                    <option value="">-- Change State --</option>
                    <option value="placed">Placed</option>
                    <option value="packed">Packed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <button 
                  type="submit"
                  disabled={!status || order.orderStatus === "delivered" || order.orderStatus === "cancelled"}
                  className="w-full bg-gray-800 text-white text-[10px] font-bold py-3 uppercase hover:bg-black transition-all shadow-sm active:scale-95 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  Commit Status Change
                </button>
              </form>

              <div className="mt-8 pt-4 border-t border-gray-100 space-y-3">
                 <div className="flex justify-between items-center text-[10px] font-bold uppercase">
                    <span className="text-gray-400">Payment Type</span>
                    <span className="bg-teal-100 text-teal-800 px-2 py-0.5 rounded italic">Paid</span>
                 </div>
                 <div className="flex justify-between items-center text-[10px] font-bold uppercase">
                    <span className="text-gray-400">Log Created</span>
                    <span className="text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</span>
                 </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetail;