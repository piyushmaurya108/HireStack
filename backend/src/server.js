import express from "express"
import path from 'path'
import cors from 'cors'
import dotenv from 'dotenv'
import {ENV} from './lib/env.js'
import { connectDB } from "./lib/db.js"
import {serve} from "inngest/express"
import { inngest , functions } from "./lib/inngest.js"  
import { clerkMiddleware, clerkClient, requireAuth, getAuth } from '@clerk/express'// dotenv.config();
import protectRoute from './middleware/protectRoute.js'
import serverless from "serverless-http"
console.log(ENV.PORT) 
console.log(ENV.DB_URL) 

const app = express();
app.use(express.json())
const __dirname = path.resolve();
app.use(clerkMiddleware()); //this add the auth field to request object:req.auth() and to  verify the user is valid or not and add the user data to req object     
app.use("/api/inngest",serve( {client:inngest,functions} ))
 ///  inngest app syncnew  paste your  depolyment URL 
 // middleware  

app.get("/video-calls" , protectRoute, (req,res)=>{
        res.status(200).json({msg:"video call endpoints"});
})


 // credentials:true  mean that server allows browser user to inclue cookies on req 
app.use( cors({origin:ENV.CLIENT_URL, credentials:true}))


app.get("/" , (req,res)=>{
       res.json({msg:"sucesess fo api "})
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
export default serverless(app)
startServer();
