import mongoose from 'mongoose'
import {ENV} from './env.js'

let connectionPromise = null;

export const connectDB  = async()=>{
    try {

         if( ! ENV.DB_URL){
             throw new Error ("DB_URL is not defined in enviroment variables")
         }

      if (mongoose.connection.readyState === 1) {
          return mongoose.connection
      }

      if (!connectionPromise) {
          connectionPromise = mongoose.connect(ENV.DB_URL)
      }

      const conn = await connectionPromise
      console.log("connected to MongoDB :" , conn.connection.host )
      return conn.connection
    }
    catch(error){
          connectionPromise = null;
          console.error("Error connection to MongoDB" , error);
          process.exit(1);//0 succes ,1 means failure  
    }
}
