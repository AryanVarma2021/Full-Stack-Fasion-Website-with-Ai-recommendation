//add to cart

import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";

const addToCart = async(req, res) =>{  

    try {
        const {userId, itemId, size} = req.body;
       
        

        

    const userData = await userModel.findById(userId);

    let cartData = await userData.cartData;

    if(cartData[itemId]){
        if(cartData[itemId][size]){
            cartData[itemId][size] += 1;
        }
        else {
            cartData[itemId][size] = 1;
        }
    }
    else {
        cartData[itemId] = {};
        cartData[itemId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId, {cartData});
    res.json({success : true, message : "Added to Cart"})



    } catch (error) {
        console.log(error);
        res.json({success:false, message : error.message})

        
        
    }



}





//update cart

const updateCart = async(req, res) =>{
    try {

        const {userId, itemId, size, quantity} = req.body;

        const user = await userModel.findById(userId);
        if(!user){
            res.json({success : false, message : "User Not found"})
        }


        const product = await productModel.findById(itemId);
        const sizeData = product.sizes.find((s) => s.size === size); // Find the object with the matching size
        console.log(sizeData);
        
        const productQuantity = sizeData.quantity ;
        console.log(productQuantity);
        if(quantity > productQuantity) {
            
            return res.json({success:false, message : `Only ${productQuantity} no of items availale`})
            
        }

        let cartData = await user.cartData;


        cartData[itemId][size] =quantity;

        await userModel.findByIdAndUpdate(userId, {cartData})
        res.json({success : true, message : "Cart Updated"})
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message : error.message})
        
    }

    

}







//get user cart
const getUserCartData = async(req, res) =>{
    try {
        const {userId} = req.body;

        let user = await userModel.findById(userId);
        let cartData = await user.cartData;
        res.json({success:true, cartData})
    } catch (error) {
        console.log(error);
        res.json({success:false, message : error.message})
        
    }

    

}

export {
    addToCart,
    updateCart,
    getUserCartData
}