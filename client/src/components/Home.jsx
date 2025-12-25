import React, { useEffect } from 'react';
import { ChevronRight, ShieldCheck, Truck, Zap, Star } from 'lucide-react';
import ProductCard from './ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import {getProduct} from "../redux/actions/ProductAction";
const Home = () => {
  const {loading,error,productList}=useSelector((state)=>state.products);

  const dispatch=useDispatch();

  useEffect(()=>{
      dispatch(getProduct());
  },[dispatch])

  console.log(productList);
  return (
    <div className="bg-[#f3f7fb] min-h-screen">
     
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-4">
        
          <div className="flex-grow bg-gradient-to-r from-[#24aeb1] to-[#008080] rounded-xl p-8 text-white relative overflow-hidden h-[280px] flex flex-col justify-center">
            <div className="z-10 max-w-md">
              <span className="bg-[#ffc610] text-black px-3 py-1 rounded-full text-xs font-bold mb-4 inline-block uppercase tracking-wider">
                Limited Time Offer
              </span>
              <h1 className="text-4xl font-bold mb-2">Get 25% OFF + 10% Cashback</h1>
              <p className="text-teal-50 mb-6 italic">Valid on all prescription medicines today.</p>
              <button className="bg-white text-[#24aeb1] px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition shadow-lg">
                Upload Prescription
              </button>
            </div>
           
            <div className="absolute right-[-5%] top-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 pb-10">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {[
            { name: 'Medicines', icon: '💊', color: 'bg-blue-50' },
            { name: 'Lab Tests', icon: '🧪', color: 'bg-purple-50' },
            { name: 'Consult', icon: '👨‍⚕️', color: 'bg-green-50' },
            { name: 'Ayurveda', icon: '🌿', color: 'bg-orange-50' },
            { name: 'Wellness', icon: '🧘', color: 'bg-pink-50' },
            { name: 'Care Plan', icon: '💎', color: 'bg-yellow-50' },
          ].map((item) => (
            <div key={item.name} className="flex flex-col items-center group cursor-pointer">
              <div className={`${item.color} w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-3xl mb-2 group-hover:shadow-md transition-all border border-transparent group-hover:border-[#24aeb1]/20`}>
                {item.icon}
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-[#24aeb1]">{item.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Popular on CureCart</h2>
              <p className="text-sm text-gray-400">Handpicked wellness products for you</p>
            </div>
            <button className="flex items-center gap-1 text-[#24aeb1] font-bold text-sm hover:underline">
              SEE ALL <ChevronRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {productList?.map((product) => (
  <ProductCard key={product._id || product.id} product={product} />
))}
          </div>
        </div>
      </section>

  
      <section className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center gap-4">
            <div className="bg-[#24aeb1]/10 p-3 rounded-full text-[#24aeb1]"><ShieldCheck size={28}/></div>
            <div>
              <h4 className="font-bold text-gray-800">100% Genuine</h4>
              <p className="text-xs text-gray-500">Products sourced directly from brands</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-[#24aeb1]/10 p-3 rounded-full text-[#24aeb1]"><Truck size={28}/></div>
            <div>
              <h4 className="font-bold text-gray-800">Free Shipping</h4>
              <p className="text-xs text-gray-500">On all orders above ₹500</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-[#24aeb1]/10 p-3 rounded-full text-[#24aeb1]"><Zap size={28}/></div>
            <div>
              <h4 className="font-bold text-gray-800">Express Delivery</h4>
              <p className="text-xs text-gray-500">Get your medicines within 24 hours</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;