import axios from "axios"
const axionInastance = axios.create({

    baseURL : import.meta.env.VITE_API_URL ,
    withCredentials:true // browser will send the cookites
    //  to server automatically on  every singel req  
})

export default axionInastance ;