import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/actions/UserAction';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { User, Mail, Lock, Heart, ShieldCheck, ArrowRight, Activity } from 'lucide-react';

const Registration = () => {
    const [frmData, setFrmData] = useState({ name: "", email: "", password: "" });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, user } = useSelector((state) => state.userRegister);

    useEffect(() => {
        if (user) {
            toast.success("Welcome to CureCart! Your account is ready.");
            navigate("/login");
        }
        if (error) {
            toast.error(error.message || "Registration failed. Please try again.");
        }
    }, [user, error, navigate]);

    const handleInput = (e) => {
        setFrmData({ ...frmData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser(frmData));
    };

    return (
        <div className="min-h-screen flex bg-[#f8fafc]">
            { }
            <div className="hidden lg:flex lg:w-[45%] bg-white relative items-center justify-center p-12 border-r border-gray-100">
                <div className="max-w-md text-center">
                    <div className="inline-flex p-3 bg-teal-50 rounded-2xl mb-6">
                        <Activity className="text-teal-600" size={40} />
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">
                        Your Health, <span className="text-teal-600">Simplified.</span>
                    </h1>
                    <p className="text-gray-500 leading-relaxed mb-8">
                        Join CureCart today to access genuine medicines, healthcare essentials, and expert wellness advice delivered to your doorstep.
                    </p>

                    <img
                        src="https://plus.unsplash.com/premium_vector-1682269359035-d0de2962d5f9?q=80&w=600&auto=format&fit=crop"
                        alt="Healthcare Illustration"
                        className="rounded-3xl mb-8 mix-blend-multiply"
                    />

                    <div className="grid grid-cols-2 gap-4 text-left">
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
                            <ShieldCheck size={16} className="text-teal-500" /> 100% Genuine
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
                            <Heart size={16} className="text-teal-500" /> Privacy Focused
                        </div>
                    </div>
                </div>
            </div>

            { }
            <div className="w-full lg:w-[55%] flex items-center justify-center p-6 md:p-12">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-black text-gray-900">Create Account</h2>
                        <p className="text-gray-500 mt-2 font-medium">Step into a healthier lifestyle with CureCart</p>
                    </div>

                    <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-2xl shadow-teal-900/5 border border-gray-50">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            { }
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Full Name</label>
                                <div className="relative group">
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={frmData.name}
                                        onChange={handleInput}
                                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all text-sm outline-none"
                                        placeholder="e.g. John Doe"
                                    />
                                    <User className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-teal-500 transition-colors" size={20} />
                                </div>
                            </div>

                            { }
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Email Address</label>
                                <div className="relative group">
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={frmData.email}
                                        onChange={handleInput}
                                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all text-sm outline-none"
                                        placeholder="yourname@example.com"
                                    />
                                    <Mail className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-teal-500 transition-colors" size={20} />
                                </div>
                            </div>

                            { }
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Password</label>
                                <div className="relative group">
                                    <input
                                        type="password"
                                        name="password"
                                        required
                                        value={frmData.password}
                                        onChange={handleInput}
                                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all text-sm outline-none"
                                        placeholder="Min. 8 characters"
                                    />
                                    <Lock className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-teal-500 transition-colors" size={20} />
                                </div>
                            </div>

                            { }
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full group flex items-center justify-center gap-2 text-white py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg shadow-teal-600/20 ${loading
                                    ? 'bg-teal-300 cursor-not-allowed'
                                    : 'bg-teal-600 hover:bg-teal-700 hover:shadow-xl active:scale-95'
                                    }`}
                            >
                                {loading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Processing...
                                    </div>
                                ) : (
                                    <>
                                        Get Started <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                            <p className="text-gray-500 text-sm">
                                Already a member?{" "}
                                <Link to="/login" className="text-teal-600 font-bold hover:underline underline-offset-4">
                                    Log in here
                                </Link>
                            </p>
                        </div>
                    </div>

                    <p className="mt-8 text-center text-[11px] text-gray-400 px-4">
                        By signing up, you agree to CureCart’s <b>Health Safety Guidelines</b>, <b>Terms of Service</b>, and <b>Privacy Policy</b>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Registration;