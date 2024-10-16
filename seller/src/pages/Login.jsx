import React, { useState   } from 'react';
import {useNavigate} from 'react-router-dom'

import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl  } from '../App';
const Login = ({token, setToken}) => {
  const [currentState, setCurrentState] = useState('Login');
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [storeAddress, setStoreAddress] = useState('');

  const onSubmitHandler = async (e) => {
    console.log(currentState);
    
    e.preventDefault();

    try {
      if (currentState === 'Login') {
        console.log("cliked");
        
        const response = await axios.post(`${backendUrl}/api/seller/login`, {
          email,
          password,
        });

        console.log(response.data);
        

        if (response.data.success) {
          setToken(response.data.token);
          
          toast.success('Login Successful');
          
           // Redirect to the seller's dashboard
        } else {
          toast.error(response.data.message);
        }
      } else {

        console.log("in rgister");
        
        const response = await axios.post(`${backendUrl}/api/seller/register`, {
          name,
          email,
          password,
          storeAddress,
        });

        console.log(response.data);
        

        if (response.data.success) {
          setToken(response.data.token);
          toast.success('Seller Account Created');
          setCurrentState('Login');
          
         
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState === 'Login' ? '' : (
        <>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="w-full p-2 border border-gray-800"
            placeholder="Business Name"
            type="text"
            required
          />
          <textarea
            onChange={(e) => setStoreAddress(e.target.value)}
            value={storeAddress}
            className="w-full p-2 border border-gray-800"
            placeholder="Store Address"
            required
          />
        </>
      )}
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className="w-full p-2 border border-gray-800"
        placeholder="Email"
        type="email"
        required
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className="w-full p-2 border border-gray-800"
        placeholder="Password"
        type="password"
        required
      />
      <div className="w-full cursor-pointer flex justify-between text-sm mt-[-8px]">
        <p>Forgot Your Password</p>
        {currentState === 'Login' ? (
          <p className="cursor-pointer" onClick={() => setCurrentState('Sign Up')}>
            Create Account
          </p>
        ) : (
          <p className="cursor-pointer" onClick={() => setCurrentState('Login')}>
            Login here
          </p>
        )}
      </div>

      <button type="submit" className="bg-black text-white font-light px-8 py-3">
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Login;
