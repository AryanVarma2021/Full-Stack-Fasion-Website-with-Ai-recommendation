import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"

const placedOrder = async(req, res) =>{
    try { 
        

        const {userId} = req.body;
        
        const { items, amount, address} = req.body.orderData;
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod : "COD",
            payment : false,
            date : Date.now()
        }

        const newOrder = await new orderModel(orderData);
        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, {cartData : {}});
        res.json({success:true, message : "Order Placed Successfully"})

        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
        
    }
}

const getAllOrders = async(req,res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success : true, orders})

        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
        
    }

}


const userOrders =async(req, res) => {
    try {
        const {userId} = req.body;
        
        

        const orders = await orderModel.find({userId});

        if(orders.length > 0){
            res.json({success : true, orders})

        }
        else {
            res.json({success:false, message:"Orders not found"})
        }
    
        
        
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
    }

}


const updateStatus = async(req, res) => {
    try {
        const {orderId, status} = req.body;
        const order = await orderModel.findByIdAndUpdate(orderId, {status});

        res.json({success:true, message:"Status updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
    }

}

export {
    placedOrder,
    getAllOrders,
    userOrders,
    updateStatus
}