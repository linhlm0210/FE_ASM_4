import axios from "axios";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const api = axios.create({
  baseURL: BACKEND_URL,
});

// Thêm token vào header của mọi request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
