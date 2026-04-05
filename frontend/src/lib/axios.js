// import axios from "axios"
// const axionInastance = axios.create({

//     baseURL : import.meta.env.VITE_API_URL ,
//     withCredentials:true // browser will send the cookites
//     //  to server automatically on  every singel req  
// })

// export default axionInastance ;
import axios from "axios"
const axionInastance = axios.create({
    baseURL : import.meta.env.VITE_API_URL ,
    withCredentials:true // browser will send the cookies
})

axionInastance.interceptors.request.use(async (config) => {
    // Dynamically inject the Clerk token for cross-origin authentication
    if (window.Clerk?.session) {
        const token = await window.Clerk.session.getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
}, (error) => Promise.reject(error));

export default axionInastance ;