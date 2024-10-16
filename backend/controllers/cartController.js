//add to cart

import userModel from "../models/userModel.js";

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