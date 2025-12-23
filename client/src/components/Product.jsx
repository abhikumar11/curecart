import React from 'react';
import ProductCard from './ProductCard';
import FilterSidebar from './pages/FilterSidebar';
import { ChevronDown } from 'lucide-react';


const Product = () => {
  const categories = ["Vitamins", "Diabetes", "Baby Care", "Homeopathy", "Ayurveda"];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 p-4">
        <FilterSidebar categories={categories} />

        <main className="flex-1">
     
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 flex flex-col sm:flex-row justify-between items-center shadow-sm">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-xl font-bold text-gray-800">Vitamins & Supplements</h1>
              <p className="text-xs text-gray-400">Showing 1-12 of 450 items</p>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500 font-medium">Sort By:</span>
              <div className="relative">
                <select className="appearance-none bg-gray-50 border border-gray-200 text-sm py-2 pl-4 pr-10 rounded-lg focus:outline-none focus:border-[#24aeb1] cursor-pointer font-semibold text-gray-700">
                  <option>Popularity</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Discount</option>
                </select>
                <ChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" size={16} />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <ProductCard key={i} />
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <button className="px-6 py-2 border-2 border-[#24aeb1] text-[#24aeb1] font-bold rounded-lg hover:bg-[#24aeb1] hover:text-white transition shadow-sm">
              Load More
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Product;