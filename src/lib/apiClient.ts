import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { createApiClient } from './createApiClient';

export const ApiClient = {
  get: async <T>(url: string, token?: string, config?: AxiosRequestConfig): Promise<T> => {
    const api = createApiClient(token);
    const response: AxiosResponse<T> = await api.get(url, config);
    return response.data;
  },

  post: async <TReq, TRes>(url: string, data: TReq, token?: string, config?: AxiosRequestConfig): Promise<TRes> => {
    const api = createApiClient(token);
    const response: AxiosResponse<TRes> = await api.post(url, data, config);
    return response.data;
  },

  put: async <TReq, TRes>(url: string, data: TReq, token?: string, config?: AxiosRequestConfig): Promise<TRes> => {
    const api = createApiClient(token);
    const response: AxiosResponse<TRes> = await api.put(url, data, config);
    return response.data;
  },

  patch: async <TReq, TRes>(url: string, data: TReq, token?: string, config?: AxiosRequestConfig): Promise<TRes> => {
    const api = createApiClient(token);
    const response: AxiosResponse<TRes> = await api.patch(url, data, config);
    return response.data;
  },

  delete: async <TReq, TRes>(url: string, data?: TReq, token?: string, config?: AxiosRequestConfig): Promise<TRes> => {
    const api = createApiClient(token);
    const response: AxiosResponse<TRes> = await api.delete(url, { data, ...config });
    return response.data;
  },
};

export default ApiClient;

