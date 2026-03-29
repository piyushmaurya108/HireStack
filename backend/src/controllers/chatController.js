import { chatClient } from "../lib/stream.js";

export async function getStreamToken(req,res ){
     try {
         // use clerk id not mongidb for stream 
          // should match with the id i has on stream dashboard 
        const userId = req.user.clerkId;
        const token = chatClient.createToken(userId);

    res.status(200).json({
        token , 
        userId,
        userName : req.user.name ,
        userImage: req.user.profileImage 
        
     }) 

      } 
        catch(error){
        res.status(500).json({message: "Internal server Error "}) ;
     }
}
