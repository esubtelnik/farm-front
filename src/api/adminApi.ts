import { TokenResponse } from "@/types/responses/UserResponses";
import {
   AdminLoginRequest,
   ChangeOrderStatusRequest,
   ChangeProducerOverpriceRequest,
   ChangeProductOverpriceRequest,
   CreateRegistrationCourierCodeRequest,
   SaveProducerCodeRequest,
} from "@/types/requests/AdminRequests";
import {
   CouriersFromAdminResponse,
   CreateRegistrationCourierCodeResponse,
   OrdersFromAdminResponse,
   ProducersFromAdminResponse,
   SaveProducerCodeResponse,
} from "@/types/responses/AdminResponses";
import { ApiResponse } from "@/types/ApiResponse";
import { ApiClient } from "@/lib/apiClient";
import {
   CreateReadyBasketRequest,
   DeleteReadyBasketRequest,
   UpdateReadyBasketRequest,
} from "@/types/requests/ProductRequests";
import { UpdateProductResponse } from "@/types/responses/ProductResponses";

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

export const createReadyBasketApi = async (
   payload: CreateReadyBasketRequest,
   token?: string
): Promise<ApiResponse<string>> => {
   const formData = new FormData();

   formData.append("title", payload.title);
   formData.append("description", payload.description);
   formData.append("overprice", String(payload.overprice));
   formData.append("products", JSON.stringify(payload.products));
   formData.append("composition", payload.composition);
   formData.append("storageConditions", payload.storageConditions);
   formData.append("package", payload.package);
   formData.append("delivery", String(payload.delivery));

   if (payload.images && payload.images.length > 0) {
      payload.images.forEach((file) => {
         formData.append("images", file);
      });
   }

   return await ApiClient.post<FormData, ApiResponse<string>>(
      "/api/admin/basket/create",
      formData,
      token,
      {
         headers: {
            "Content-Type": "multipart/form-data",
         },
      }
   );
};

export const updateReadyBasketApi = async (
   payload: UpdateReadyBasketRequest,
   basketId: string,
   token?: string
): Promise<ApiResponse<UpdateProductResponse>> => {
   const formData = new FormData();

   Object.entries(payload).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
         switch (key) {
            case "products":
               formData.append("products", JSON.stringify(value));
               break;
            case "images":
               if (Array.isArray(value)) {
                  value.forEach((file) => formData.append("images", file));
               }
               break;
            default:
               formData.append(key, String(value));
               break;
         }
      }
   });

   return await ApiClient.patch<FormData, ApiResponse<UpdateProductResponse>>(
      "/api/admin/basket/update?basketId=" + basketId,
      formData,
      token,
      {
         headers: {
            "Content-Type": "multipart/form-data",
         },
      }
   );
};

export const DeleteReadyBasketApi = async (
   payload: DeleteReadyBasketRequest,
   token?: string
): Promise<ApiResponse<string>> => {
   return await ApiClient.delete<DeleteReadyBasketRequest, ApiResponse<string>>(
      "/api/admin/basket/delete",
      payload,
      token
   );
};

export const getOrdersFromAdminApi = async (
   token?: string
): Promise<ApiResponse<OrdersFromAdminResponse>> => {
   return await ApiClient.get<ApiResponse<OrdersFromAdminResponse>>(
      "/api/order/all",
      token
   );
};


export const closeOrderApi = async (
   payload: ChangeOrderStatusRequest,
   token?: string
): Promise<ApiResponse<string>> => {
   return await ApiClient.patch<
      ChangeOrderStatusRequest,
      ApiResponse<string>
   >("/api/order/status", payload, token);
};
