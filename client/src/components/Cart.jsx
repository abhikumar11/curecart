import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Trash2, Plus, Minus, ShieldCheck, ChevronRight, Tag } from 'lucide-react';
import { removeItem, increaseQty, decreaseQty } from "../redux/actions/CartAction";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const { _id:id,productName:name, price, qty, productImages:image } = item;

  return (
    <div className="flex gap-4 py-6 border-b border-gray-100 last:border-0">
      <div className="w-20 h-20 bg-gray-50 rounded-md flex-shrink-0 border border-gray-100 flex items-center justify-center overflow-hidden">
        {image ? (
          <img src={image[0]} alt={name} className="object-contain" />
        ) : (
          <span className="text-[10px] text-gray-400 italic text-center px-1">Product Image</span>
        )}
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-bold text-gray-800 leading-tight mb-1">{name}</h3>
           
          </div>
          <button 
            onClick={() => dispatch(removeItem(id))}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>

        <div className="flex justify-between items-end mt-2">
        
          <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-2 py-1 shadow-sm">
            <button 
              onClick={() => dispatch(decreaseQty(id))}
              className="text-[#24aeb1] hover:bg-teal-50 p-1 rounded transition-colors"
            >
              <Minus size={14}/>
            </button>
            <span className="text-sm font-bold w-4 text-center">{qty}</span>
            <button 
              onClick={() => dispatch(increaseQty(id))}
              className="text-[#24aeb1] hover:bg-teal-50 p-1 rounded transition-colors"
            >
              <Plus size={14}/>
            </button>
          </div>

          <div className="text-right">
            <p className="text-xs text-black ">₹{price.toFixed(2)}</p>
           
          </div>
        </div>
      </div>
    </div>
  );
};

const Cart = () => {
 
  const {cart} = useSelector((state) => state.userCart);
  console.log("cart",cart)
 
  const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const totaQty=cart.reduce((acc,item)=>(acc+item.qty),0)


  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f3f7fb]">
        <h2 className="text-2xl font-bold text-gray-400">Your cart is empty</h2>
        <button className="mt-4 bg-[#24aeb1] text-white px-6 py-2 rounded-lg font-bold">Shop Now</button>
      </div>
    );
  }

  return (
    <div className="bg-[#f3f7fb] min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
     
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-4">
            <div className="p-4 border-b bg-teal-50/30 flex justify-between items-center">
              <h2 className="font-bold text-gray-800">Shopping Cart</h2>
              
            </div>
            <div className="px-6">
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200 flex items-center gap-4 shadow-sm">
            <div className="bg-green-100 p-2 rounded-full text-green-600">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800 tracking-tight">Safe and Secure Payments</p>
              <p className="text-xs text-gray-500">100% Authentic products guaranteed</p>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[380px] space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b">
              <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider">Bill Summary</h3>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Total Items</span>
                <span>{totaQty}</span>
              </div>
              <div className="flex justify-between text-lg font-black text-gray-900 pt-2 border-t mt-2">
                <span>Total Amount</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 border-t">
              
              <button className="w-full bg-[#24aeb1] hover:bg-[#1e8f91] text-white py-4 rounded-lg font-black text-sm tracking-widest shadow-lg transition-all active:scale-[0.98] uppercase">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;