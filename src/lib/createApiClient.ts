// lib/apiClient.ts
import axios, { AxiosInstance } from "axios";


export function createApiClient(token?: string): AxiosInstance {
  const instance = axios.create({
    baseURL:  process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    withCredentials: !!token,
  });

  // instance.interceptors.request.use((config) => {
  //   if (token) {
  //     config.headers = config.headers ?? {};
  //     config.headers.Authorization = `Bearer ${token}`;
  //   }
  //   return config;
  // });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error("API error:", error?.response?.data || error.message);
      return Promise.reject(error);
    }
  );

  return instance;
}

