import mongoose , {Schema} from "mongoose";
import jwt  from "jsonwebtoken";
import bcrypt from "bcrypt" 
const userSchema  = new Schema({
    username : {
        type : String,
        required : true ,
        unique : true ,
        lowercase : true ,
        trim : true ,
        index : true 
    } ,
    email : {
        type : String,
        required : true ,
        unique : true ,
        lowercase : true ,
        trim : true 
        
    } ,
    fullName : {
        type : String,
        required : true ,
        index : true ,
        trim : true 
        
    } ,
    image: [{
        imageURL: {
            type: String // Storing multiple imageURLs for the user
        }
    }],
    password : {
        type : String,
        required : [true , "password is required"] 
    } ,
    refreshToken : {
        type : String, 
    } ,
    phoneNumber : {
        type : Number, 
    } ,
    spent : {
        type : Number, 
    } ,
    totalOrders : {
        type : Number, 
    } ,
    walletBalance : {
        type : Number, 
    } ,
    isAdmin : {
        type : Boolean,
    } ,
    cart :[ {
        type : Schema.Types.ObjectId ,
        ref : "Product"
    }] ,
    Ticket :[ {
             type : Schema.Types.ObjectId ,
             ref :    "Ticket"
    }],
    Transection :[ {
             type : Schema.Types.ObjectId ,
             ref :    "Transection"
    }],

    orders : [{
        type : Schema.Types.ObjectId ,
        ref :    "Product"
        }],
        
    libraryImage :[ {
            type : String
          }],
    address : {
        type : String
    }
    }


,{timestamps : true })


userSchema.pre("save", async function (next){
    // agar kabhi bhi save request hogi to ye har baar password ko hash kr dega isiliye 
    // please make sure ki agar password modified h tabhi password ko hash krna hota h 
    if(!this.isModified("password",)) return next();
    // agar password modified hua h to password ko hash kro 
    this.password = await bcrypt.hash(this.password , 10);
    next();
})

userSchema.methods.isPasswordCorrect = async function (password){
   return await bcrypt.compare(password , this.password)
}

userSchema.methods.generateAccessToken = function(){
    
   const AccessToken  =  jwt.sign(
        {
            _id : this._id,
            email : this.email,
            username : this.username,
            fullName : this.fullName
        } ,
         process.env.ACCESS_TOKEN ,
         {
            expiresIn : process.env.ACCES_EXPIRY_TOKEN
         }
         
        )
       
        return AccessToken
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id : this._id,
          
        } ,
         process.env.REFRESH_TOKEN_SECRET ,
         {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
         }
         
        )
}
export const User = mongoose.model("User" , userSchema)