import { chatClient } from "../lib/stream.js";

export async function getStreamToken(res,req ){
     try {
         // use clerk id not mongidb for stream 
          // should match with the id i has on stream dashboard 
        const token = chatClient.createToken(req.user.clerkId)   

    res.status(200).json({
        token , 
        userid: req.user.clerkId,
        userName : req.user.name ,
        userImage: req.user.image 
        
     }) 

      } 
        catch(error){
        res.status(500).json({message: "Internal server Error "}) ;
     }
}