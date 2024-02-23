import mongoose from "mongoose";

const transection = new mongoose.Schema({ 
amount : {
    type : Number,
    required   : true
},
Status : {
    type : String
},
response : {
    type : String,
    required   : true
},
added : {
    type : String,
    required   : true
},
deliveryCompany : {
    type : String
}


},{timestamps : true })


export const Transection = mongoose.model("Transection" , transection)
