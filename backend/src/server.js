import express from "express"
import dotenv from 'dotenv'
import {ENV} from './lib/env.js'
import { connectDB } from "./lib/db.js"
// dotenv.config();

console.log(ENV.PORT) 
console.log(ENV.DB_URL) 

const app = express();

app.get("/" , (res,req)=>{
       req.json({msg:"sucesess fo api "})
})
 // env production 
//{ code   ..}

const startServer = async ()=>{
       try{
              await connectDB();

              app.listen(ENV.PORT,()=>{
              console.log( "Server running on port:",ENV.PORT)
              connectDB();
               } )

       }
       catch(error){
         console.error("Error starting the server " , error);

       }

};

startServer();
