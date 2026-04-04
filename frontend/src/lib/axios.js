import axios from "axios"

let tokenGetter = async () => null;

const axionInastance = axios.create({
    baseURL : import.meta.env.VITE_API_URL ,
    withCredentials:true
})

axionInastance.interceptors.request.use(async (config) => {
    const token = await tokenGetter()

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

export const setAxiosTokenGetter = (getter) => {
    tokenGetter = getter || (async () => null)
}

export default axionInastance ;
