//  Add Product


import {v2 as cloudinary} from 'cloudinary'
import productModel from '../models/productModel.js';
import sellerModel from '../models/sellerModel.js';
import jwt from 'jsonwebtoken'
import axios from "axios"
 export const decodeToken = (token) => {


    
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




  const addRecomemdedProduct = async(req, res) => {  
    try {
        const { name, description, price, category, subCategory, seller, image, quantity } = req.body;


        
           
                let result = await cloudinary.uploader.upload(image, {resource_type:"image"});
               

    
        

        const productData = {
            name,
            description,
            subCategory,
            price : Number(price),
            image : result.secure_url,
            category,
            quantity,
            
            sizes : ["S", "M", "L"],    
            bestseller : false,
            date : Date.now(),  
            seller
        }
        

        const product = new productModel(productData)
        const d = await product.save();
        console.log(d._id);
        
            
        res.json({success:true, d, id : d._id})
        



        
    } catch (error) {
        console.log(error.message);  
        res.json({success : false, message:error.message})
        
        
    }

  }


  

const addProduct = async(req, res) => {
    try {
        const { name, bestseller, description, price, category, subCategory, sizes, quantity } = req.body;
        const coded = req.headers.token;

        const userId = decodeToken(coded);
        const sizesArray = JSON.parse(sizes);
        
        console.log(sizes, typeof(sizes));
        
        const sizeQuantities = sizesArray.map(size => ({
            size: size,
            quantity: quantity // You can customize the quantity as needed
        }));
        console.log(sizeQuantities);
        


        
        
       
       
        

        const temp = await sellerModel.findById(userId);
        
        
        if(!temp){
            res.json({success : false, message : "Seller not found"});
        }



        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];


        const images = [image1, image2, image3, image4].filter((item)=> item !== undefined);
        console.log(images);
        

        let imagesUrl = await Promise.all(
            images.map(async(item)=>{
                let result = await cloudinary.uploader.upload(item.path, {resource_type:"image"});
                return result.secure_url;

            })
        )

        const productData = {
            name,
            description,
            subCategory,
            price : Number(price),
            image : imagesUrl,
            category,
            
            
            sizes : sizeQuantities,
            bestseller : bestseller === "true" ? true : false,
            date : Date.now(),
            seller : temp.name
        }
        console.log(productData);

        const product = new productModel(productData)
        await product.save();

        res.json({success:true, message:"Product uploaded successfully"})
        



        
    } catch (error) {
        console.log(error.message);  
        res.json({success : false, message:error.message})
        
        
    }

}


//list all products 
const listProducts = async(req, res) => {
    try {

        const products = await productModel.find({});
        res.json({success:true, products})

        
    } catch (error) {
        console.log(error);
        res.json({success:false, message : error})
        
        
    }

}  


//remove product
const removeProduct = async(req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
    res.json({success:true, message:"deleted successfully"})
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error})
        
        
    }

}

//get single product
const singleProduct = async(req, res) => {
    try {

        const {productId} = req.body;
        const product = await productModel.findById(productId);
        if(!product){
            res.json({success:false, message:"INVALID PRODUCT"})
        }

        res.json({success:true, product});
        
    } catch (error) {
        console.log(error);
        res.json({success:false, error})
        
        
    }

}


export {
    listProducts,
    addProduct,
    removeProduct,
    singleProduct,
    addRecomemdedProduct
    
}







