import express from "express"
import dotenv from 'dotenv'
import {ENV} from './lib/env.js'
// dotenv.config();

console.log(ENV.PORT) 
console.log(ENV.DB_URL) 

const app = express();

app.get("/" , (res,req)=>{
       req.json({msg:"sucesess fo api "})
})

app.listen(ENV.PORT,()=> console.log( "Server running on port:",ENV.PORT ))
