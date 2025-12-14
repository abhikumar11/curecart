import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {

    const [openDropdown, setOpenDropdown] = useState(null);
    const handleMouseEnter = (menuName) => setOpenDropdown(menuName);
    const handleMouseLeave = () => setOpenDropdown(null);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <header className="sticky top-0 z-50 bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
                    <div className="logo text-2xl font-bold text-teal-600">
                        <Link to="/">💊 CureCart</Link>
                    </div>
                    <div className="search flex-1 max-w-lg mx-8 hidden md:block">
                        <input 
                            type="text" 
                            placeholder="Search for products..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-150"
                        />
                    </div>
                    <div className="flex items-center space-x-6">
                        <Link to="/cart" className="flex items-center text-gray-700 hover:text-teal-600 transition">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                            <span className="ml-1 hidden sm:inline">Cart</span>
                        </Link>
                        <Link to="/login" className="login bg-teal-600 text-white px-4 py-1.5 rounded-full hover:bg-teal-700 transition duration-150 shadow">
                            Login
                        </Link>
                    </div>
                </div>
            </header>
            <nav className="bg-teal-500 shadow-lg hidden md:block">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center items-center"> 
                   
                        <div 
                            className="relative"
                            onMouseEnter={() => handleMouseEnter('Medicine')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Link 
                                to="/category/medicine"
                                className="text-white hover:text-teal-900 px-3 py-3 font-semibold transition"
                            >
                                Medicine
                            </Link>
                            {openDropdown === 'Medicine' && (
                                <div className="absolute left-0 mt-0 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200">
                                    <Link to="/category/bacterial-infections" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-teal-600 transition">Bacterial Infections</Link>
                                    <Link to="/category/cough-cold" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-teal-600 transition">Cough & Cold</Link>
                                    <Link to="/category/diabetes" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-teal-600 transition">Diabetes</Link>
                                    <Link to="/category/fever" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-teal-600 transition">Fever</Link>
                                </div>
                            )}
                        </div>
                        <div 
                            className="relative"
                            onMouseEnter={() => handleMouseEnter('Beauty')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Link 
                                to="/category/beauty"
                                className="text-white hover:text-teal-900 px-3 py-3 font-semibold transition"
                            >
                                Beauty
                            </Link>
                            {openDropdown === 'Beauty' && (
                                <div className="absolute left-0 mt-0 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200">
                                    <Link to="/category/fragrances" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-teal-600 transition">Fragrances</Link>
                                    <Link to="/category/hair" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-teal-600 transition">Hair</Link>
                                    <Link to="/category/make-up" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-teal-600 transition">Make-Up</Link>
                                    <Link to="/category/skin-care" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-teal-600 transition">Skin Care</Link>
                                </div>
                            )}
                        </div>

                        

                    </div>
                </div>
            </nav>
            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                <Outlet/>
            </main>
            <footer className="bg-gray-800 text-white p-6 text-center">
                <p>© 2025 CureCart. All rights reserved.</p>
            </footer>
        </div>
    )
}

export default Layout