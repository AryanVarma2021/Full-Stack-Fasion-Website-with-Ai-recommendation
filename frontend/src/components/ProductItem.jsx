import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from "../assets/frontend_assets/assets.js";

const ProductItem = ({ id, image, name, price }) => {
  
  const getImageSrc = () => {
    if (Array.isArray(image)) {
      return image.length > 0 ? image[0] : assets.default_image; // Fallback if array is empty
    }
    return image ? image : assets.default_image; // Fallback if no image
  };

  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
      <div className="overflow-hidden">
        <img 
          src={image} 
          className='hover:scale-110 transition ease-in-out' 
          alt={name} 
        />
      </div>
      <p className='text-sm pt-3 pb-1'>{name}</p>
      <p className='text-sm font-medium'>Rs {price}</p>
    </Link>
  );
};

export default ProductItem;
