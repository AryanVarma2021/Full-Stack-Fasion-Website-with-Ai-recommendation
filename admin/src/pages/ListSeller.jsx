import React, { useEffect, useState } from 'react'
import axios from 'axios'

import {backendUrl} from '../App'
import { toast } from 'react-toastify';

const ListSeller = ({token}) => {

  const [list, setList] = useState([]);

  const fetchList =async()=>{

    try {
      const response = await axios.post(backendUrl + "/api/seller/getsellers");
      console.log(response.data);
      
      
      if(response.data.success){
        setList(response.data.sellers)
      }
      else {
        toast.error(response.data.message)
      }

    
    
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      
      
    }


  }

  const removeProduct = async(id) => {

    try {
      const response = await axios.post(backendUrl + "/api/seller/removeseller", {id}, {headers:{token}});

      if(response.data.success){
        toast.success(response.data.message);
        await fetchList();
      }
      else {
        toast.error(response.data.message);

      }

      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
      
    }

  }

  useEffect(()=>{
    fetchList();
  }, [])

  return (
    <>

    <p className='mb-2'>All Products</p>
    <div className="flex flex-col gap-2">

      {/* List table title */}
      <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1px2
       bg-gray-100 text-sm ">
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b className='text-center'>Action</b>
      </div>



      {/* Product List */}
      {
        list.map((item, index)=>(
          <div className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 border text-sm px-2" key={index}>
            {/* <img className='w-12' src={item.image[0]} alt="" /> */}
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.price}</p>
            <p onClick={()=>removeProduct(item._id)} className='text-right md:text-center text-lg cursor-pointer'>X</p>
          </div>

        ))
      }
    </div>
    
    
    </>
  )
}

export default ListSeller