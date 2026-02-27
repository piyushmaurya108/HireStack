import {StreamChat} from  'stream-chat'
import {ENV}  from "./env.js"

const apiKey = ENV.STREAM_API_KEY ;
const apiSecret = ENV.STREAM_API_SECRET ;

if(!apiKey || !apiSecret){
     console.error("STREAM_api_KEY OR stream_api_secret is missing " );   
}

export const chatClient = StreamChat.getInstance(apiKey,apiSecret);
 
export const upsertStreamUser = async (userData)=>{
    try{
        await chatClient.upsertUser(userData);
       console.log("stream user upsert successfully ", userData);
    }
    catch(error){
       console.error("Error  upserting  the strem user " ,error);
    }
};

export const deleteStreamUser = async (userData)=>{
    try{
        await chatClient.upsertUser(userData);
       console.log("stream user upsert successfully ", userData);
    }
    catch(error){
       console.error("Error  upserting  the strem user " ,error);
    }
};
  // todo addd another method to generated the toekn 