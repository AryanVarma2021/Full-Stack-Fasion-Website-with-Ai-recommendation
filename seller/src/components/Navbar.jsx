import React, { useContext, useState } from 'react'
import {Link, NavLink} from 'react-router-dom'
import logo from "../assets/logo.png"
import profilelogo from '../assets/profile_icon.png'


const Navbar = ({token, setToken}) => {
    const [visible, setVisible] = useState(false);
    



const logout = () =>{
    localStorage.setItem(token, "");
    setToken("");
    
    
}

  return (
    <div className='flex items-center p-2 justify-between' >
        <img className='w-[max(10%, 80px)]' src={logo} alt="" />
        <button onClick={()=>logout()} className='bg-gray-600 text-white px-5 py-2  sm:px-7 sm:py-2 rounded-full '>Logout</button>
    </div>
  )
}

export default Navbar