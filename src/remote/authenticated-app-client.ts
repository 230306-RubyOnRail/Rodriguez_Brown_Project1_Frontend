import axios from "axios";
import { baseURL } from "./baseURL";

export const authenticatedAppClient = axios.create({
    baseURL: baseURL,
    headers: {
        'Accept': 'application/json'
    }
});

authenticatedAppClient.interceptors.request.use(
    (request) => {
        console.log("Hello")
        if(request.headers){
            request.headers['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`
        }

        return request;
    }
)