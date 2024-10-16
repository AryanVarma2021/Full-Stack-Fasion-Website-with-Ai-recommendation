import React, { useState } from 'react'
import axios from 'axios'
import {backendUrl} from '../App'
import { toast } from 'react-toastify'

const Login = ({setToken}) => {
  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');







  const onSubmitHandler = async(e) =>{
    e.preventDefault();


    try{
      console.log(backendUrl);
      
      const response = await axios.post(backendUrl + '/api/user/admin', {
        email,
        password
      });

      console.log(response);
      

      if(response.data.success){
        console.log("token set");
        
        setToken(response.data.token)

      }
      else {
        toast.error(response.data.message)
      }
      
      

    }
    catch(error){
      console.log(error);
      toast.error(error.message)
      

    }

  }







  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md ">
        <h1 className='text-2xl font-bold mb-4 '>Admin Panel </h1>

        <form onSubmit={onSubmitHandler}>
           <div className="mb-3 min-w-72">
           <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
           <input value={email} onChange={(e)=>setEmail(e.target.value)} className='rounded w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder='your@email.com'/>
           </div>
           <div className="mb-3 min-w-72">
           <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
           <input value={password} onChange={(e)=>setPassword(e.target.value)} className='rounded w-full px-3 py-2 border border-gray-300 outline-none' type="password" placeholder='Enter you Password'/>
           </div>
           <button className='bg-black text-white px-4 py-2 rounded-md' type='submit'>Login</button>


        </form>
      </div>
    </div>
  )
}

export default Login