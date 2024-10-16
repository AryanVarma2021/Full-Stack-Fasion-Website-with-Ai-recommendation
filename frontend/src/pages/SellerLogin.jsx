import React, { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const SellerLogin = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [storeAddress, setStoreAddress] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (currentState === 'Login') {
        const response = await axios.post(`${backendUrl}/api/seller/login`, {
          email,
          password,
        });

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success('Login Successful');
          navigate('/seller-dashboard'); 
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/seller/register`, {
          name,
          email,
          password,
          storeAddress,
        });

        if (response.data.success) {
          setToken(response.data.token);
          toast.success('Seller Account Created');
          setCurrentState('Login');
          localStorage.setItem('token', response.data.token);
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
      <div className="inline-flex items-center gap-2 mb-2 mt-10"> Seller
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

export default SellerLogin;
