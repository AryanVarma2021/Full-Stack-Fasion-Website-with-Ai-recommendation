import React, {useState, useEffect} from 'react'
import {Routes, Route} from 'react-router-dom'
import Login from './pages/Login'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/NavBar';
import SideBar from './components/SideBar';
import Orders from './pages/Orders';
import ListOrders from './pages/ListOrders';
import Add from './pages/Add';
import SellerAnalytics from './pages/SellerAnalytics';



export const backendUrl = import.meta.env.VITE_BACKEND_URL ;
const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : "");



  useEffect(()=>{

    localStorage.setItem('token', token)
    console.log(token);
    
    
    
  }, [token])






  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer/>
       <div className="flex flex-col  w-full">

        {
          token === "" ? <Login setToken={setToken}/> :

    <>
    {/* <Navbar/>
    <SideBar/> */}
    <Navbar token={token} setToken={setToken}/>
    <div className="flex">

    {/* side bar */}
    <SideBar/>
    
    <div className="w-[70%] ml-[max(5vw, 25px)] my-8 text-gray-600 text-base">
    <Routes>
      
      <Route path='/add' element={<Add token={token}/>}  />
      <Route path='/list' element={<ListOrders token={token}/>}/>
      <Route path='/orders' element={<Orders token={token}/>}/>
      <Route path='/analytics' element={<SellerAnalytics token={token}/>} />

    </Routes>
</div>
</div>
</>
}
</div>
</div>
  )
}

export default App