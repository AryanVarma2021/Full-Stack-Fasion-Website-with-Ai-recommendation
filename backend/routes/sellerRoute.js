import express from 'express'
import { loginSeller,registerSeller,getSellerAnalytics, removeSeller, getAllSellers,  removeProduct, getAllProducts, updateProduct, getUserWhoOrdered} from '../controllers/sellerController.js'
import authUser from '../middleware/auth.js';



const sellerRouter = express.Router();


sellerRouter.post('/login',loginSeller );  
sellerRouter.post('/register',registerSeller)
sellerRouter.post('/remove',authUser,  removeProduct);
sellerRouter.post('/status', authUser,  updateProduct);
sellerRouter.post('/list',   getAllProducts);
sellerRouter.post('/getUser', getUserWhoOrdered);
sellerRouter.post('/getsellers', getAllSellers)
sellerRouter.post('/removeseller',removeSeller )
sellerRouter.post('/analytics', authUser, getSellerAnalytics)


export default sellerRouter;