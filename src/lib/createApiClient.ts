// lib/apiClient.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
//
const BASE_URL ="https://tim1423-farm-bascket.hf.space";

export function createApiClient(token?: string): AxiosInstance {
  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    withCredentials: true,
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

