import express from "express";

import {addProduct,  removeProduct, listProducts, singleProduct, addRecomemdedProduct} from '../controllers/productController.js'
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";


const productRouter = express.Router();  

productRouter.post('/add',authUser, upload.fields([{name:'image1', maxCount:1},{name:'image2', maxCount:1}, {name:'image3', maxCount:1}, {name:'image4', maxCount:1} ]), addProduct);
productRouter.post('/remove',authUser,    removeProduct);
productRouter.post('/single',  singleProduct);
productRouter.get('/list', listProducts);
productRouter.post('/addrecommend',upload.fields([{name:'image1', maxCount:1},{name:'image2', maxCount:1}, {name:'image3', maxCount:1}, {name:'image4', maxCount:1} ]),addRecomemdedProduct )



export default productRouter;