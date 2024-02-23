import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    subject : {
        type : String,
        
    },
    image: {
        type: String 
    },
    status : {
        type : String,
       
    },
    callBackNumber : {
        type : String,
       
    },
    response : {
        type : String,
    
    },
    category : {
        type : String,
    
    },
    description : {
        type : String,
    
    },
    userId : {
        type : String
    }
  
  
},{timestamps : true })


export const Ticket = mongoose.model("Ticket" , ticketSchema)