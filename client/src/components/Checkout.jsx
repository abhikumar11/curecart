import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MapPin, ShieldCheck, CreditCard, Wallet, Truck, Home } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { verifyPayment } from '../redux/actions/CartAction';
import { useNavigate, Link } from 'react-router-dom';

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('Online Payment');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cart } = useSelector((state) => state.userCart);
  const { user } = useSelector((state) => state.userLogin);

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
  const netTotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const totalPayable = netTotal;

  const handleCheckout = async () => {

    if (!user?.address) {
      toast.error("Please add a delivery address first!");
      return;
    }

    if (paymentMethod === 'Online Payment') {
      try {

        const { data: orderRes } = await axios.post("http://localhost:3001/payment/order", { amount: totalPayable });
        const order = orderRes.order;

        const options = {
          key: "rzp_test_Ruxmmmq53aP7FB", 

          amount: order.amount,
          currency: "INR",
          name: "CureCart",
          description: "Healthcare Purchase",
          order_id: order.id,
          handler: async (res) => {
            const paymentPayload = {
              razorpay_order_id: res.razorpay_order_id,
              razorpay_payment_id: res.razorpay_payment_id,
              razorpay_signature: res.razorpay_signature,
              orderDetails: {
                customerId: user._id,
                totalAmount: totalPayable,
                shippingAddress: `${user.address}, ${user.city}, ${user.state} - ${user.pin}`,
                items: cart.map(item => ({
                  productId: item._id,
                  quantity: item.qty,
                  price: item.price
                }))
              }
            };

            const result = await dispatch(verifyPayment(paymentPayload));
            console.log("Response from verifyPayment:", result);
            if (result && result.success) {
              navigate("/ordersuccess", { 
                state: { 
                  orderId: result.orderId,
                  paymentId: res.razorpay_payment_id 
                } 
              });
            } else {
              toast.error("Order failed. Please contact support.");
            }
          },
          prefill: { 
            name: user?.name, 
            email: user?.email,
            contact: user?.mobile || "" 
          },
          theme: { color: "#24aeb1" }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();

      } catch (err) {
        console.error(err);
        toast.error("Could not initialize payment. Try again.");
      }
    } else {

      toast.info("Cash on Delivery is currently in maintenance. Please use Online Payment.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-6 font-sans">
      <div className="max-w-6xl mx-auto px-4">

        {}
        <div className="flex items-center mb-6 bg-white p-4 border border-gray-300 rounded-md shadow-sm">
          <div className="flex items-center gap-2">
             <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-teal-500 text-white' : 'bg-gray-200'}`}>1</div>
             <span className={`text-xs font-bold ${step >= 1 ? 'text-teal-600' : 'text-gray-400'}`}>ADDRESS</span>
          </div>
          <div className="mx-4 h-[1px] w-12 bg-gray-200"></div>
          <div className="flex items-center gap-2">
             <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-teal-500 text-white' : 'bg-gray-200'}`}>2</div>
             <span className={`text-xs font-bold ${step >= 2 ? 'text-teal-600' : 'text-gray-400'}`}>PAYMENT</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {}
          <div className="lg:col-span-8 space-y-4">

            {}
            <div className="bg-white border border-gray-300 rounded-md overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-300 flex justify-between items-center">
                <h2 className="text-sm font-black text-gray-800 uppercase flex items-center gap-2">
                  <MapPin size={16} className="text-teal-500" /> 1. Delivery Address
                </h2>
                {step === 2 && (
                  <button onClick={() => setStep(1)} className="text-[10px] font-bold text-teal-600 uppercase hover:underline">Change</button>
                )}
              </div>
              <div className="p-5">
                {user?.address ? (
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-teal-50 rounded-md">
                        <Home size={20} className="text-teal-600" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-gray-800">{user.name}</p>
                      <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                        {user.address}, {user.city}, {user.state} - {user.pin}
                      </p>
                      {step === 1 && (
                        <button 
                          onClick={() => setStep(2)}
                          className="mt-4 bg-teal-500 hover:bg-teal-600 text-white px-8 py-2.5 text-[10px] font-black rounded-md uppercase tracking-wider transition-colors shadow-sm"
                        >
                          Deliver to this address
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <Link to="/myaddress" className="text-teal-600 text-sm font-bold border-2 border-dashed border-teal-200 p-4 block rounded-md hover:bg-teal-50">
                        + Add Delivery Address
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {}
            <div className={`bg-white border border-gray-300 rounded-md overflow-hidden transition-opacity duration-300 ${step < 2 ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
              <div className="p-4 bg-gray-50 border-b border-gray-300">
                <h2 className="text-sm font-black text-gray-800 uppercase flex items-center gap-2">
                  <CreditCard size={16} className="text-teal-500" /> 2. Select Payment Method
                </h2>
              </div>
              <div className="p-5 space-y-4">
                {[
                  { id: 'Online Payment', icon: <Wallet size={16}/>, desc: 'Pay securely via UPI, Cards, or NetBanking' },
                  { id: 'Cash on Delivery', icon: <Truck size={16}/>, desc: 'Pay when you receive the package' }
                ].map((method) => (
                  <label 
                    key={method.id} 
                    className={`flex items-center gap-4 p-4 border rounded-md cursor-pointer transition-all ${paymentMethod === method.id ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:bg-gray-50'}`}
                  >
                    <input 
                      type="radio" 
                      name="payment" 
                      className="accent-teal-500"
                      checked={paymentMethod === method.id} 
                      onChange={() => setPaymentMethod(method.id)}
                    />
                    <div className="flex-grow">
                        <p className="text-sm font-bold text-gray-800 flex items-center gap-2">
                            {method.icon} {method.id}
                        </p>
                        <p className="text-[10px] text-gray-500">{method.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {}
          <div className="lg:col-span-4">
            <div className="bg-white border border-gray-300 rounded-md p-5 sticky top-6 shadow-sm">
              <h3 className="text-xs font-black border-b border-gray-100 pb-3 mb-4 uppercase tracking-widest text-gray-400">Bill Details</h3>

              <div className="space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Items Subtotal ({totalItems})</span>
                  <span className="font-bold text-gray-700">₹{netTotal}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Delivery Charges</span>
                  <span className="text-green-600 font-bold uppercase">Free</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Packaging Fee</span>
                  <span className="font-bold text-gray-700">₹0</span>
                </div>

                <div className="flex justify-between text-sm font-black border-t border-dashed border-gray-200 pt-4 mt-2 text-gray-800">
                  <span>TOTAL PAYABLE</span>
                  <span className="text-teal-600 text-lg">₹{totalPayable}</span>
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                disabled={step < 2}
                className={`w-full mt-6 py-4 font-black text-xs uppercase tracking-widest rounded-md transition-all shadow-md
                  ${step === 2 
                    ? 'bg-teal-500 text-white hover:bg-teal-600 active:scale-[0.98]' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200 shadow-none'
                  }`}
              >
                {paymentMethod === 'Online Payment' ? 'Pay & Place Order' : 'Confirm Order'}
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-gray-400 font-bold">
                <ShieldCheck size={14} className="text-green-500" />
                <span>100% SAFE & SECURE PAYMENTS</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;