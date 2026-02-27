
import { clerkMiddleware, clerkClient, requireAuth, getAuth } from '@clerk/express'
import User from '../models/User.js'
export const portectRoute = [
    requireAuth(), // This middleware ensures that the user is authenticated
    async (req, res, next) => {
        try {
           const clerkId = req.auth().userId;
           if(!clerkId) return res.status(401).json({msg:"unauthorized user - invalid token "})
           const user  = await User.findOne({clerkId});
       if(!user ) return res.status(404).json({msg:"User not found "})
         // attach user  to request ;
         res.user = user ;
        next();
        } catch (error) {
            console.log("error in portectRoute middelware",error);
             res.status(500).json({message:"Interal server error "});
        }
    }   
]