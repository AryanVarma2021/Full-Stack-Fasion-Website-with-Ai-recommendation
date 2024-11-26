import express from 'express'
import adminAuth from '../middleware/adminAuth.js';
import {placedOrder, updateStatus,placeOrderStripe,verifyStripe,   getAllOrders, userOrders} from '../controllers/orderController.js'
import authUser from '../middleware/auth.js';


const orderRouter = express.Router();

orderRouter.post("/list", adminAuth,  getAllOrders);
orderRouter.post("/status", adminAuth, updateStatus);


orderRouter.post("/place",authUser, placedOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe)
orderRouter.post("/userorders", authUser, userOrders)
orderRouter.post("/verifyStripe", authUser, verifyStripe);

export default orderRouter;
