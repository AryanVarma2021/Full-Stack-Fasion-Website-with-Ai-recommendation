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
    console.log(decoded);
    
    
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


// Backend - Controller for Seller Analytics
// const getSellerAnalytics = async (req, res) => {
//   try {

//       const {token} = await req.headers; // Assuming seller info is in req.seller
//       const userId = await decodeToken(token);
//       const seller = await sellerModel.findById(userId);
//       const sellerName = seller.name
//       const orders = await orderModel.find({ "items.seller": sellerName });

//       let totalProductsSold = 0;
//       let totalRevenue = 0;
//       const productSales = {}; // { productId: { name, quantitySold, revenue } }
//       const categorySales = {}; // { category: { quantitySold, revenue } }

//       orders.forEach(order => {
//           totalRevenue += order.amount;

//           order.items.forEach(item => {
//               totalProductsSold += item.quantity;

//               // Product-based sales
//               if (!productSales[item._id]) {
//                   productSales[item._id] = {
//                       name: item.name,
//                       quantitySold: 0,
//                       revenue: 0
//                   };
//               }
//               productSales[item._id].quantitySold += item.quantity;
//               productSales[item._id].revenue += item.price * item.quantity;

//               // Category-based sales
//               if (!categorySales[item.category]) {
//                   categorySales[item.category] = {
//                       quantitySold: 0,
//                       revenue: 0
//                   };
//               }
//               categorySales[item.category].quantitySold += item.quantity;
//               categorySales[item.category].revenue += item.price * item.quantity;
//           });
//       });

//       res.json({
//           totalProductsSold,
//           totalRevenue,
//           productSales,
//           categorySales
//       });

//   } catch (error) {
//       console.log(error);
//       res.status(500).json({ success: false, message: error.message });
//   }
// };


const getSellerAnalytics = async (req, res) => {
  const { userId } = req.body;

  try {
      // Find the seller by userId
      const seller = await sellerModel.findById(userId);

      if (!seller) {
          return res.status(404).json({ success: false, message: "Seller not found" });
      }

      // Fetch all orders that contain items from this seller
      const orders = await orderModel.find({ "items.seller": seller.name });

      // Filter items in each order to include only those belonging to this seller
      const sellerOrders = orders.map(order => {
          const filteredItems = order.items.filter(item => item.seller === seller.name);

          if (filteredItems.length > 0) {
              return {
                  ...order._doc, // Spread the rest of the order fields
                  items: filteredItems // Replace items with filtered items
              };
          }

          return null; // Exclude orders that have no matching items
      }).filter(order => order !== null); // Remove null orders

      // If no orders are found after filtering
      if (sellerOrders.length === 0) {
          return res.status(200).json({ success: true, message: "No orders found for this seller", data: [] });
      }

      // Prepare analytics data
      const totalProductsSold = {};
      sellerOrders.forEach(order => {
          order.items.forEach(item => {
              const productId = item._id;

              if (!totalProductsSold[productId]) {
                  totalProductsSold[productId] = {
                      name: item.name,
                      quantitySold: 0,
                      revenue: 0,
                      soldDates: []
                  };
              }

              totalProductsSold[productId].quantitySold += item.quantity;
              totalProductsSold[productId].revenue += item.quantity * item.price;
              totalProductsSold[productId].soldDates.push(order.date);
          });
      });

      // Fetch products to calculate remaining quantities
      const products = await productModel.find({ seller: seller.name });

      const productSales = {};
      products.forEach(product => {
          const productId = product._id.toString();
          const soldQuantity = totalProductsSold[productId]?.quantitySold || 0;

          if (!productSales[productId]) {
              productSales[productId] = {
                  name: product.name,
                  quantitySold: soldQuantity,
                  revenue: totalProductsSold[productId]?.revenue || 0,
                  remainingSizes: [],
                  soldDates: totalProductsSold[productId]?.soldDates || [],
                  price : product.price
              };
          }

          product.sizes.forEach(size => {
              productSales[productId].remainingSizes.push({
                  size: size.size,
                  remainingQuantity: size.quantity
              });
          });
      });

      // Final analytics data
      const analyticsData = {
          totalProductsSold: Object.values(totalProductsSold).reduce((sum, item) => sum + item.quantitySold, 0),
          totalRevenue: Object.values(totalProductsSold).reduce((sum, item) => sum + item.revenue, 0),
          productSales
      };

      res.status(200).json({ success: true, data: analyticsData });
  } catch (error) {
      console.error("Error fetching analytics:", error);
      res.status(500).json({ success: false, message: error.message });
  }
};










export {
    
    removeProduct,
    getAllProducts,
    getUserWhoOrdered,
    updateProduct,
    getAllSellers,
    removeSeller,
    getSellerAnalytics
}