import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"
import Stripe from "stripe";

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




const placeOrderStripe = async(req, res) => {
    try {
        console.log("Stripe");
        
        console.log(req.body);
        const {userId} = req.body;
        
        
        
        const { items, amount, address} = req.body.orderData;

        const {origin} = req.headers;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod : "Stripe",
            payment : false,
            date : Date.now()
        }


        const newOrder = await new orderModel(orderData);
        await newOrder.save();

        const line_items = items.map((item)=>({
            price_data : {
                currency : currency,
                product_data : {
                    name : item.name
                },
                unit_amount : item.price * 100
            },
            quantity : item.quantity
        }))

        line_items.push({
            price_data : {
                currency : currency,
                product_data : {
                    name :'Delivery Charges'
                },
                unit_amount : deliveryCharges * 100
            },
            quantity : 1

        })


        const session = await stripe.checkout.sessions.create({
            success_url : `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url : `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode : 'payment'
        })

        res.json({success : true, session_url : session.url})





        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
        
    }

}

const verifyStripe = async(req, res) => {
    const {orderId, success, userId} = req.body;
    try {
        if(success === "true") {
            await orderModel.findByIdAndUpdate(orderId, {payment : true});
            await userModel.findByIdAndUpdate(userId, {cartData : {}});
            res.json({success : true});
        }
        else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({success : false})
        }
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
    }

}


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const currency = 'inr'
const deliveryCharges = 10
export {
    placedOrder,
    getAllOrders,
    userOrders,
    updateStatus,
    placeOrderStripe,
    verifyStripe
}