import express from "express"
import path from 'path'
import cors from 'cors'
import dotenv from 'dotenv'
import {ENV} from './lib/env.js'
import { connectDB } from "./lib/db.js"
import {serve} from "inngest/express"
import { inngest , functions } from "./lib/inngest.js"

// dotenv.config();
 
console.log(ENV.PORT) 
console.log(ENV.DB_URL) 

const app = express();
const __dirname = path.resolve();


app.use("api/inngest",serve( {client:inngest,functions} ))
 ///  inngest app syncnew  paste your  depolyment URL 
 // middleware  

app.use(express.json())
 // credentials:true  mean that server allows browser user to inclue cookies on req 
app.use( cors({origin:ENV.CLIENT_URL, credentials:true}))


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
