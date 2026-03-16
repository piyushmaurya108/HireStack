import {StreamChat} from  'stream-chat'
import {ENV}  from "./env.js"
import {StreamClient} from  "@stream-io/node-sdk"
const apiKey = ENV.STREAM_API_KEY ;
const apiSecret = ENV.STREAM_API_SECRET ;

if(!apiKey || !apiSecret){
     console.error("STREAM_api_KEY OR stream_api_secret is missing " );   
}
export const  streamClient    = new StreamClient(apiKey , apiSecret) ; // use for video calls 
export const chatClient = StreamChat.getInstance(apiKey,apiSecret);// for chst feature
 
export const upsertStreamUser = async (userData)=>{
    try{
        await chatClient.upsertUser(userData);
       console.log("stream user upsert successfully ", userData);
    }
    catch(error){
       console.error("Error  upserting  the strem user " ,error);
    }
};

export const deleteStreamUser = async (userId)=>{
    try{
        await chatClient.deleteUser(userId);
       console.log("stream user deleted successfully ", userId);
    }
    catch(error){
       console.error("Error  deleting  the strem user " ,error);
    }
};
  // todo addd another method to generated the toekn 
