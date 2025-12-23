import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';

const ProductCard = ({ 
  image = "https://via.placeholder.com/150", 
  name = "Accu-Chek Active Test Strips (50 count)", 
  mfr = "Roche Diabetes Care",
  price = 975, 
  originalPrice = 1150,
  rating = 4.4
}) => {
  
  const discount = Math.round(((originalPrice - price) / originalPrice) * 100);

  return (
    <div className="group bg-white rounded-xl border border-gray-200 p-4 hover:shadow-xl transition-all duration-300 flex flex-col h-full max-w-[240px]">
      
   
      <div className="relative aspect-square mb-3 flex items-center justify-center overflow-hidden bg-gray-50 rounded-lg">
        <img 
          src={image} 
          alt={name} 
          className="object-contain h-32 w-32 group-hover:scale-105 transition-transform duration-300" 
        />
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
            {discount}% OFF
          </div>
        )}
      </div>

      
      <div className="flex-grow">
        <p className="text-[10px] uppercase text-gray-400 font-bold tracking-wider mb-1">
          {mfr}
        </p>
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug mb-2 group-hover:text-[#24aeb1]">
          {name}
        </h3>
        
        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center bg-[#24aeb1] text-white text-[11px] px-1.5 py-0.5 rounded font-bold">
            {rating} <Star size={10} className="fill-current ml-0.5" />
          </div>
          <span className="text-[11px] text-gray-400 font-medium">105 ratings</span>
        </div>
      </div>
      <div className="mt-auto pt-3 border-t border-gray-50">
        <div className="mb-3">
          <p className="text-xs text-gray-500 mb-0.5">MRP <span className="line-through">₹{originalPrice}</span></p>
          <p className="text-lg font-black text-gray-900 leading-none">
            ₹{price}
          </p>
        </div>
        
        <button className="w-full bg-white border-2 border-[#24aeb1] text-[#24aeb1] py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#24aeb1] hover:text-white transition-colors duration-200">
          <ShoppingCart size={16} />
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ProductCard;