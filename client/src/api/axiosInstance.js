import axios from "axios";

export const axiosInstance = axios.create({
    baseUrl: import.meta.env.VITE_SERVER_URL,
    withCredential: true,
})