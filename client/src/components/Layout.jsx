import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingCart, Search, User, ChevronDown, Pill, Sparkles, LogOut, Package, MapPin, Settings } from 'lucide-react';
import { logoutUser } from '../redux/actions/UserAction';

const Layout = () => {
    const [openDropdown, setOpenDropdown] = useState(null);
    const dispatch = useDispatch();
    
    const { user } = useSelector((state) => state.userLogin);
    const { cart } = useSelector((state) => state.userCart);
    const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

    const handleMouseEnter = (menuName) => setOpenDropdown(menuName);
    const handleMouseLeave = () => setOpenDropdown(null);

    const handleLogout = () => {
        dispatch(logoutUser());
        window.location.href = '/'; 
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#f8fafc]">
            <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="logo text-2xl font-black text-teal-600 tracking-tight">
                        <Link to="/" className="flex items-center gap-1">
                           <span className="bg-teal-600 text-white p-1 rounded-lg">💊</span>
                           <span>Cure<span className="text-gray-900">Cart</span></span>
                        </Link>
                    </div>
                    <div className="search flex-1 max-w-xl mx-12 hidden md:block">
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="Search medicines, health products..."
                                className="w-full px-5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                            />
                            <Search className="absolute right-4 top-3 text-gray-400" size={18} />
                        </div>
                    </div>

                    <div className="flex items-center space-x-6">
                        <Link to="/cart" className="relative group flex items-center gap-2 text-gray-700 hover:text-teal-600 transition">
                            <div className="relative">
                                <ShoppingCart size={22} />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-teal-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white shadow-sm">
                                        {cartCount}
                                    </span>
                                )}
                            </div>
                            <span className="text-sm font-bold hidden lg:inline">Cart</span>
                        </Link>

                        {user ? (
                            <div 
                                className="relative border-l pl-6 border-gray-100 cursor-pointer"
                                onMouseEnter={() => handleMouseEnter('User')}
                                onMouseLeave={handleMouseLeave}
                            >
                                <div className="flex items-center gap-2">
                                    <div className="flex flex-col items-end">
                                        <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Account</span>
                                        <span className="text-sm font-black text-gray-800 flex items-center gap-1">
                                            {user.name?.split(' ')[0]} <ChevronDown size={14} className={`transition-transform ${openDropdown === 'User' ? 'rotate-180' : ''}`} />
                                        </span>
                                    </div>
                                </div>

                                {openDropdown === 'User' && (
                                    <div className="absolute right-0 mt-0 w-52 bg-white rounded-2xl shadow-xl py-2 z-50 border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                        <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Signed in as</p>
                                            <p className="text-xs font-bold text-gray-700 truncate">{user.email}</p>
                                        </div>
                                        
                                        <Link to="/orders" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:bg-teal-50 hover:text-teal-700 transition">
                                            <Package size={16} /> My Orders
                                        </Link>
                                        
                                        <Link to="/myaddress" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:bg-teal-50 hover:text-teal-700 transition">
                                            <MapPin size={16} /> Saved Addresses
                                        </Link>

                                        <div className="border-t border-gray-50 mt-1">
                                            <button 
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 font-bold transition hover:cursor-pointer"
                                            >
                                                <LogOut size={16} /> Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/login" className="flex items-center gap-2 text-gray-700 hover:text-teal-600 font-bold text-sm">
                                <User size={20} />
                                <span className="hidden sm:inline">Sign In</span>
                            </Link>
                        )}
                    </div>
                </div>
            </header>

            <nav className="bg-white border-b border-gray-100 hidden md:block">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-start space-x-10 py-3"> 
                        <div 
                            className="relative group"
                            onMouseEnter={() => handleMouseEnter('Medicine')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Link to="/category/medicine" className="flex items-center gap-1.5 text-gray-600 group-hover:text-teal-600 text-sm font-bold transition">
                                <Pill size={16} /> Medicine <ChevronDown size={14} />
                            </Link>
                            {openDropdown === 'Medicine' && (
                                <div className="absolute left-0 mt-0 w-56 bg-white rounded-xl shadow-xl py-3 z-50 border border-gray-100">
                                    <Link to="/category/diabetes" className="block px-4 py-2 text-sm text-gray-600 hover:bg-teal-50 hover:text-teal-700">Diabetes Care</Link>
                                    <Link to="/category/cough-cold" className="block px-4 py-2 text-sm text-gray-600 hover:bg-teal-50 hover:text-teal-700">Cough & Cold</Link>
                                    <Link to="/category/fever" className="block px-4 py-2 text-sm text-gray-600 hover:bg-teal-50 hover:text-teal-700">Pain & Fever</Link>
                                </div>
                            )}
                        </div>

                        <div 
                            className="relative group"
                            onMouseEnter={() => handleMouseEnter('Beauty')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Link to="/category/beauty" className="flex items-center gap-1.5 text-gray-600 group-hover:text-teal-600 text-sm font-bold transition">
                                <Sparkles size={16} /> Beauty <ChevronDown size={14} />
                            </Link>
                            {openDropdown === 'Beauty' && (
                                <div className="absolute left-0 mt-0 w-56 bg-white rounded-xl shadow-xl py-3 z-50 border border-gray-100">
                                    <Link to="/category/skin-care" className="block px-4 py-2 text-sm text-gray-600 hover:bg-teal-50 hover:text-teal-700">Skin Care</Link>
                                    <Link to="/category/hair" className="block px-4 py-2 text-sm text-gray-600 hover:bg-teal-50 hover:text-teal-700">Hair Care</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <main className="flex-grow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Outlet/>
                </div>
            </main>

            <footer className="bg-white border-t border-gray-100 py-10 text-center">
                <p className="text-gray-400 text-sm font-medium">© 2025 CureCart • Your Health, Our Priority</p>
            </footer>
        </div>
    );
}

export default Layout;