import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/actions/UserAction';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';

const AdminLogin = () => {
    const [frmData, setFrmData] = useState({ email: "", password: "" });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, user } = useSelector((state) => state.userLogin);

    useEffect(() => {
        if (user) {
            navigate("/seller/dashboard");
        }
    }, [navigate, user]);

    useEffect(() => {
        if (error) {
            toast.error(error.message || "Login failed");
            // Clear error in state here if your reducer supports it to prevent re-toasts
        }
    }, [error]);

    useEffect(() => {
        if (user) {
            toast.success("Welcome to CureCart Seller Panel");
        }
    }, [user]);

    const handleInput = (e) => {
        setFrmData({ ...frmData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(loginUser(frmData));
    };

    return (
        <div className="min-h-screen flex bg-white">
            {/* Left Side: Branding & Info */}
            <div className="hidden lg:flex lg:w-1/2 bg-[#0d2e2e] relative overflow-hidden items-center justify-center p-12">
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <img 
                        src="https://plus.unsplash.com/premium_vector-1682269359035-d0de2962d5f9?q=80&w=1112&auto=format&fit=crop" 
                        alt="Background Pattern" 
                        className="w-full h-full object-cover"
                    />
                </div>
                
                <div className="relative z-10 max-w-lg text-center">
                    <div className="inline-flex p-4 bg-teal-500/20 rounded-3xl mb-6 backdrop-blur-xl">
                        <ShieldCheck className="text-teal-400" size={48} />
                    </div>
                    <h1 className="text-5xl font-black text-white mb-6 tracking-tighter">
                        CureCart <span className="text-teal-400">Seller Pro</span>
                    </h1>
                    <p className="text-teal-100/70 text-lg leading-relaxed">
                        The most trusted platform for pharmacies to reach millions of patients. Manage your inventory, track orders, and grow your medical business.
                    </p>
                </div>

                {/* Decorative circles */}
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-teal-600 rounded-full blur-[120px] opacity-20"></div>
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-teal-400 rounded-full blur-[120px] opacity-20"></div>
            </div>

            {/* Right Side: Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 bg-gray-50">
                <div className="w-full max-w-md">
                    <div className="mb-10 lg:hidden text-center">
                         <h2 className="text-3xl font-black text-teal-600">CureCart</h2>
                    </div>

                    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
                        <div className="mb-8">
                            <h2 className="text-2xl font-black text-gray-800 tracking-tight">Seller Login</h2>
                            <p className="text-gray-400 text-sm mt-1 font-medium">Please enter your credentials to continue</p>
                        </div>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2 ml-1">Email Address</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        required
                                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm"
                                        placeholder="name@pharmacy.com"
                                        name="email"
                                        value={frmData.email}
                                        onChange={handleInput}
                                    />
                                    <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2 ml-1">
                                    <label className="block text-xs font-black uppercase tracking-widest text-gray-500">Password</label>
                                    <Link to="/forgot-password" size={18} className="text-[10px] font-bold text-teal-600 hover:underline">Forgot?</Link>
                                </div>
                                <div className="relative">
                                    <input
                                        type="password"
                                        required
                                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm"
                                        placeholder="••••••••"
                                        value={frmData.password}
                                        name="password"
                                        onChange={handleInput}
                                    />
                                    <Lock className="absolute left-4 top-3.5 text-gray-400" size={18} />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className={`w-full group flex items-center justify-center gap-2 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-teal-900/20 transition-all duration-300 ${
                                    loading 
                                    ? 'bg-teal-400 cursor-not-allowed' 
                                    : 'bg-teal-600 hover:bg-teal-700 hover:-translate-y-0.5 active:translate-y-0 hover:shadow-xl'
                                }`}
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Authenticating...
                                    </span>
                                ) : (
                                    <>
                                        Sign In to Dashboard <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 pt-8 border-t border-gray-50 text-center">
                            <p className="text-gray-400 text-xs font-medium">
                                Don't have a seller account? <Link to="/seller/register" className="text-teal-600 font-bold hover:underline">Apply now</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;