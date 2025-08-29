import { useEffect, useState } from "react";
import { ImagePlus } from "lucide-react";
import { useForm } from "react-hook-form";
import axios from "axios";

const ProductForm = () => {
  const [preview, setPreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null);


  const {register, handleSubmit, formState:{errors, isSubmitting}, reset} = useForm()

useEffect(() => {
    const fetchCategories = async () => {
      const catRes = await axios.get("http://127.0.0.1:8000/api/v1/categories/");
      setCategories(catRes.data.results);
    };
    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
    setFile(file)
  };

  const user = JSON.parse(localStorage.getItem('user'))

  const onSubmitForm = async data =>{
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('category', data.category)
    formData.append('price', data.price)
    formData.append('quantity', data.quantity)
    formData.append('description', data.description)
    formData.append('image', file)

    try{
        const response = axios.post('http://127.0.0.1:8000/api/v1/products/', formData,{
            headers:{
                Authorization: `Bearer ${user?.tokens.access}`
            }
        } )
        console.log(response.data)
    }
    catch(err){
        console.log(err)
    }
  }

  return (
   <>
   <div className="px-8 sm:px-10 lg:px-12">
     <div className="bg-white shadow rounded-lg border border-slate-200 p-6 w-full max-w-2xl mx-auto my-20">
      <h2 className="text-2xl font-semibold text-slate-800 mb-6">Add Product</h2>

      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
        {/* Product Name */}
        <div>
          <label className="block text-slate-700 mb-2 font-semibold">Product Name</label>
          <input
            {...register('name')}
            type="text"
            placeholder="Enter product name"
            className="w-full border border-slate-300 rounded px-3 py-2 text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-700"
          />
        </div>

        {/* Category + Price */}
        <div className="flex items-center gap-6">
          <div className="flex-1">
            <label className="block text-slate-700 mb-2 font-semibold">Category</label>
            <select {...register('category')} className="w-full border border-slate-300 rounded px-3 py-2 text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-700">
              <option value="">Select Category</option>
                    {
                        categories?.map(cat=>(
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))
                    }
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-slate-700 mb-2 font-semibold">Price ($)</label>
            <input
            {...register('price')}
              type="number"
              placeholder="Enter product price"
              className="w-full border border-slate-300 rounded px-3 py-2 text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-700"
            />
          </div>
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-slate-700 mb-2 font-semibold">Quantity</label>
          <input
          {...register('quantity')}
            type="number"
            placeholder="Enter quantity"
            className="w-full border border-slate-300 rounded px-3 py-2 text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-700"
          />
        </div>

        {/* Image Upload */}
        <div className="relative border border-dashed border-slate-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-slate-500 transition">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-md mb-2"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-slate-500">
              <ImagePlus className="w-8 h-8" />
              <span>Click to upload or drag and drop</span>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-slate-700 mb-2 font-semibold">Description</label>
          <textarea
            {...register('description')}
            rows={4}
            placeholder="Enter product description"
            className="w-full border border-slate-300 rounded px-3 py-2 text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-700"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-slate-800 text-white rounded-md w-full py-3 hover:bg-slate-700 transition"
        >
          Add Product
        </button>
      </form>
    </div>
   </div>
   </>
  );
};

export default ProductForm;