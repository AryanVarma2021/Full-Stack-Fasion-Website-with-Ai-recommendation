import jwt from 'jsonwebtoken';

const authUser = async(req, res, next) =>{

    const {token} = req.headers;
    
    
    console.log("Token ", token);
    


    
    
    
    
        if(!token){
            return res.json({success:false, message:"Not Authorized"})
        }

    try {
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
        
        
        
        
        req.body.userId = decodeToken.id;
        
        
        next();
        
    } catch (error) {
        console.log(error);
        
        return res.json({success:false, message:error.messge})
        
    }

}

export default authUser;