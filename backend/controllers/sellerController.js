import sellerModel from "../models/sellerModel.js";
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';
import orderModel from '../models/orderModel.js';  // Assuming there's an order model
import userModel from '../models/userModel.js';

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};
const decodeToken = (token) => {
  try {
    // Verify and decode the token using the same secret used for signing
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // The decoded object will contain the `id` and other payload data
    const userId = decoded.id;

    console.log('Decoded ID:', userId);
    return userId;
  } catch (error) {
    console.error('Error decoding token:', error.message);
    return null;
  }
};

// Route for seller login
export const loginSeller = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        

        const seller = await sellerModel.findOne({ email });
        if (!seller) {
            return res.json({ success: false, message: "Seller not found" });
        }

        const isMatch = await bcrypt.compare(password, seller.password);
        if (isMatch) {
            const token = createToken(seller._id);
            return res.json({ success: true, token });
        } else {
            return res.json({ success: false, message: "Incorrect password" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Route for seller registration
export const registerSeller = async (req, res) => {
    try {
        const { name, email, password, storeAddress } = req.body;

        // Check if all fields are provided
        if (!name || !email || !password || !storeAddress) {
            return res.json({ success: false, message: "All fields are required" });
        }

        // Check if seller already exists
        const exists = await sellerModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "Seller already exists" });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter a valid email" });
        }

        // Validate password length
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new seller
        const newSeller = new sellerModel({
            name,
            email,
            password: hashedPassword,
            storeAddress,
        });

        const seller = await newSeller.save();

        // Create a token
        const token = createToken(seller._id);
        return res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};



// products add



// Add a new product


// Update an existing product by ID
const updateProduct = async (req, res) => {
  try {
    const {orderId, status} = req.body;
    const order = await orderModel.findByIdAndUpdate(orderId, {status});

    res.json({success:true, message:"Status updated"})
} catch (error) {
    console.log(error);
    res.json({success:false, message:error.message})
    
}
};

// Remove a product by ID
const removeProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await productModel.findByIdAndDelete(productId);
    if (!product) {
      return res.json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const userId = decodeToken(req.headers.token);
    
    
    const user = await sellerModel.findById(userId)
    
    
    const products = await productModel.find({seller : user.name });
   
    
    res.json({ success: true, products });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};

const removeSeller = async(req, res) => {
  try {
      await sellerModel.findByIdAndDelete(req.body.id);
  res.json({success:true, message:"deleted successfully"})
      
  } catch (error) {
      console.log(error);
      res.json({success:false, message:error})
      
      
  }

}

const getAllSellers = async(req, res) => {
  try {

    const sellers = await sellerModel.find({});
    if(!sellers){
      res.json({success: false, message:"Sellers not found"});
    }

    res.json({success:true, sellers  })
    
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
    
  }
}


// Get users who ordered a specific product
const getUserWhoOrdered = async (req, res) => {
  try {
    const userId = decodeToken(req.headers.token);
    
    
    const user = await sellerModel.findById(userId)

    // Find all orders that contain the product
    const orders = await orderModel.find({
      items: {
        $elemMatch: { seller: user.name }
      }
    });

    console.log(orders);
    

    if (orders.length === 0) {
      return res.json({ success: false, message: 'No orders found for this product' });
    }

    // Extract unique users who ordered the product
    

    res.json({ success: true, orders });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};





export {
    
    removeProduct,
    getAllProducts,
    getUserWhoOrdered,
    updateProduct,
    getAllSellers,
    removeSeller
}