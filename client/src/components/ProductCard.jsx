import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/actions/CartAction';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleCart = (pro) => {
    const temp = { ...pro, qty: 1 };
    dispatch(addItem(temp));
  };

  return (
    /* rounded-lg provides that subtle 'little corner' curve */
    <div className="group bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all duration-300 flex flex-col h-full max-w-[240px]">
      
      {/* Clickable area for navigation */}
      <Link to={`/product/${product?._id}`} className="flex-grow cursor-pointer">
        <div className="relative aspect-square mb-3 flex items-center justify-center overflow-hidden bg-gray-50 rounded-md">
          <img 
            src={product?.productImages?.[0]} 
            alt={product?.productName} 
            className="object-contain h-32 w-32 group-hover:scale-105 transition-transform duration-300" 
          />
        </div>

        <div className="flex-grow">
          <h3 className="text-sm font-bold text-gray-800 line-clamp-2 leading-snug mb-2 group-hover:text-[#24aeb1]">
            {product?.productName}
          </h3>
          
          <div className="flex items-center gap-2 mb-3">
            {/* Soft rectangle corners for the rating badge */}
            <div className="flex items-center bg-[#24aeb1] text-white text-[10px] px-2 py-0.5 rounded-sm font-bold">
              {product?.rating || "4.5"} <Star size={10} className="fill-current ml-0.5" />
            </div>
            <span className="text-[11px] text-gray-400 font-medium">({product?.numReviews || 105})</span>
          </div>

          <div className="mb-3">
            <p className="text-lg font-black text-gray-900 leading-none">
              ₹{product?.price}
            </p>
          </div>
        </div>
      </Link>

      {/* Button with soft rectangle corners (rounded-md) */}
      <div className="mt-auto pt-3 border-t border-gray-100">
        <button 
          onClick={(e) => {
            e.preventDefault();
            handleCart(product);
          }} 
          className="w-full bg-white border-2 border-[#24aeb1] text-[#24aeb1] py-2 rounded-md text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#24aeb1] hover:text-white transition-all duration-200 cursor-pointer uppercase tracking-wider"
        >
          <ShoppingCart size={14} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;