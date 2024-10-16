import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import { toast } from 'react-toastify';

const Product = () => {

  const {productId} = useParams();
  const {products, currency, addToCart} = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('')

  const fetchProductData = async () => {

    products.map((item)=>{
      if(item._id == productId){
        setProductData(item);
        setImage(item.image[0]);
        
        return null;
      }
    })

  }

  useEffect(()=>{
    fetchProductData();
  }, [productId, products])
  return productData ?  (
    <div className='border-t pt-10 transition-opacity ease-in-out duration-500 opacity-100 '>
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">

        {/*------------- product images */}
        <div className="flex-1 flex flex-col-reverse sm:flex-row gap-3">
          <div className="flex flex-col overflow-x-auto justify-between sm:justify-normal sm:overflow-y-scroll sm:w-[18.7%] w-full ">
            {
              productData.image.map((item, index)=>(
                <img onClick={()=>setImage(item)} src={item} key={index} className='w-[50%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer  ' alt="" />

              ))
            }
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} className='w-full h-auto' alt="" />
          </div>
        </div>


        {/*-------------- Product info */}
        <div className="flex-1">
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} className="w-3" />
            <img src={assets.star_icon} className="w-3" />
            <img src={assets.star_icon} className="w-3" />
            <img src={assets.star_icon} className="w-3" />
            <img src={assets.star_dull_icon} className="w-3" />
            <p className='pl-2'>{122}</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <p className='mt-4 text-gray-700 font-bold'>Manufactured by : {productData.seller}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {
                productData.sizes.map((s, index)=>(
                  <button onClick={()=>setSize(s)} className={`border-2 py-2 px-4 bg-gray-100 ${s === size ? 'border-orange-500' : ''}`} key={index} >{s}</button>
                ))
              }
            </div>
          </div>

          <button onClick={()=>{
            addToCart(productData._id, size);
          }} className='bg-black text-white text-sm px-8 py-3 active:bg-gray-700' >Add to Cart</button>
              <hr className='mt-8 sm:w-4/5' />

              <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
                <p>100 % original product</p>
                <p>cash on delivery is available on this product</p>
                <p>Easy return and exchange policy within 7 days </p>
              </div>
        </div>


      </div>

      {/* Description and review section */}
      <div className="mt-20">
        <div className="flex ">
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>

        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus asperiores eum culpa molestiae eaque magni odit maiores corporis aut, ab non neque, nam ipsa error impedit quaerat aspernatur odio facilis.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non dignissimos laudantium, quia quasi doloremque quod provident! Id, recusandae nostrum eaque autem omnis error ducimus! Consequatur inventore officia pariatur repellat ab?</p>


        </div>



        {/* display related products */}
        <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>

      </div>


    </div>
  ) : <div className='opacity-0'></div>
}

export default Product