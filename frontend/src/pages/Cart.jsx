import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/frontend_assets/assets';
import CartTotal from '../components/CartTotal';
import axios from 'axios';
import { toast } from 'react-toastify';

const Cart = () => {

  const {products, currency, cartItems,navigate, maxQuantity,  updateQuantity, setCartItems, backendUrl} = useContext(ShopContext)
  const [cartData, setCartData] = useState([]);
  


  const getUserCart =async(token)=>{
    try {


        console.log("Function call ", token);
        

        const response = await axios.post(backendUrl+"/api/cart/get", {}, {headers:{token}});
        console.log("user cart" , response.data);
        
        if(response.data.success){
            console.log("cartitems set ");
            
            setCartItems(response.data.cartData)
        }

        
    } catch (error) {
        console.log(error);
        toast.error(error.message)
        
    }
}

  useEffect(()=>{

    getUserCart(localStorage.getItem("token"))
    
    
    
<<<<<<< HEAD
=======
    
>>>>>>> origin/recommendation-update
  },[])




  useEffect(()=>{
    
    
    if(products.length > 0){
      
      
      const tempData = [];

      for (const productId in cartItems) {
        console.log("Product ID:", productId);
        
        const sizesObj = cartItems[productId]; // Object with sizes as keys and quantities as values
        
        for (const size in sizesObj) {
            const quantity = sizesObj[size]; // Quantity for that size
            
            if (quantity > 0) {
                tempData.push({
                    _id: productId,
                    size: size,
                    quantity: quantity
                });
            }
        }
    
    
    console.log("Formatted Cart Data:", tempData);
    
    }
    setCartData(tempData);
    console.log("cart items : ",cartData);
    console.log("Products : ", products);
    
    
  }
  

  }, [cartItems, products])




  return (
    <div className='border-t pt-14'>
      <div className="text-2xl mb-3">
        <Title text1={'YOUR'} text2={'CART'}/>
      </div>

      <div className="">
        {
          cartData.map((item, index)=>{
            const productData1 = products.find((product)=>product._id === item._id)

            return (
              <div key={index} className="py-4 border-t border-b grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] text-gray-700  items-center gap-4">
                <div className="flex items-start gap-6">
                  <img src={productData1.image} className='w-16 sm:w-20' alt="" />
                  <div className="">
                    <p className='text-sm font-medium sm:text-lg'>{productData1.name}</p>
                    <div className="flex items-center gap-5 mt-2">
                      <p>{currency}{productData1.price}</p>
<<<<<<< HEAD
                      <p className='px-2 sm:px-3 sm:py-1 bg-slate-50'>{item.sizes}</p>
=======
                      <p className='px-2 sm:px-3 sm:py-1 bg-slate-50'>{item.size}</p>
                      <p>Total : {productData1.price * item.quantity }</p>
>>>>>>> origin/recommendation-update

                    </div>
                  </div>
                </div>
<<<<<<< HEAD
                <input onChange={(e)=> e.target.value === '' || e.target.value === '0'  ? null : updateQuantity(item._id, item.size, Number(e.target.value))} min={1}  max={maxQuantity ? item.quantity - 2 : 10} defaultValue={maxQuantity ? item.quantity-1 : item.quantity} className='border px-1 py-1 max-w-10 sm:max-w-20 ' type="number" />
=======
                <input onChange={(e)=> e.target.value === '' || e.target.value === '0'  ? null : updateQuantity(item._id, item.size, Number(e.target.value))} min={1} defaultValue={item.quantity} className='border px-1 py-1 max-w-10 sm:max-w-20 ' type="number" />
                
                
>>>>>>> origin/recommendation-update
                <img onClick={()=>updateQuantity(item._id, item.size, 0)} src={assets.bin_icon} className='w-4 sm:w-5 cursor-pointer mr-5 sm:' alt="" />
              </div>
            )
})
        }
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal/>
          <div className="w-full text-end">
            <button onClick={()=>(
              navigate('/place-order'),
              console.log(maxQuantity)
              
              
              )} className='bg-black text-sm my-8 p-3 text-white '>PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>



    </div>
  )
}

export default Cart