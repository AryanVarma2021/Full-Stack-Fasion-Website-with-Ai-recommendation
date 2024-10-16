import express from 'express'
import adminAuth from '../middleware/adminAuth.js';
import {placedOrder, updateStatus, getAllOrders, userOrders} from '../controllers/orderController.js'
import authUser from '../middleware/auth.js';


const orderRouter = express.Router();

orderRouter.post("/list", adminAuth,  getAllOrders);
orderRouter.post("/status", adminAuth, updateStatus);


orderRouter.post("/place",authUser, placedOrder);
orderRouter.post("/userorders", authUser, userOrders)

export default orderRouter;
