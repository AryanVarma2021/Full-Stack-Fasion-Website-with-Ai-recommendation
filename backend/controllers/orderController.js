import { STATES } from "mongoose";
import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js"




const getAllIds = (items) => items.map((item) => item._id);

const updateProductQuantity = async (id, quantity, size) => {
    try {
        //console.log("size : ", size);
        
        // Find the product by its ID
        const product = await productModel.findById(id);

        // Ensure the product exists
        if (!product) {
            console.log("Product not found");
            return false; // Product not found
        }

        // Find the size object in the sizes array
        //console.log(product.sizes[0].size);
        
        const sizeObj = product.sizes.find(s => s.size === size);
        //console.log(sizeObj);
        
        
        // Ensure the size object exists
        if (!sizeObj) {
            console.log("Size not found");
            return false; // Size not found
        }

        // Check if there is enough quantity available for the requested size
        if (sizeObj.quantity >= quantity) {
            sizeObj.quantity -= quantity; // Decrease the quantity for the specific size
            await product.save(); // Save the updated product
            console.log("Quantity updated successfully");
            return true; // Return true indicating success
        } else {
            console.log("Not enough quantity available for the requested size");
            return false; // Not enough quantity available
        }

    } catch (error) {
        console.log("Error updating product quantity:", error);
        return false; // Return false in case of an error
    }
};



const placedOrder = async (req, res) => {
    try {
        const { userId } = req.body;
        const { items, amount, address, method } = req.body.orderData;
        
        

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: method,
            payment: false,
            date: Date.now()
        };

        for (const item of items) {

            console.log(item);
            
            
            
            const isSuccessUpdated = await updateProductQuantity(item._id, item.quantity, item.size);
            
            if (!isSuccessUpdated) {
                const pro = await productModel.findById(item._id)
                return res.status(401).json({ success: false, message: `Insufficient stock for item`, item : pro.name });
            }
        }

        // Proceed to create the order if all items have sufficient stock
        const newOrder = new orderModel(orderData);
        await newOrder.save();
        
        // Clear the user’s cart after placing the order
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.json({ success: true, message: "Order Placed Successfully", order: newOrder });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


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