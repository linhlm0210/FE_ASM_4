import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
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
