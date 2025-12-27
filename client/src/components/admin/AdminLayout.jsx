import React, { useState } from 'react';
import { Outlet, Link, useNavigate, NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from '../../redux/actions/UserAction';
import { toast } from "react-toastify";
import { ChevronDown, LogOut, LayoutDashboard, Box, ShoppingBag, PlusCircle, List } from 'lucide-react';

const AdminLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { user, token } = useSelector((state) => state.userLogin);

    const [isProductOpen, setIsProductOpen] = useState(location.pathname.includes('product'));

    const handleLogout = () => {
        dispatch(logoutUser());
        toast.success("Logged out from Seller Panel");
        navigate("/seller/login");
    };

    const getPageTitle = () => {
        const path = location.pathname;
        if (path.includes('dashboard')) return 'Dashboard Overview';
        if (path.includes('products')) return 'Inventory Management';
        if (path.includes('newproduct')) return 'Add New Inventory';
        if (path.includes('orders')) return 'Order Fulfillment';
        return 'Seller Panel';
    };

    return (
        <div className="flex h-screen bg-[#f3f7fb]">
            <aside className="w-64 bg-teal-800 text-white flex flex-col fixed h-full shadow-2xl z-30 transition-all duration-300">
                <div className="p-6 text-2xl font-black border-b border-teal-00 flex items-center gap-2">
                    <span className="bg-teal-500 text-white p-1 rounded-md text-sm">💊</span>
                    <Link to="/seller/dashboard" className="tracking-tighter">Cure<span className="text-teal-400">Cart</span></Link>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
                    <p className="text-[10px] uppercase text-teal-500 mb-4 tracking-[0.2em] font-black px-3">
                        Main Menu
                    </p>

                    <NavLink
                        to="/seller/dashboard"
                        className={({ isActive }) => 
                            `flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${isActive ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/50' : 'text-teal-100/70 hover:bg-white/5 hover:text-white'}`
                        }
                    >
                        <LayoutDashboard size={18} />
                        <span className="font-semibold text-sm">Dashboard</span>
                    </NavLink>

                    <div className="space-y-1">
                        <button
                            onClick={() => setIsProductOpen(!isProductOpen)}
                            className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 outline-none cursor-pointer ${location.pathname.includes('product') ? 'text-teal-400 font-bold' : 'text-teal-100/70 hover:bg-white/5 hover:text-white'}`}
                        >
                            <div className="flex items-center space-x-3">
                                <Box size={18} />
                                <span className="text-sm">Products</span>
                            </div>
                            <ChevronDown size={14} className={`transition-transform duration-300 ${isProductOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isProductOpen && (
                            <div className="ml-4 pl-4 border-l border-teal-800 space-y-1 py-1">
                                <NavLink
                                    to="/seller/products"
                                    className={({ isActive }) => 
                                        `flex items-center gap-2 p-2.5 text-xs rounded-lg transition ${isActive ? 'bg-teal-500/10 text-teal-400 font-bold' : 'text-teal-100/50 hover:text-white'}`
                                    }
                                >
                                    <List size={14} /> Product List
                                </NavLink>
                                <NavLink
                                    to="/seller/newproduct"
                                    className={({ isActive }) => 
                                        `flex items-center gap-2 p-2.5 text-xs rounded-lg transition ${isActive ? 'bg-teal-500/10 text-teal-400 font-bold' : 'text-teal-100/50 hover:text-white'}`
                                    }
                                >
                                    <PlusCircle size={14} /> Add New
                                </NavLink>
                            </div>
                        )}
                    </div>

                    <NavLink
                        to="/seller/orders"
                        className={({ isActive }) => 
                            `flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${isActive ? 'bg-teal-600 text-white shadow-lg' : 'text-teal-100/70 hover:bg-white/5 hover:text-white'}`
                        }
                    >
                        <ShoppingBag size={18} />
                        <span className="font-semibold text-sm">Orders</span>
                    </NavLink>
                </nav>

                <div className="p-4 bg-black/20 border-t border-teal-900">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center font-bold text-xs">
                            {user?.name?.charAt(0) || 'S'}
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-xs font-bold truncate">{user?.name || 'Seller'}</p>
                            <p className="text-[10px] text-teal-500 uppercase tracking-tighter">Verified Seller</p>
                        </div>
                    </div>
                </div>
            </aside>

            <div className="flex-1 flex flex-col ml-64">
                <header className="w-full bg-white border-b border-gray-100 p-4 px-8 flex justify-between items-center sticky top-0 z-20 backdrop-blur-md bg-white/80">
                    <div>
                        <h1 className="text-lg font-black text-gray-800 tracking-tight uppercase">
                            {getPageTitle()}
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="h-8 w-[1px] bg-gray-100 mx-2"></div>
                        {token && (
                            <button 
                                onClick={handleLogout} 
                                className="flex items-center gap-2 text-gray-400 hover:text-red-500 font-bold text-xs transition-all uppercase tracking-widest px-3 py-2 rounded-lg hover:bg-red-50"
                            >
                                <LogOut size={16} /> Logout
                            </button>
                        )}
                    </div>
                </header>

                <main className="flex-1 p-8">
                    <div className="max-w-6xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;