import mongoose, { Schema } from "mongoose";

const walletRequest = new mongoose.Schema({
  
  image : {
    type : String
  },
  userId : {
    type : String
  },
  amount : {
    type : Number
  },
  userId : {
    type : String
  },
  status : {
    type : String
  },
  transectionId : {
    type : Schema.Types.ObjectId ,
             ref :    "Transection"
  }

  
},{timestamps : true })


export const wallet = mongoose.model("walletRequest" , walletRequest)