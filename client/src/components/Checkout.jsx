import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MapPin, CreditCard, ChevronRight, ShieldCheck, Home, Briefcase } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { verifyPayment } from '../redux/actions/CartAction';
import { useNavigate } from 'react-router-dom';


const Checkout = () => {
  const [step, setStep] = useState(1);
  const {cart} = useSelector((state) => state.userCart);
  const {user} = useSelector((state) => state.userLogin);
  const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const navigate=useNavigate();
  const dispatch=useDispatch();

    const handleCheckout=async()=>{
      const { data:orderRes} = await axios.post("http://localhost:3001/payment/order", { amount: totalAmount });
      const order = orderRes.order;
      const options={
        key:"rzp_test_Ruxmmmq53aP7FB",
        amount:order.amount,
        currency:"INR",
        name: "CureCart",
        order_id: order.id,
        handler:async(res)=>{
          const paymentPayload={
          razorpay_order_id: res.razorpay_order_id,
          razorpay_payment_id: res.razorpay_payment_id,
          razorpay_signature: res.razorpay_signature,
          orderDetails: {
            customerId: user._id,
            totalAmount: totalAmount,
            items: cart.map(item => ({
              productId: item._id,
              quantity: item.qty,
              price: item.price
            }))
          }
        };
            const isSuccess = await dispatch(verifyPayment(paymentPayload));
            if (isSuccess) 
              {navigate("/ordersuccess");}
            else{
              toast.error("Payment verification failed!");
            }
        },
        prefill: {
        name: "Customer Name",
        email: "customer@example.com",
      },
        theme: { color: "#24aeb1" }
      }
      const rzp = new window.Razorpay(options);
      rzp.open();
    }
  return (
    <div className="bg-[#f3f7fb] min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4">
       
        <div className="flex items-center justify-center mb-8 gap-4">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-[#24aeb1]' : 'text-gray-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-[#24aeb1] bg-[#24aeb1] text-white' : 'border-gray-400'} text-xs font-bold`}>1</span>
            <span className="text-sm font-bold">Delivery Address</span>
          </div>
          <div className="w-16 h-[2px] bg-gray-300"></div>
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-[#24aeb1]' : 'text-gray-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-[#24aeb1] bg-[#24aeb1] text-white' : 'border-gray-400'} text-xs font-bold`}>2</span>
            <span className="text-sm font-bold">Payment</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-4">
            <div className={`bg-white rounded-xl shadow-sm border ${step === 1 ? 'border-[#24aeb1]' : 'border-gray-200'} overflow-hidden`}>
              <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                <h2 className="font-bold text-gray-800 flex items-center gap-2">
                  <MapPin size={18} className="text-[#24aeb1]" /> 1. Select Delivery Address
                </h2>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="border-2 border-[#24aeb1] bg-teal-50/30 p-4 rounded-lg cursor-pointer relative">
                    <div className="flex items-center gap-2 mb-2">
                      <Home size={16} className="text-[#24aeb1]" />
                      <span className="text-xs font-bold uppercase text-[#24aeb1]">Home</span>
                    </div>
                    <p className="text-sm font-bold text-gray-800">John Doe</p>
                    <p className="text-xs text-gray-600 leading-relaxed">123, Health Street, Sector 44, Gurgaon, Haryana - 122003</p>
                    <input type="radio" name="address" className="absolute top-4 right-4 accent-[#24aeb1]" defaultChecked />
                  </label>

                  <button className="border-2 border-dashed border-gray-300 p-4 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:border-[#24aeb1] hover:text-[#24aeb1] transition-all">
                    <span className="text-2xl">+</span>
                    <span className="text-xs font-bold uppercase">Add New Address</span>
                  </button>
                </div>
                
                {step === 1 && (
                  <button 
                    onClick={() => setStep(2)}
                    className="mt-6 w-full md:w-auto bg-[#24aeb1] text-white px-10 py-3 rounded-lg font-bold shadow-md hover:bg-[#1e8f91]"
                  >
                    DELIVER TO THIS ADDRESS
                  </button>
                )}
              </div>
            </div>
            <div className={`bg-white rounded-xl shadow-sm border ${step === 2 ? 'border-[#24aeb1]' : 'border-gray-200'} overflow-hidden ${step < 2 ? 'opacity-60 pointer-events-none' : ''}`}>
              <div className="p-4 border-b bg-gray-50">
                <h2 className="font-bold text-gray-800 flex items-center gap-2">
                  <CreditCard size={18} className="text-[#24aeb1]" /> 2. Payment Method
                </h2>
              </div>
              <div className="p-6 space-y-4">
                {['Credit/Debit Card', 'UPI (PhonePe/GPay)', 'Cash on Delivery'].map((method) => (
                  <label key={method} className="flex items-center justify-between p-4 border rounded-lg hover:border-[#24aeb1] cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full border-2 border-gray-300 group-hover:border-[#24aeb1] flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-transparent group-hover:bg-[#24aeb1]"></div>
                      </div>
                      <span className="text-sm font-medium text-gray-700">{method}</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-300" />
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-24">
              <div className="p-4 border-b">
                <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider">Order Summary</h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between text-sm text-gray-500 border-t pt-3">
                  <span>Shipping Charges</span>
                  <span className="text-green-600 font-bold text-xs uppercase italic">Free</span>
                </div>
                <div className="flex justify-between text-lg font-black text-gray-900 border-t pt-3 mt-2">
                  <span>Total Payable</span>
                  <span>₹{totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <div className="p-4 bg-gray-50 border-t">
                <button  onClick={handleCheckout}
                  disabled={step < 2}
                  className={`w-full py-4 rounded-lg font-black text-sm tracking-widest shadow-lg transition-all uppercase ${step === 2 ? 'bg-[#24aeb1] text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                >
                  Place Your Order
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2">
              <ShieldCheck className="text-green-600 flex-shrink-0" size={24} />
              <p className="text-[10px] text-gray-500 leading-tight">
                Your personal and payment details are secure. NetStore ensures 100% data protection.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;