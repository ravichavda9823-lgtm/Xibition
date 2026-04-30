import axios from "axios";
import { LogoutwithoutNotification } from "./Logout";
import CheckToken from "./CheckToken";

let api = axios.create({
     baseURL:import.meta.env.VITE_API_URl
});

api.interceptors.request.use((config)=>{
    let token = CheckToken();
    config.headers.Authorization = `bearer ${token}`;
    return config;
});

api.interceptors.response.use(
    res => res,
    err => {
        if(err.response?.status === 401 || err.response?.status === 403){
            LogoutwithoutNotification()
        }
        return Promise.reject(err);
    }
)

export default api;