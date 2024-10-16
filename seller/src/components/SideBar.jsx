import React from 'react'
import {NavLink} from 'react-router-dom'

import add from "../assets/add_icon.png"
import order from "../assets/order_icon.png"


const SideBar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2 '>
    <div  className="flex flex-col gap-6 pl-[20%] text-[15px]">
        <NavLink  className="  flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg" to='/add'>
        <img src={order} className='w-5 h-5'  alt="" />
        <p className='hidden md:block'>Add Items</p>
        
        </NavLink>
        <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg" to='/list'>
        <img src={order} className='w-5 h-5'  alt="" />
        <p className='hidden md:block'>List Items</p>
        
        </NavLink>
        <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg" to='/orders'>
        <img src={order} className='w-5 h-5'  alt="" />
        <p className='hidden md:block'>Orders</p>
        
        </NavLink>
    </div>
</div>
  )
}

export default SideBar;