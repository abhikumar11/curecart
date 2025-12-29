import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingCart, Star, ShieldCheck, Truck, RotateCcw, Plus, Minus } from 'lucide-react';
import { getSingleProduct } from '../redux/actions/ProductAction';
import { addItem } from '../redux/actions/CartAction';
import { toast } from 'react-toastify';

const ProductDetails = () => {
  const { id } = useParams();
  console.log(id)
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);

  const { loading, error, product } = useSelector((state) => state.productDetails);
console.log(product)
  useEffect(() => {
    dispatch(getSingleProduct(id));

    window.scrollTo(0, 0);
  }, [dispatch, id]);

  const addToCartHandler = () => {
    dispatch(addItem({ ...product, qty }));
    toast.success("Added to cart!");
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#24aeb1]"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center text-red-500 font-bold">
      Error: {error}
    </div>
  );

  return (
    <div className="bg-white min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          {}
          <div className="space-y-4">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 flex justify-center items-center min-h-[450px]">
              <img 
                src={product?.productImages?.[0]} 
                alt={product?.productName} 
                className="max-w-full max-h-[400px] object-contain mix-blend-multiply transition-transform duration-500 hover:scale-105"
              />
            </div>
            {}
            <div className="flex gap-2">
                {product?.productImages?.map((img, index) => (
                    <div key={index} className="w-20 h-20 border border-gray-200 rounded-md overflow-hidden p-1 cursor-pointer hover:border-[#24aeb1]">
                        <img src={img} className="w-full h-full object-contain" alt="thumb" />
                    </div>
                ))}
            </div>
          </div>

          {}
          <div className="flex flex-col h-full">
            <div className="mb-6">
              <span className="text-[#24aeb1] text-xs font-black uppercase tracking-widest bg-teal-50 px-2 py-1 rounded-sm">
                {product?.category || "General Healthcare"}
              </span>
              <h1 className="text-3xl font-bold text-gray-800 mt-3 leading-tight">
                {product?.productName}
              </h1>

              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center bg-[#24aeb1] text-white px-2 py-0.5 rounded-sm text-sm font-bold">
                  {product?.rating || "4.5"} <Star size={14} className="ml-1 fill-current" />
                </div>
                <span className="text-gray-400 text-sm font-medium border-l pl-4 border-gray-200">
                  {product?.numReviews || 0} Customer Reviews
                </span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-4xl font-black text-gray-900">₹{product?.price}</span>
                <span className="text-gray-400 line-through text-lg">₹{Math.round(product?.price * 1.2)}</span>
                <span className="text-green-600 font-bold text-sm">20% OFF</span>
              </div>
              <p className="text-xs text-gray-500 italic">Inclusive of all taxes</p>
            </div>

            <div className="mt-8 space-y-4">
              <h4 className="font-bold text-gray-700 text-sm uppercase tracking-wide">Product Description</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                {product?.description || "High-quality medical supplies curated for your health needs. Safe, certified, and delivered to your doorstep with care."}
              </p>
            </div>

            {}
            <div className="mt-auto pt-10">
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center border-2 border-gray-200 rounded-md overflow-hidden">
                  <button 
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="p-3 hover:bg-gray-100 transition-colors text-gray-600"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="px-6 py-2 font-black text-lg w-16 text-center text-gray-800">{qty}</span>
                  <button 
                    onClick={() => setQty(qty + 1)}
                    className="p-3 hover:bg-gray-100 transition-colors text-gray-600 border-l border-gray-200"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                <button 
                  onClick={addToCartHandler}
                  disabled={product?.countInStock === 0}
                  className={`flex-grow md:flex-none md:px-12 py-4 rounded-md font-black uppercase text-sm tracking-widest flex items-center justify-center gap-3 transition-all
                    ${product?.countInStock === 0 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-[#24aeb1] text-white hover:bg-[#1e8f91] shadow-lg shadow-teal-100 active:scale-95'
                    }`}
                >
                  <ShoppingCart size={20} />
                  {product?.countInStock === 0 ? "Out of Stock" : "Add to Cart"}
                </button>
              </div>
            </div>

            {}
            <div className="grid grid-cols-3 gap-2 mt-12 pt-8 border-t border-gray-100">
              <div className="flex flex-col items-center text-center gap-2">
                <Truck size={24} className="text-[#24aeb1]" />
                <span className="text-[10px] font-bold text-gray-500 uppercase">Express Delivery</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 border-x border-gray-100">
                <RotateCcw size={24} className="text-[#24aeb1]" />
                <span className="text-[10px] font-bold text-gray-500 uppercase">7 Days Return</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <ShieldCheck size={24} className="text-[#24aeb1]" />
                <span className="text-[10px] font-bold text-gray-500 uppercase">Secure Payment</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;