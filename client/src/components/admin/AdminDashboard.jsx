import React from 'react';
import { useSelector } from 'react-redux';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { 
  Package, ShoppingBag, AlertCircle, Users, 
  TrendingUp, CheckCircle, Clock, Truck 
} from 'lucide-react';

const AdminDashboard = () => {

  const stats = [
    { label: 'Total Revenue', value: '₹4,82,000', icon: <TrendingUp size={20}/>, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Active Orders', value: '24', icon: <ShoppingBag size={20}/>, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Inventory Alert', value: '8 Items', icon: <AlertCircle size={20}/>, color: 'text-rose-600', bg: 'bg-rose-50' },
    { label: 'Total Customers', value: '1,142', icon: <Users size={20}/>, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  ];

  return (
    <div className="p-8 bg-[#f8fafc] min-h-screen font-sans">

      {}

      {}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className={`${stat.bg} ${stat.color} p-3 rounded-lg`}>
                {stat.icon}
              </div>
              <span className="text-emerald-500 text-xs font-bold">+12.5%</span>
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
            <h2 className="text-2xl font-black text-slate-800 mt-1">{stat.value}</h2>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
            Revenue Flow <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500 uppercase">Order.totalAmount</span>
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockChartData}>
                <defs>
                  <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                <Tooltip />
                <Area type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={3} fill="url(#colorAmt)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6 uppercase text-xs tracking-widest">Fulfillment Pipeline</h3>
          <div className="space-y-6">
            {[
              { label: 'Placed', count: 12, icon: <Clock size={16}/>, color: 'text-amber-500', bg: 'bg-amber-50' },
              { label: 'Packed', count: 5, icon: <Package size={16}/>, color: 'text-blue-500', bg: 'bg-blue-50' },
              { label: 'Shipped', count: 8, icon: <Truck size={16}/>, color: 'text-purple-500', bg: 'bg-purple-50' },
              { label: 'Delivered', count: 142, icon: <CheckCircle size={16}/>, color: 'text-emerald-500', bg: 'bg-emerald-50' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`${item.bg} ${item.color} p-2 rounded-lg`}>{item.icon}</div>
                  <span className="text-sm font-bold text-slate-600">{item.label}</span>
                </div>
                <span className="text-sm font-black text-slate-800">{item.count}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-slate-800 transition-all">
            View All Orders
          </button>
        </div>

        {}
        <div className="lg:col-span-3 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <AlertCircle size={18} className="text-rose-500" /> Critical Stock Alerts
            </h3>
            <span className="text-[10px] font-bold text-rose-500 bg-rose-50 px-2 py-1 rounded italic uppercase">Action Required</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             {}
             {[
               { name: 'Paracetamol 500mg', stock: 4, category: 'Medicine' },
               { name: 'Cetirizine Syrup', stock: 2, category: 'Syrups' },
               { name: 'N95 Masks (Pack of 10)', stock: 0, category: 'Healthcare' }
             ].map((product, i) => (
               <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                 <div>
                   <p className="text-sm font-bold text-slate-800">{product.name}</p>
                   <p className="text-[10px] text-slate-400 uppercase font-bold">{product.category}</p>
                 </div>
                 <div className="text-right">
                   <p className={`text-sm font-black ${product.stock === 0 ? 'text-rose-600' : 'text-amber-600'}`}>
                     {product.stock === 0 ? 'OUT' : product.stock}
                   </p>
                   <p className="text-[9px] text-slate-400 uppercase">In Stock</p>
                 </div>
               </div>
             ))}
          </div>
        </div>

      </div>
    </div>
  );
};

const mockChartData = [
  { name: 'Mon', sales: 4000 }, { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 5000 }, { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 1890 }, { name: 'Sat', sales: 2390 },
  { name: 'Sun', sales: 3490 },
];

export default AdminDashboard;