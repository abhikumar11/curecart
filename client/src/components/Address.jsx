import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Edit2, Trash2, Plus, X, MapPin } from 'lucide-react';
import { updateAddress } from '../redux/actions/UserAction';

const Address = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.userLogin);

    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        address: user?.address || '',
        city: user?.city || '',
        state: user?.state || '',
        pin: user?.pin || ''
    });

    const handleSave = (e) => {
        e.preventDefault();
        dispatch(updateAddress(formData));
        setShowModal(false);
    };

    const handleDelete = () => {
        if (window.confirm("Clear your saved address?")) {
            dispatch(updateAddress({
                address: "",
                city: "",
                state: "",
                pin: null
            }));
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 min-h-screen bg-white text-gray-800">
            <div className="border-b border-gray-300 pb-4 mb-8">
                <h1 className="text-2xl font-normal text-gray-900">Your Address</h1>
            </div>

            <div className="max-w-sm">
                {user?.address ? (

                    <div className="border border-gray-300 rounded-md shadow-sm overflow-hidden">
                        <div className="bg-gray-100 px-4 py-2 border-b border-gray-300 text-[11px] font-bold uppercase text-gray-500">
                            Default Address
                        </div>
                        <div className="p-4 space-y-1 text-sm">
                            <p className="font-bold text-gray-900">{user.name}</p>
                            <p className="text-gray-700">{user.address}</p>
                            <p className="text-gray-700">{user.city}, {user.state} - {user.pin}</p>
                        </div>
                        <div className="p-3 bg-gray-50 border-t border-gray-200 flex gap-4 text-xs font-medium">
                            <button onClick={() => setShowModal(true)} className="text-blue-600 hover:underline flex items-center gap-1">
                                <Edit2 size={12} /> Edit
                            </button>
                            <span className="text-gray-300">|</span>
                            <button onClick={handleDelete} className="text-red-600 hover:underline flex items-center gap-1">
                                <Trash2 size={12} /> Delete
                            </button>
                        </div>
                    </div>
                ) : (

                    <button
                        onClick={() => setShowModal(true)}
                        className="w-full border-2 border-dashed border-gray-300 rounded-md p-10 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 group"
                    >
                        <Plus size={32} className="text-gray-300 group-hover:text-teal-600" />
                        <span className="text-sm font-bold text-gray-500 group-hover:text-teal-600">Add Delivery Address</span>
                    </button>
                )}
            </div>

            { }
            {showModal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
                    <div className="bg-white rounded shadow-xl w-full max-w-md">
                        <div className="bg-gray-100 p-4 border-b flex justify-between items-center font-bold text-sm">
                            <span>Manage Address</span>
                            <X className="cursor-pointer" size={18} onClick={() => setShowModal(false)} />
                        </div>
                        <form onSubmit={handleSave} className="p-6 space-y-4">
                            <div>
                                <label className="text-xs font-bold block mb-1">Street Address</label>
                                <input required className="w-full border border-gray-400 p-2 text-sm rounded focus:border-blue-500 outline-none" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold block mb-1">City</label>
                                    <input required className="w-full border border-gray-400 p-2 text-sm rounded outline-none" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
                                </div>
                                <div>
                                    <label className="text-xs font-bold block mb-1">Pincode</label>
                                    <input required type="number" className="w-full border border-gray-400 p-2 text-sm rounded outline-none" value={formData.pin} onChange={(e) => setFormData({ ...formData, pin: e.target.value })} />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold block mb-1">State</label>
                                <input required className="w-full border border-gray-400 p-2 text-sm rounded outline-none" value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} />
                            </div>
                            <button type="submit" className="w-full bg-[#24aeb1] hover:bg-[#24aeb1] border border-[#24aeb1] text-white py-2 rounded font-bold text-sm shadow-sm transition">
                                Save Address
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Address;