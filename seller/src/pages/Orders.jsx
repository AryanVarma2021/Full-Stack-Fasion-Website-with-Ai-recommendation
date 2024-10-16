import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'

import {backendUrl} from "../App"


const Orders = ({token}) => {

  const [orders, setOrders] = useState([]);

  useEffect(()=>{}, [])

  useEffect(()=>{
    fetchAllOrders()

  }, [])

  const fetchAllOrders = async() => {
    if(!token){
      return null;
    }

    try {
      const response = await axios.post(backendUrl+"/api/seller/getUser", {}, {headers : {token}});
      if(response.data.success){
        console.log(response.data.orders);
        
        setOrders(response.data.orders)
      }
      else {
        toast.error(response.data.message)
      }
      
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
      
    }

  }

  const statusHandler = async(e, orderId) => {

    try {
      const response = await axios.post(backendUrl+"/api/seller/status", {orderId, status : e.target.value}, {headers : {token}});
      console.log(response.data);
      
      if(response.data.success){
        await fetchAllOrders();

      }
      else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
      
    }


  }
  return (
    <div>
      <h3>Order Page</h3>
      <div className="">
        
        {
          orders.map((order, index)=>(
            <div className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 m-3 md:m-4 text-sm text-gray-700 " key={index}>
             
              <div className="">
              <div className="">
                {order.items.map((item, index)=>{
                  if(index === order.items.length-1){
                    return <p className='py-0.5' key={index}>{item.name} X {item.quantity} <span>{item.size}</span></p>


                  }
                  else {
                    
                    return <p className='py-0.5' key={index}>{item.name} X {item.quantity} <span>{item.size}</span> ,</p>


                  }
                })}
              </div>
              <p className='mt-3 mb2 font-medium '>{order.address.firstname + " " + order.address.lastname}</p>
              <div className="">
                <p>{order.address.street + "," }</p>
                <p>{order.address.city + ", " + order.address.state +", " + order.address.country + ", " + order.address.zipcode}</p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <div className="">
              <p className='text-sm sm:text-[15px]'>Items : {order.items.length}</p>
              <p className='mt-3'>Method : {order.paymentMethod}</p>
              <p>Payment : {order.payment ? 'done' : 'pending'}</p>
              <p>Date : {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className='text-sm sm:text-[15px]'>Rs {order.amount}</p>
            <select onChange={(e)=>{
              if(e.target.value === "Delivered"){
                statusHandler(e, order._id)
              


              }
              else {
              statusHandler(e, order._id)
              }
            
            }
            
            } 
              value={order.status} className='p-2 font-semibold' >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
            </div>
          ))}
          </div>
    </div>
  )
}

export default Orders