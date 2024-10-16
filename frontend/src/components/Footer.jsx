import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div>
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
            <div className="">
                <img src={assets.logo} className='w-32 mb-5' alt="" />
                <p className='w-full md:w-2/3 text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa tenetur incidunt aliquam exercitationem, quasi dignissimos possimus deserunt, illo alias eius, vitae repellat veniam. Reprehenderit dolorum cupiditate unde dolore, rerum amet!</p>
            </div>
            <div className="">
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-700'>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>

            <div className="">
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-700'>
                    <li>+918767399825</li>
                    <li>contact@gmail.com</li>
                </ul>
            </div>
        </div>

        <div className="">
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2024 - All right reserve</p>
        </div>
    </div>
  )
}

export default Footer