import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={'CONTACT'} text2={'US'}/>

      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row mb-28 gap-10">
        <img src={assets.contact_img} className='w-full md:max-w-[450px]' alt="" />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>Gittikhadan , Katol Road <br /> Nagpur</p>
          <p className='text-gray-500'>Number : +918767399825 <br /> Email : contact@gmail.com </p>
          
          
          
        </div>
      </div>
      <NewsLetterBox/>
    </div>
  )
}

export default Contact