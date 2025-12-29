import React, { useEffect, useState } from 'react';
import { ChevronRight, ShieldCheck, Truck, Zap } from 'lucide-react';
import ProductCard from './ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from "../redux/actions/ProductAction";

const Home = () => {
  const { loading, error, productList } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      title: "Health Essentials",
      discount: "Flat 25% OFF",
      sub: "On all prescription medicines",
      bg: "from-[#24aeb1] to-[#008080]"
    },
    {
      title: "Beauty & Care",
      discount: "UP TO 40% OFF",
      sub: "Premium skincare & wellness",
      bg: "from-pink-500 to-rose-600"
    }
  ];

  useEffect(() => {
    dispatch(getProduct());

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [dispatch, slides.length]);

  const medicineProducts = productList?.filter(p => p.section === "Medicine").slice(0, 5);
  const beautyProducts = productList?.filter(p => p.section === "Beauty").slice(0, 5);

  return (
    <div className="bg-[#f3f7fb] min-h-screen pb-10">

      {}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className={`relative overflow-hidden h-[300px] rounded-2xl bg-gradient-to-r ${slides[currentSlide].bg} text-white transition-all duration-700 ease-in-out`}>
          <div className="flex flex-col justify-center h-full p-10 md:p-16 z-10 relative">
            <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold mb-4 inline-block uppercase tracking-widest w-fit">
              Seasonal Deal
            </span>
            <h1 className="text-4xl md:text-5xl font-black mb-2">{slides[currentSlide].discount}</h1>
            <p className="text-xl md:text-2xl font-light opacity-90 mb-6">{slides[currentSlide].title}</p>
            <p className="text-sm italic opacity-80">{slides[currentSlide].sub}</p>
          </div>

          {}
          <div className="absolute right-[-10%] bottom-[-20%] w-80 h-80 bg-black/10 rounded-full blur-3xl"></div>
          <div className="absolute left-[40%] top-[-20%] w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>

          {}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
            {slides.map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all ${currentSlide === i ? 'w-8 bg-white' : 'w-2 bg-white/40'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="max-w-7xl mx-auto px-4 pb-10">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {[
            { name: 'Medicines', icon: '💊', color: 'bg-blue-50' },
            { name: 'Lab Tests', icon: '🧪', color: 'bg-purple-50' },
            { name: 'Consult', icon: '👨‍⚕️', color: 'bg-green-50' },
            { name: 'Ayurveda', icon: '🌿', color: 'bg-orange-50' },
            { name: 'Wellness', icon: '🧘', color: 'bg-pink-50' },
            { name: 'Devices', icon: '🌡️', color: 'bg-yellow-50' },
          ].map((item) => (
            <div key={item.name} className="flex flex-col items-center group cursor-pointer">
              <div className={`${item.color} w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-3xl mb-2 group-hover:scale-105 transition-all shadow-sm`}>
                {item.icon}
              </div>
              <span className="text-sm font-bold text-gray-600 group-hover:text-[#24aeb1]">{item.name}</span>
            </div>
          ))}
        </div>
      </section>

      {}
      <section className="max-w-7xl mx-auto px-4 pb-10">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-xl font-black text-gray-800 uppercase tracking-tight">Essential Medicines</h2>
              <p className="text-xs text-gray-400 font-bold">Top rated healthcare supplies</p>
            </div>
            <button className="flex items-center gap-1 text-[#24aeb1] font-black text-[10px] uppercase tracking-widest hover:underline">
              View Pharmacy <ChevronRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {medicineProducts?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="bg-[#fffafa] rounded-2xl p-6 border border-rose-100">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-xl font-black text-rose-800 uppercase tracking-tight">Beauty & Personal Care</h2>
              <p className="text-xs text-rose-400 font-bold">Look good, feel better</p>
            </div>
            <button className="flex items-center gap-1 text-rose-500 font-black text-[10px] uppercase tracking-widest hover:underline">
              See Collection <ChevronRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {beautyProducts?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-10 border-t border-gray-200">
          <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
            <div className="bg-teal-50 p-3 rounded-full text-[#24aeb1]"><ShieldCheck size={24}/></div>
            <div>
              <h4 className="font-bold text-gray-800 text-sm tracking-tight">Genuine Products</h4>
              <p className="text-[10px] text-gray-400 uppercase font-bold">Direct from source</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
            <div className="bg-teal-50 p-3 rounded-full text-[#24aeb1]"><Truck size={24}/></div>
            <div>
              <h4 className="font-bold text-gray-800 text-sm tracking-tight">Free Shipping</h4>
              <p className="text-[10px] text-gray-400 uppercase font-bold">On orders above ₹500</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
            <div className="bg-teal-50 p-3 rounded-full text-[#24aeb1]"><Zap size={24}/></div>
            <div>
              <h4 className="font-bold text-gray-800 text-sm tracking-tight">24h Delivery</h4>
              <p className="text-[10px] text-gray-400 uppercase font-bold">Express fulfillment</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;