import { Inngest } from "inngest";

import User from "../models/User.js"
import {connectDB} from './db.js'

// Create a client to send and receive events
export const inngest = new Inngest({ id: "HireStack" });

 const syncUser = inngest.createFunction(
    {id:"sync-user"},
    {event: "clerk/user.created"},
    async({event})=>{
        await connectDB();
         const {id,email_addresses, first_name ,last_name ,images_url } = event.data
           const newUser ={
            clerkID:id ,
            email: email_addresses[0]?.email_addresses , 
            name: `${first_name|| ""} ${last_name || ""} `,
            profileImage: images_url 
             
           }
              await User.create(newUser);
            }
 )

const deleteUserFromDB = inngest.createFunction(
    {id:"delete-user-from-db"},
    {event: "clerk/user.deleted"},
    async({event})=>{
        await connectDB();
         const {id} = event.data;
                await User.deleteOne({clerkID:id});
            } 
             // todo: do sth else  
 );


 export const functions = [syncUser,deleteUserFromDB]