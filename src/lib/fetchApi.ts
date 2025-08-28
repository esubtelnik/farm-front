import { ApiResult } from "@/types/ApiResult";
import { ApiResponse } from "@/types/ApiResponse";


export async function fetchApi<T>(apiCall: Promise<ApiResponse<T>>): Promise<ApiResult<T>> {
  
    try {
      const res = await apiCall;
  
      if (res.successful) {
        return {
          success: true,
          data: res.data,
        };
      } else {
        return {
          success: false,
          data: [] as T,
          message: res.error.message,
        };
      }
    } catch (error: unknown) {
      return {
        success: false,
        data: [] as T,
        message: error instanceof Error ? error.message : "Network error",
      };
    }
  }