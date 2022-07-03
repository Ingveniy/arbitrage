import axios from "axios";
import { DEV_API, PRODUCTION_API } from "./const";

export const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === "development" ? DEV_API : PRODUCTION_API,
  headers: {
    "Content-Type": "application/json",
    timeout: 5000,
  },
});

export default axiosInstance;
