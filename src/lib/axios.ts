/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call, @typescript-eslint/prefer-promise-reject-errors */
import axios from "axios";
import { getAccessToken, setAccessToken } from "./token";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

// Add token to every request
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/login") &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;

      try {
        const res = await api.post("/auth/refresh");
        const newAccessToken = res.data.data.accessToken;

        setAccessToken(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch {
        console.log("Refresh failed");
      }
    }

    return Promise.reject(error);
  },
);

export default api;
