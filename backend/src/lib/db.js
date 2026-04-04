import mongoose from 'mongoose'
import {ENV} from './env.js'

let connectionPromise = null;
mongoose.set("bufferCommands", false);

export const connectDB  = async()=>{
    try {

         if( ! ENV.DB_URL){
             throw new Error ("DB_URL is not defined in enviroment variables")
         }

      if (mongoose.connection.readyState === 1) {
          console.log("[connectDB] Already connected to MongoDB");
          return mongoose.connection
      }

      if (!connectionPromise) {
          console.log("[connectDB] Starting new connection to MongoDB...");
          connectionPromise = mongoose.connect(ENV.DB_URL, {
              serverSelectionTimeoutMS: 5000,
              socketTimeoutMS: 10000,
              family: 4,
          })
      }

      const conn = await connectionPromise
      console.log("[connectDB] Connected to MongoDB :" , conn.connection.host )
      return conn.connection
    }
    catch(error){
          connectionPromise = null;
          console.error("[connectDB] Error connection to MongoDB:", error.message);
          throw error
    }
}
