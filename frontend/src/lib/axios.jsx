import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.MODE === "development" ? "https://talksyapp.onrender.com" : "https://backend-ashy-one-63.vercel.app/api");

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // send cookies with the request
});
