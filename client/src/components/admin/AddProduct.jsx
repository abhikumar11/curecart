import React, { useState } from 'react';
import { FaCloudUploadAlt, FaTimes } from 'react-icons/fa';
import { addProduct } from '../../redux/actions/ProductAction';
import {useDispatch} from "react-redux";
const AddProduct = () => {
    const PRODUCT_CATEGORIES = {
    "Medicine": ["Bacterial Infections","Fever","Pain Relief","Antibiotics"],
    "Healthcare": ["Cough & Cold","Diabetes","Vitamins & Supplements","Baby Care"],
    "Beauty": ["Fragrances", "Hair", "Make-Up","Skin Care"]
};
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        disease: "",
        price: "",
        stock: "",
        description: "",
    });

    const dispatch = useDispatch();
  
    const [imagePreviews, setImagePreviews] = useState([null, null, null, null, null]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (index, e) => {
        const file = e.target.files[0];
        if (file) {
            const newPreviews = [...imagePreviews];
            newPreviews[index] = {
                file: file,
                url: URL.createObjectURL(file)
            };
            setImagePreviews(newPreviews);
        }
    };

    const removeImage = (index) => {
        const newPreviews = [...imagePreviews];
        newPreviews[index] = null;
        setImagePreviews(newPreviews);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const temp = new FormData();

        
        const sectionName = Object.keys(PRODUCT_CATEGORIES).find(section => 
            PRODUCT_CATEGORIES[section].includes(formData.category)
        );

        temp.append("productName", formData.name);
        temp.append("category", formData.category);
        temp.append("section", sectionName);
        temp.append("disease", formData.disease || "N/A");
        temp.append("price", formData.price);
        temp.append("inStock", formData.stock);
        temp.append("description", formData.description);

        imagePreviews.forEach((img) => {
            if (img && img.file) {
                temp.append("proimage", img.file); 
            }
        });

        dispatch(addProduct(temp));
    };

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-100">
            <div className="mb-8 border-b border-gray-100 pb-4">
                <h1 className="text-3xl font-bold text-gray-800">Add New Product</h1>
                <p className="text-gray-500 mt-1">Select a category to automatically assign the correct department</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        placeholder="e.g. Crocin 650mg Tablet"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                        onChange={handleChange}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Category Selection</label>
                        <select
                            name="category"
                            required
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                            onChange={handleChange}
                        >
                            <option value="">Select Category</option>
                            {Object.keys(PRODUCT_CATEGORIES).map(section => (
                                <optgroup key={section} label={section}>
                                    {PRODUCT_CATEGORIES[section].map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </optgroup>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Disease (Optional)</label>
                        <input
                            type="text"
                            name="disease"
                            placeholder="e.g. Fever, Infection"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Price (₹)</label>
                        <input
                            type="number"
                            name="price"
                            required
                            placeholder="0.00"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Stock Quantity</label>
                        <input
                            type="number"
                            name="stock"
                            required
                            placeholder="e.g. 100"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea
                        name="description"
                        rows="4"
                        placeholder="Provide details about dosage, usage, and warnings..."
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none transition"
                        onChange={handleChange}
                    ></textarea>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Product Images</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {imagePreviews.map((img, index) => (
                            <div key={index} className="relative group h-28">
                                <label 
                                    className={`flex flex-col items-center justify-center h-full w-full border-2 border-dashed rounded-lg cursor-pointer transition-all 
                                    ${img ? 'border-teal-500 bg-white' : 'border-gray-300 hover:border-teal-400 bg-gray-50'}`}
                                >
                                    {img ? (
                                        <img 
                                            src={img.url} 
                                            alt="preview" 
                                            className="h-full w-full object-cover rounded-lg" 
                                        />
                                    ) : (
                                        <div className="text-center">
                                            <FaCloudUploadAlt className="mx-auto text-xl text-gray-400" />
                                            <span className="text-[10px] font-bold text-gray-400 uppercase">
                                                {index === 0 ? "Main" : `View ${index + 1}`}
                                            </span>
                                        </div>
                                    )}
                                    <input 
                                        type="file" 
                                        className="hidden" 
                                        accept="image/*"
                                        onChange={(e) => handleImageChange(index, e)}
                                    />
                                </label>

                                {img && (
                                    <button 
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition"
                                    >
                                        <FaTimes size={10} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
             

                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-100">
                    <button
                        type="button"
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-10 py-2 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 shadow-md shadow-teal-100 transition duration-150"
                    >
                        Save Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;