import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login')
  const {token, setToken, navigate, backendUrl} = useContext(ShopContext);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('')

  const onSubmitHandler = async(e) =>{
    e.preventDefault();
    console.log("cicked");
    
    try {
      if(currentState === "Login"){

        const response = await axios.post(backendUrl+"/api/user/login", {
          email,
          password
        })

        console.log(response.data);
        

        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token)
          console.log("set token : ", localStorage.getItem("token"), token, response.data.token);
          
        }
        else {
          toast.error(response.data.message);

        }
        
        
        

      }
      else {
        
        
        const response = await axios.post(backendUrl+"/api/user/register", {
          name,
          email,
          password
        })

        console.log(response.data);
        

        if(response.data.success){
          setToken(response.data.token);
          toast.success("User Account Created")
          setCurrentState("Login")
          localStorage.setItem('token', response.data.token)
          console.log("set token : ", localStorage.getItem("token"), token, response.data.token);
          
        }
        else {
          toast.error(response.data.message);
        }
        
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
      
    }
    finally{
      console.log("Local : ", localStorage.getItem("token"));
      
    }
  }



  useEffect(()=>{

    if(token){
      navigate("/")
    }
  }, [token])
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 ' >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>



      
      {currentState === 'Login' ?  "" :<input onChange={(e)=>setName(e.target.value)} value={name} className='w-full p-2 border border-gray-800' placeholder='Name' type="text" required />}
      <input onChange={(e)=>setEmail(e.target.value)} value={email}  className='w-full p-2 border border-gray-800' placeholder='Email' type="email" required />
      <input onChange={(e)=>setPassword(e.target.value)} value={password}  className='w-full p-2 border border-gray-800' placeholder='Password' type="password" required />
      <div className="w-full cursor-pointer flex justify-between text-sm mt-[-8px]">
        <p>Forgot Your Password</p>
        {currentState === 'Login' ? <p className='cursor-pointer' onClick={()=>setCurrentState('Sign Up')}>Create Accout</p> : <p className='cursor-pointer' onClick={()=>setCurrentState('Login')}>Login here</p>}
      </div>


      <button type='submit'  className='bg-black text-white font-light px-8 py-3'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
    </form>
  )
}

export default Login