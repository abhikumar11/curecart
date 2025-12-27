import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/actions/UserAction';
import { toast } from 'react-toastify';

const Login = () => {
    const [frmData, setFrmData] = useState({ email: "", password: "" });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { loading, error, user } = useSelector((state) => state.userLogin);
    const redirectPath = location.state?.from?.pathname || "/";

    useEffect(() => {
      
        if (user) {
            navigate(redirectPath, { replace: true });
        }
    }, [navigate, user, redirectPath]);

    useEffect(() => {
        if (error) {
            toast.error(error.message || "Invalid Credentials");
        } else if (user) {
            toast.success(`Welcome back, ${user.name || 'User'}!`);
        }
    }, [error, user]);

    const handleInput = (e) => {
        setFrmData({ ...frmData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(frmData));
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
       
            <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                <img
                    src="https://plus.unsplash.com/premium_vector-1682269359035-d0de2962d5f9?q=80&w=1112&auto=format&fit=crop"
                    alt="Healthcare Illustration"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-teal-900/20 flex items-center justify-center">
                    <h1 className="text-white text-4xl font-black drop-shadow-lg">CureCart</h1>
                </div>
            </div>

         
            <div className="md:w-1/2 flex items-center justify-center p-6 md:p-12">
                <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-xl border border-gray-100">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-black text-gray-800">Welcome Back</h2>
                        <p className="text-gray-500 mt-2">Please enter your details to continue</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2 text-sm uppercase tracking-wide">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={frmData.email}
                                onChange={handleInput}
                                className="w-full px-5 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all bg-gray-50"
                                placeholder="name@example.com"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-gray-700 font-bold text-sm uppercase tracking-wide">
                                    Password
                                </label>
                                <Link to="#" className="text-xs font-bold text-teal-600 hover:text-teal-700">
                                    Forgot?
                                </Link>
                            </div>
                            <input
                                type="password"
                                name="password"
                                required
                                value={frmData.password}
                                onChange={handleInput}
                                className="w-full px-5 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all bg-gray-50"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-lg 
                                ${loading 
                                    ? 'bg-gray-300 cursor-not-allowed' 
                                    : 'bg-teal-600 text-white hover:bg-teal-700 active:scale-[0.98]'}`}
                        >
                            {loading ? 'Authenticating...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                        <p className="text-gray-600 text-sm">
                            New to CureCart?{" "}
                            <Link to="/register" className="text-teal-600 font-black hover:underline">
                                Create Account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;