import userModel from "../models/userModel.js";
import validator  from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'





const createToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET);
}


//route for user login
const loginUser = async(req, res) =>{
    try {
        const {email, password} = req.body;

        console.log(email);
        
 
    const user =  await userModel.findOne({email});
    if(!user) {
        return res.json({success:false, message:"User Not found"})
    }

    console.log(user._id);
    

    const isMatch = await bcrypt.compare(password, user.password);

    if(isMatch){
        const token = createToken(user._id);
    return res.json({success:true, token})
       
    }
    else {
        return res.json({success:false, message:"Incorrect Password"})
    }
        
    } catch (error) {
        console.log(error);
        
        res.json({success:false, message:error.message});
        
    }

    



}



//route for user registeration
const registerUser = async(req, res) =>{
    try {
        const {name, email, password} = req.body;


        //check if every field is not null
        //check if user already exist
        const exists = await userModel.findOne({email})
        if(exists) {
            return res.json({success:false, message:"User Already Exists"})
        }
        
        
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Enter Valid Email"})

        }

        if(password.length < 8){
            return res.json({success:false, message:"Enter Strong Password"})

        }


        //password hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password : hashedPassword
        })

        const user = await newUser.save();

        //token generation

        const token = createToken(user._id);
        res.json({success:true, token})




        


        
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
        
    }

}


//route for admin login
const adminLogin = async(req, res) =>{
    try {
        
        const {email, password} = req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET);
            res.json({success:true, token})
        }
        else {
            res.json({success:false, message:"INVALID CREDENTIALS"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, error})
        
        
    }

}


export {
    loginUser,
    registerUser,
    adminLogin
}