import React, { useState } from 'react';
import { Outlet, Link, useNavigate, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from '../../redux/actions/UserAction';
import { toast } from "react-toastify";

const AdminLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user,token } = useSelector((state) => state.userLogin);

    const [isProductOpen, setIsProductOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logoutUser());
        toast.success("You have been logged out");
        navigate("/seller/login");
    };

    const adminNavLinks = [
        { 
            name: 'Dashboard', 
            path: '/seller/dashboard', 
            icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' 
        },
        { 
            name: 'Products', 
            icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4',
            isDropdown: true,
            subLinks: [
                { name: 'Product List', path: '/seller/products' },
                { name: 'Add New Product', path: '/seller/newproduct' }
            ]
        },
        { 
            name: 'Orders', 
            path: '/seller/orders', 
            icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' 
        },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="w-64 bg-teal-800 text-white flex flex-col fixed h-full shadow-xl z-30">
                <div className="p-4 text-2xl font-bold border-b border-teal-700 bg-teal-900">
                    <Link to="/seller/dashboard">CureCart Seller</Link>
                </div>
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <p className="text-xs uppercase text-teal-300 mb-4 tracking-wider font-semibold">
                        Seller Dashboard
                    </p>

                    {adminNavLinks.map((link) => (
                        <div key={link.name}>
                            {link.isDropdown ? (
                              
                                <>
                                    <button
                                        onClick={() => setIsProductOpen(!isProductOpen)}
                                        className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-teal-700 transition duration-150 group cursor-pointer outline-none"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <svg className="w-5 h-5 text-teal-200 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={link.icon}></path>
                                            </svg>
                                            <span>{link.name}</span>
                                        </div>
                                        <svg className={`w-4 h-4 transition-transform ${isProductOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </button>
                                    
                                    {isProductOpen && (
                                        <div className="ml-9 mt-1 flex flex-col space-y-1 border-l border-teal-600">
                                            {link.subLinks.map((sub) => (
                                                <NavLink
                                                    key={sub.name}
                                                    to={sub.path}
                                                    className={({ isActive }) => 
                                                        `p-2 pl-4 text-sm rounded-r-lg transition ${isActive ? 'bg-teal-700 text-white font-medium' : 'text-teal-100 hover:text-white'}`
                                                    }
                                                >
                                                    {sub.name}
                                                </NavLink>
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                               
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) => 
                                        `flex items-center space-x-3 p-3 rounded-lg transition duration-150 ${isActive ? 'bg-teal-900 border-l-4 border-teal-400' : 'hover:bg-teal-700'}`
                                    }
                                >
                                    <svg className="w-5 h-5 text-teal-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={link.icon}></path>
                                    </svg>
                                    <span>{link.name}</span>
                                </NavLink>
                            )}
                        </div>
                    ))}
                </nav>
            </aside>

            <div className="flex-1 flex flex-col ml-64">
                <header className="w-full bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-20">
                    <h1 className="text-xl font-semibold text-gray-800">
                        {user ? `Welcome, ${user.name || 'Seller'}` : ""} 
                    </h1>
                    {token && (
                        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-1.5 rounded-md text-sm hover:bg-red-600 transition">
                            Logout
                        </button>
                    )}
                </header>

                <main className="flex-1 p-6 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;