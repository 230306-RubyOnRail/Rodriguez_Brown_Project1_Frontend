import axios from "axios";
import { baseURL } from "./baseURL";

export const appClient = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
});