import axios from "axios";
import { CONFIG } from "@/common/constants/config";

const axiosInstance = axios.create({
  baseURL: CONFIG.BASE_URL,
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the bearer token from local storage or wherever you store it
    const token = localStorage.getItem("token");

    if (token) {
      // Add the bearer token to the headers
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle expired access token
    if (
      error.response.status === 401 &&
      error.response.data.message === "Unauthorized"
    ) {
      // Mutate refreshToken from pinia then replace token from localStorage and return axiosInstance(error.config);
    }

    // Handle any other errors that occur during the response
    return Promise.reject(error);
  }
);

export default axiosInstance;
export { axiosInstance as axios };
