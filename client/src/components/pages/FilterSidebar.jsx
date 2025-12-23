import { Filter } from 'lucide-react';
import React from 'react'

const FilterGroup=({title,items})=>(
    <div className="mb-8">
            <h3 className="text-xs font-black text-gray-400 uppercase mb-4 tracking-tighter">
      {title}
    </h3>
    <div className="space-y-3">
      {items.map((item) => (
        <label key={item} className="flex items-center group cursor-pointer">
          <input 
            type="checkbox" 
            className="w-4 h-4 rounded border-gray-300 text-[#24aeb1] focus:ring-[#24aeb1] cursor-pointer" 
          />
          <span className="ml-3 text-sm text-gray-600 group-hover:text-[#24aeb1] transition-colors">
            {item}
          </span>
        </label>
      ))}
    </div>
    </div>
);

const FilterSidebar = ({categories}) => {
  return (
    <aside className="w-full md:w-64 flex-shrink-0">
      <div className="bg-white rounded-lg border border-gray-200 p-5 sticky top-20 shadow-sm">
        <div className="flex items-center gap-2 mb-6 pb-2 border-b">
          <Filter size={18} className="text-[#24aeb1]" />
          <h2 className="font-bold text-gray-800 uppercase tracking-wide text-sm">Filters</h2>
        </div>
        <FilterGroup title="Categories" items={categories} />
       
      </div>
    </aside>
  )
}

export default FilterSidebar
