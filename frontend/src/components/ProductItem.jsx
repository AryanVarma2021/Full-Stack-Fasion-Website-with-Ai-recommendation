import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';
import {assets} from "../assets/frontend_assets/assets.js"

const ProductItem = ({id,  image, name, price}) => {

  useEffect(()=>{
    
    
  }, [])
    
    

  return (
    <Link className='text-gray-700 cursor-pointer ' to={`/product/${id}`}>
        <div className="overflow-hidden ">
            <img src={image ? image : image[0]} className='hover:scale-110 transition ease-in-out' alt="" />

        </div>
        <p className='text-sm pt-3 pb-1'>{name}</p>
        <p className='text-sm font-medium'>Rs{price}</p>
        


    </Link>
  )
}

export default ProductItem