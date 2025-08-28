import { TokenResponse } from "@/types/responses/UserResponses";
import {
   AdminLoginRequest,
   ChangeProducerOverpriceRequest,
   ChangeProductOverpriceRequest,
   CreateRegistrationCourierCodeRequest,
   SaveProducerCodeRequest,
} from "@/types/requests/AdminRequests";
import {
   CouriersFromAdminResponse,
   CreateRegistrationCourierCodeResponse,
   ProducersFromAdminResponse,
   SaveProducerCodeResponse,
} from "@/types/responses/AdminResponses";
import { ApiResponse } from "@/types/ApiResponse";
import { ApiClient } from "@/lib/apiClient";

export const loginAdminApi = async (
   payload: AdminLoginRequest,
   token?: string
): Promise<ApiResponse<TokenResponse>> => {
   return await ApiClient.post<AdminLoginRequest, ApiResponse<TokenResponse>>(
      "/api/admin/login",
      payload,
      token
   );
};

export const saveProducerCodeApi = async (
   payload: SaveProducerCodeRequest,
   token?: string
): Promise<ApiResponse<SaveProducerCodeResponse>> => {
   return await ApiClient.post<
      SaveProducerCodeRequest,
      ApiResponse<SaveProducerCodeResponse>
   >("/api/admin/code/producer", payload, token);
};

export const createRegistrationCourierCodeApi = async (
   payload: CreateRegistrationCourierCodeRequest,
   token?: string
): Promise<ApiResponse<CreateRegistrationCourierCodeResponse>> => {
   return await ApiClient.post<
      CreateRegistrationCourierCodeRequest,
      ApiResponse<CreateRegistrationCourierCodeResponse>
   >("/api/admin/code/courier", payload, token);
};

export const getProducersFromAdminApi = async (
   token?: string
): Promise<ApiResponse<ProducersFromAdminResponse>> => {
   return await ApiClient.get<ApiResponse<ProducersFromAdminResponse>>(
      "/api/admin/producers",
      token
   );
};

export const getCouriersFromAdminApi = async (
   token?: string
): Promise<ApiResponse<CouriersFromAdminResponse>> => {
   return await ApiClient.get<ApiResponse<CouriersFromAdminResponse>>(
      "/api/admin/couriers",
      token
   );
};

export const changeProducerOverpriceApi = async (
   payload: ChangeProducerOverpriceRequest,
   token?: string
): Promise<ApiResponse<string>> => {
   return await ApiClient.patch<
      ChangeProducerOverpriceRequest,
      ApiResponse<string>
   >("/api/admin/overprice", payload, token);
};

export const changeProductOverpriceApi = async (
   payload: ChangeProductOverpriceRequest,
   token?: string
): Promise<ApiResponse<string>> => {
   return await ApiClient.patch<
      ChangeProductOverpriceRequest,
      ApiResponse<string>
   >("/api/admin/overprice/product", payload, token);
};
