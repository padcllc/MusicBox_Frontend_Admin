import axios from "axios";
export const api = axios.create({
  baseURL: import.meta.env.VITE_URL,
  headers: {
    "Content-Type": "Application/json",
  },
});
api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("accessToken");
  if (
    token &&
    (!config.headers.non_auth || config.headers.non_auth === "false")
  ) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  delete config.headers.non_auth;
  return config;
});