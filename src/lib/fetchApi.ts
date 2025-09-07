import { ApiResult } from "@/types/ApiResult";
import { ApiResponse } from "@/types/ApiResponse";
import axios from "axios";

export async function fetchApi<T>(
  apiCall: Promise<ApiResponse<T>>
): Promise<ApiResult<T>> {
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

    if (axios.isAxiosError(error)) {
      const serverMessage =
        error.response?.data?.error?.message ||
        error.response?.data?.message ||
        error.message;

      return {
        success: false,
        data: [] as T,
        message: serverMessage,
      };
    }


    return {
      success: false,
      data: [] as T,
      message: "Неизвестная ошибка сети или сервера",
    };
  }
}