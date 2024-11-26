import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Verify = () => {

    const {navigate, token, setCartItems, backendUrl} = useContext(ShopContext)
    const [searchParams, setSearchParams] = useSearchParams();

    const success= searchParams.get('success');
    const orderId = searchParams.get('orderId');
    

    useEffect(()=>{verifyPayment()}, [token])



    const verifyPayment = async() => {
        try {
            
            if(!token) {
                return null;
            }

            const res = await axios.post(backendUrl+'/api/order/verifyStripe', {success, orderId}, {headers:{token}})

            if(res.data.success) {
                setCartItems([]);
                navigate('/orders')
            }
            else {
                toast.error("Error occur")
                navigate('/')
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error);
            
            
        }

    }
  return (
    <div>Verify</div>
  )
}

export default Verify