
import dotenv from 'dotenv'
import app from './app.js'; // Change the import statement

import connectdb from "./db/index.js";
dotenv.config({path: './env'})

connectdb()
.then(()=>{
    app.listen(process.env.PORT || 8000 ,()=>{
        console.log(`Server is running at port : ${process.env.PORT}`);
        app.on("error",(error)=>{console.log("Error : ",error); throw error ;} )
    })
})
.catch((error)=>{
console.log("MONGO db connection failed: " + error);
})

