import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    itemsData : {
        type : Object,
        default : {},
        
    },
    storeAddress : {
        type : Object,
        required : true
    }


}, {minimize:false})


const sellerModel = mongoose.models.seller || mongoose.model("seller", sellerSchema);

export default sellerModel;

