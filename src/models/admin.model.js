import mongoose, { Schema } from "mongoose";

const adminSchema = new mongoose.Schema({
 
  userName : {
    type : String,
  },
  password : {
    type : String,
  },
  walletRequest : {
    type : Schema.Types.ObjectId ,
    ref : "wallet" 
  },
  custometOrders : [{
    type : Schema.Types.ObjectId ,
    ref :    "Product"
    }],
 


  
},{timestamps : true })


export const Admin = mongoose.model("Admin" , adminSchema)
