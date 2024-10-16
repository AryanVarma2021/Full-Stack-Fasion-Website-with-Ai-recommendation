import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectdb from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import sellerRouter from './routes/sellerRoute.js';


//App config
const app = express();   
const port = process.env.PORT || 4000;
connectdb()
connectCloudinary()






//middleware
app.use(express.json());
app.use(cors());  
 



  



//api endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/seller", sellerRouter);
app.get('/', (req, res)=>{
    res.send("API Working")

})


app.listen(port, ()=>{
    console.log(`Running on Port : ` + port);
    
})