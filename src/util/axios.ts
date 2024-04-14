import axios, { AxiosInstance } from "axios";
import { BASE_URL } from "./api";
import Cookies from "js-cookie";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${Cookies.get("authToken")}`,
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => error?.response
);

export default axiosInstance;
