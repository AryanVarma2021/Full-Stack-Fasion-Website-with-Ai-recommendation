import React, { useEffect } from 'react'
import NavBar from './components/NavBar'
import SideBar from './components/sideBar'
import {Routes, Route} from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import {useState} from 'react'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


 export const backendUrl = import.meta.env.VITE_BACKEND_URL ;


const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');



  useEffect(()=>{

    localStorage.setItem('token', token)
    
    
    
  }, [token])






  return (
    <div className='bg-gray-50 min-h-screen'>
        <ToastContainer/>
      <div className="flex flex-col  w-full">
    
      {token === "" ? <Login setToken={setToken}/> :
      
   <>

   <NavBar token={token} setToken={setToken}/>
  
    
    <div className="flex">
      <SideBar/>

      <div className="w-[70%] ml-[max(5vw, 25px)] my-8 text-gray-600 text-base">
          <Routes>
            <Route path='/add' element={<Add token={token}/>}  />
            <Route path='/list' element={<List token={token}/>}/>
            <Route path='/orders' element={<Orders token={token}/>}/>

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