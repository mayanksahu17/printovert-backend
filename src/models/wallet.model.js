import mongoose from "mongoose";

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
  }

  
},{timestamps : true })


export const wallet = mongoose.model("walletRequest" , walletRequest)