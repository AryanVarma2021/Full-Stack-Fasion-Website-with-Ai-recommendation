import React, { useState } from 'react'
import upload_area from "../assets/upload_area.png"
import axios from 'axios';
import {backendUrl} from '../App'
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const Add = ({token}) => {

useEffect(()=>{
  console.log("Token : ", token);
  
}, [])

  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState('');
  const[description, setDescription] = useState('');
  const [price, setPrice]= useState('');
  const [category, setCategory] = useState('Men');
  const [subCategory, setSubCategory] = useState('Topwear');
  const [bestseller, setBestseller] = useState(false);
  const [quantity, setQuantity] = useState();
  const [sizes, setSizes] = useState([]);


  const onSubmit = async(e) =>{
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("quantity", quantity);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      
      

      const response = await axios.post(backendUrl + "/api/product/add", formData, {
        headers : {token}
      });

      console.log(response.data.success);
      
      

      if(response.data.success){
        toast.success("Product Added Successfully");
        setName('');
        setDescription('');
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice('');
      }
      else {
        toast.error(response.data.message)

      }
      




      
    } catch (error) {
      console.log();
      toast.error(error.message)
      
      
    }

  }






  return (
    <form onSubmit={onSubmit} className='flex flex-col w-full items-start gap-3 ' >

      <div className="">
        <p className='mb-2'>Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img className='w-20' src={!image1 ? upload_area : URL.createObjectURL(image1)} alt="" />
            <input onChange={(e)=>setImage1(e.target.files[0])} type="file"  id="image1" hidden />
          </label>
          <label htmlFor="image2">
            <img className='w-20' src={!image2 ? upload_area : URL.createObjectURL(image2)} alt="" />
            <input onChange={(e)=>setImage2(e.target.files[0])}  type="file"  id="image2" hidden />
          </label>
          <label htmlFor="image3">
            <img className='w-20' src={!image3 ? upload_area : URL.createObjectURL(image3)} alt="" />
            <input onChange={(e)=>setImage3(e.target.files[0])}  type="file"  id="image3" hidden />
          </label>
          <label htmlFor="image4">
            <img className='w-20' src={!image4 ? upload_area : URL.createObjectURL(image4)} alt="" />
            <input onChange={(e)=>setImage4(e.target.files[0])}  type="file"  id="image4" hidden />
          </label>
        </div>
      </div>
      <div className="w-full">
        <p className='mb-2'>Product Name</p>
        <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
      </div>
      <div className="w-full">
        <p className='mb-2'>Rite Content here</p>
        <textarea onChange={(e)=>setDescription(e.target.value)} value={description}className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div className="">
          <p className='mb-2'>Product Category</p>
          <select onChange={(e)=>setCategory(e.target.value)} className='w-full px-3 py-2'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div className="">
          <p className='mb-2'>Product Sub Category</p>
          <select onChange={(e)=>setSubCategory(e.target.value)}  className='w-full px-3 py-2'>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div className="">
          <p className='mb-2'>Product Price</p>
          <input onChange={(e)=>setPrice(e.target.value)} value={price}  className='w-full px-3 py-2 sm:w-[120px]' type='number' placeholder='25' />
        </div>
      </div>

      <div className="mb-2">
        <p>Product Sizes</p>
        <div className="flex gap-2">
          <div onClick={(e)=>setSizes(prev=> prev.includes("S") ? prev.filter((item)=>item !== "S") : [...prev, "S"])} className="">
            <p className={` px-3 py-1 cursor-pointer ${sizes.includes("S") ? 'bg-pink-100' : 'bg-slate-200'}`}>S</p>
          </div>
          <div onClick={(e)=>setSizes(prev=> prev.includes("M") ? prev.filter((item)=>item !== "M") : [...prev, "M"])} className="">
            <p className={` px-3 py-1 cursor-pointer ${sizes.includes("M") ? 'bg-pink-100' : 'bg-slate-200'}`}>M</p>
          </div>
          <div onClick={(e)=>setSizes(prev=> prev.includes("L") ? prev.filter((item)=>item !== "L") : [...prev, "L"])} className="">
            <p className={` px-3 py-1 cursor-pointer ${sizes.includes("L") ? 'bg-pink-100' : 'bg-slate-200'}`}>L</p>
          </div>
          <div onClick={(e)=>setSizes(prev=> prev.includes("XL") ? prev.filter((item)=>item !== "XL") : [...prev, "XL"])} className="">
            <p className={` px-3 py-1 cursor-pointer ${sizes.includes("XL") ? 'bg-pink-100' : 'bg-slate-200'}`}>XL</p>
          </div>

          <input min={1} max={100} value={quantity} onChange={(e)=>setQuantity(e.target.value)} type="number"   />

        </div>
      </div>




      <div className="flex gap-2 mt-2">
        <input onChange={(e)=>setBestseller(prev=>!prev)} checked={bestseller} type="checkbox"  id="bestseller" />
        <label className='cursor-pointer ' htmlFor="bestseller">Add to best seller</label>
      </div>


      <button type='submit' className='w-28 bg-black text-white  py-3 mt-4'>Add</button>
    </form>
  )
}

export default Add