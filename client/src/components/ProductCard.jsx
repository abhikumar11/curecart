import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/actions/CartAction';

const ProductCard = ({product}) => {
  console.log(product)
  const dispatch=useDispatch();

  const handleCart=(pro)=>{
    const temp={...pro,qty:1};
    console.log(temp);
      dispatch(addItem(temp));
  }
  return (
    <div className="group bg-white rounded-xl border border-gray-200 p-4 hover:shadow-xl transition-all duration-300 flex flex-col h-full max-w-[240px]">
      
   
      <div className="relative aspect-square mb-3 flex items-center justify-center overflow-hidden bg-gray-50 rounded-lg">
        <img 
          src={product?.productImages[0]} 
          alt={product.productName} 
          className="object-contain h-32 w-32 group-hover:scale-105 transition-transform duration-300" 
        />
      
      </div>

      
      <div className="flex-grow">
        <p className="text-[10px] uppercase text-gray-400 font-bold tracking-wider mb-1">
          
        </p>
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug mb-2 group-hover:text-[#24aeb1]">
          {product.productName}
        </h3>
        
        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center bg-[#24aeb1] text-white text-[11px] px-1.5 py-0.5 rounded font-bold">
            {"rating"} <Star size={10} className="fill-current ml-0.5" />
          </div>
          <span className="text-[11px] text-gray-400 font-medium">105 ratings</span>
        </div>
      </div>
      <div className="mt-auto pt-3 border-t border-gray-50">
        <div className="mb-3">
          <p className="text-lg font-black text-gray-900 leading-none">
            ₹{product.price}
          </p>
        </div>
        
        <button onClick={()=>handleCart(product)} className="w-full bg-white border-2 border-[#24aeb1] text-[#24aeb1] py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#24aeb1] hover:text-white transition-colors duration-200 hover:cursor-pointer">
          <ShoppingCart size={16} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;