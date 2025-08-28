import { CourierResponse } from "@/types/responses/UserResponses";
import { CourierUpdateRequest } from "@/types/requests/UserRequests";
import { ApiClient } from "@/lib/apiClient";
import { ApiResponse } from "@/types/ApiResponse";

export const getCourierApi = async (
   token?: string
): Promise<ApiResponse<CourierResponse>> => {
   return await ApiClient.get<ApiResponse<CourierResponse>>("/api/courier", token);
};

export const updateCourierApi = async (
   payload: CourierUpdateRequest,
   token?: string
): Promise<ApiResponse<CourierResponse>> => {
   return await ApiClient.patch<
      CourierUpdateRequest,
      ApiResponse<CourierResponse>
   >("/api/courier/update", payload, token);
};
