import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

const NotFound = ({ message }) => {
    const {navigate} = useContext(ShopContext)     
  return (
    <div className="flex flex-col items-center justify-center  bg-white text-gray-800 text-white">
      
      <h1 className="text-2xl font-bold mb-4">
        {message || "Page Not Found"}
      </h1>
      <p className="text-gray-600 text-center">
        Sorry, we couldn't find what you were looking for. <br />
        Please try again or return to the homepage.
      </p>

      <button onClick={()=>navigate('/')} className='border p-3 text-black' >Go back</button>
    </div>
  );
};

export default NotFound;
