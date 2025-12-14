import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const AdminLayout = () => {
    
    const adminNavLinks = [
        { name: 'Dashboard', path: '/seller/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
        { name: 'Products', path: "/seller/products", icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4' },
        { name: 'Orders', path: '/seller/orders', icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' },
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
                        <Link
                            key={link.name}
                            to={link.path}
                            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-teal-700 transition duration-150 group"
                        >
                            <svg className="w-5 h-5 text-teal-200 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={link.icon}></path>
                            </svg>
                            <span>{link.name}</span>
                        </Link>
                    ))}
                </nav>
            </aside>
            <div className="flex-1 flex flex-col ml-64">
                <header className="w-full bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-20">
                    <h1 className="text-xl font-semibold text-gray-800">
                        Welcome, Username
                    </h1>
                  
                    <div className="flex items-center space-x-4 text-gray-600">
                       
                        <Link 
                            to="/seller/login" 
                            className="bg-red-500 text-white px-4 py-1.5 rounded-md text-sm hover:bg-red-600 transition"
                        >
                            Login
                        </Link>
                    </div>
                </header>

                <main className="flex-1 p-6 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;