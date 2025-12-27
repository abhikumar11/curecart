import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { 
  Package, Plus, List, AlertTriangle, Clock, Target, 
  Zap, ArrowRight, History, CheckCircle2, TrendingUp, BarChart3 
} from 'lucide-react';

// Mock Data
const salesData = [
  { name: 'Mon', sales: 4000 }, { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 5000 }, { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 1890 }, { name: 'Sat', sales: 2390 },
  { name: 'Sun', sales: 3490 },
];

const categoryData = [
  { name: 'Tablets', qty: 450 }, { name: 'Syrups', qty: 320 },
  { name: 'Inhalers', qty: 150 }, { name: 'Supplements', qty: 280 },
];

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.userLogin);

  return (
    <div className="space-y-6 pb-10">
      
      {/* --- SECTION 1: TOP STATS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Pending Orders', value: '18', sub: '4 Urgent', icon: <Clock size={18}/>, color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: 'Out of Stock', value: '12', sub: 'Critical', icon: <AlertTriangle size={18}/>, color: 'text-red-600', bg: 'bg-red-50' },
          { label: 'Monthly Goal', value: '82%', sub: '₹2.1L / 2.5L', icon: <Target size={18}/>, color: 'text-teal-600', bg: 'bg-teal-50' },
          { label: 'Store Rating', value: '4.8', sub: 'Top Rated', icon: <Zap size={18}/>, color: 'text-blue-600', bg: 'bg-blue-50' },
        ].map((card, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <div className={`${card.bg} ${card.color} w-10 h-10 rounded-xl flex items-center justify-center mb-3`}>
              {card.icon}
            </div>
            <p className="text-gray-400 text-[10px] uppercase font-black tracking-widest">{card.label}</p>
            <h2 className="text-2xl font-black text-gray-800">{card.value}</h2>
            <p className="text-[10px] text-gray-400 mt-1">{card.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* --- SECTION 2: CHARTS (Left 2 Columns) --- */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Main Sales Chart */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-black text-gray-800 flex items-center gap-2">
                <TrendingUp size={18} className="text-teal-600" /> Revenue Growth
              </h3>
            </div>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0d9488" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                  <YAxis hide />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Area type="monotone" dataKey="sales" stroke="#0d9488" strokeWidth={3} fill="url(#colorSales)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* --- SECTION 3: INVENTORY QUICK LINKS --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/seller/newproduct" className="group p-5 bg-[#0d2e2e] rounded-2xl flex items-center justify-between hover:bg-teal-900 transition-all">
               <div className="flex items-center gap-4">
                 <div className="bg-teal-500 p-3 rounded-xl text-white"><Plus size={20}/></div>
                 <div>
                    <h4 className="text-white font-bold text-sm">Add Medicine</h4>
                    <p className="text-teal-400 text-[10px]">Create new listing</p>
                 </div>
               </div>
               <ArrowRight className="text-teal-700 group-hover:text-white" size={18}/>
            </Link>
            <Link to="/seller/products" className="group p-5 bg-white border border-gray-100 rounded-2xl flex items-center justify-between hover:border-teal-500 transition-all">
               <div className="flex items-center gap-4">
                 <div className="bg-gray-100 p-3 rounded-xl text-gray-600"><List size={20}/></div>
                 <div>
                    <h4 className="text-gray-800 font-bold text-sm">Manage Stock</h4>
                    <p className="text-gray-400 text-[10px]">Update inventory</p>
                 </div>
               </div>
               <ArrowRight className="text-gray-200 group-hover:text-teal-600" size={18}/>
            </Link>
          </div>
        </div>

        {/* --- SECTION 4: ACTIVITY & SECONDARY CHART (Right Column) --- */}
        <div className="space-y-6">
          
          {/* Inventory Mix Bar Chart */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-black text-gray-800 mb-4 text-sm flex items-center gap-2">
              <BarChart3 size={16} className="text-teal-600"/> Stock Mix
            </h3>
            <div className="h-[150px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData}>
                    <XAxis dataKey="name" hide />
                    <Tooltip cursor={{fill: 'transparent'}} />
                    <Bar dataKey="qty" fill="#14b8a6" radius={[4, 4, 4, 4]} barSize={25} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-black text-gray-800 mb-6 flex items-center gap-2 text-sm">
              <History size={16} className="text-teal-600" /> Recent Activity
            </h3>
            <div className="space-y-5">
              {[
                { title: 'New Order #224', time: '2m ago', color: 'text-green-500', bg: 'bg-green-50' },
                { title: 'Low Stock: Crocin', time: '1h ago', color: 'text-red-500', bg: 'bg-red-50' },
                { title: 'Payment Sent', time: '3h ago', color: 'text-teal-500', bg: 'bg-teal-50' },
              ].map((act, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className={`w-2 h-2 mt-1.5 rounded-full ${act.color.replace('text', 'bg')}`} />
                  <div>
                    <p className="text-xs font-bold text-gray-800 leading-tight">{act.title}</p>
                    <p className="text-[10px] text-gray-400">{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-tighter rounded-lg hover:bg-gray-100 transition">
              View Full Logs
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;