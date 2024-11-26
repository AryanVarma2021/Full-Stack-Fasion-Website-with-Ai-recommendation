
import mongoose from "mongoose";


const productSchema = new mongoose.Schema({  

    articleNumber: {
        type: String,
        required: true,
        default: () => Math.floor(Math.random() * Date.now())
    },
    

    name : {
        type : String,
        required : true,
    },
    

    description : {
        type : String,
        required : true
    },

    price : {
        type : Number,
        required : true
    },

    image : {
        type : Array,
        required : true
    },

    category : {
        type : String,
        required : true

    },
    subCategory : {
        type : String,
        required : true

    },
    sizes: [{
        size: { type: String, required: true },  // e.g., "S", "M"
        quantity: { type: Number, required: true } // e.g., 9, 11
    }],
    
    bestseller : {
        type : Boolean,
        

    },
    date : {
        type : Number,
        required : true
    },
    seller : {
        type : String,
        required : true
    }


})


const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;