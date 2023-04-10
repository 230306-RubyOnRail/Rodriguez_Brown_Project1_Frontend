import axios from "axios";

export const authenticatedAppClient = axios.create({
    baseURL: 'http://localhost:3000',
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