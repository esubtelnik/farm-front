import {
   CustomerCartResponse,
   CustomerFavouritesResponse,
   OrdersResponse,
} from "@/types/responses/CustomerResponses";
import {
   AddToCartRequest,
   AddToFavouritesRequest,
   RemoveFromCartRequest,
   RemoveFromFavouritesRequest,
} from "@/types/requests/CustomerRequests";
import { CustomerResponse } from "@/types/responses/UserResponses";
import { ApiClient } from "@/lib/apiClient";
import { ApiResponse } from "@/types/ApiResponse";
import { IProductCard } from "@/types/entities/Product";
import { OrdersFromAdminResponse } from "@/types/responses/AdminResponses";

export const getCustomerApi = async (
   token?: string
): Promise<ApiResponse<CustomerResponse>> => {
   return await ApiClient.get<ApiResponse<CustomerResponse>>(
      "/api/customer",
      token
   );
};

export const getCustomerFavouritesApi = async (
   token?: string
): Promise<ApiResponse<CustomerFavouritesResponse>> => {
   return await ApiClient.get<ApiResponse<CustomerFavouritesResponse>>(
      "/api/customer/favourites",
      token
   );
};

export const getCustomerCartApi = async (
   token?: string
): Promise<ApiResponse<CustomerCartResponse>> => {
   return await ApiClient.get<ApiResponse<CustomerCartResponse>>(
      "/api/customer/cart",
      token
   );
};

export const addToFavouritesApi = async (
   payload: AddToFavouritesRequest,
   token?: string
): Promise<ApiResponse<IProductCard[]>> => {
   return await ApiClient.post<
      AddToFavouritesRequest,
      ApiResponse<IProductCard[]>
   >("/api/customer/favourites/add", payload, token);
};

export const removeFromFavouritesApi = async (
   payload: RemoveFromFavouritesRequest,
   token?: string
): Promise<ApiResponse<IProductCard[]>> => {
   return await ApiClient.delete<
      RemoveFromFavouritesRequest,
      ApiResponse<IProductCard[]>
   >("/api/customer/favourites/one", payload, token);
};

export const addToCartApi = async (
   payload: AddToCartRequest,
   token?: string
): Promise<ApiResponse<IProductCard[]>> => {
   return await ApiClient.post<AddToCartRequest, ApiResponse<IProductCard[]>>(
      "/api/customer/cart/add",
      payload,
      token
   );
};

export const removeFromCartApi = async (
   payload: RemoveFromCartRequest,
   token?: string
): Promise<ApiResponse<IProductCard[]>> => {
   return await ApiClient.delete<
      RemoveFromCartRequest,
      ApiResponse<IProductCard[]>
   >("/api/customer/cart/one", payload, token);
};

export const removeAllFromCartApi = async (
   token?: string
): Promise<ApiResponse<IProductCard[]>> => {
   return await ApiClient.delete<void, ApiResponse<IProductCard[]>>(
      "/api/customer/cart/all",
      undefined,
      token
   );
};

export const getUncompletedOrders = async (
   token?: string
): Promise<ApiResponse<OrdersResponse>> => {
   return await ApiClient.get<ApiResponse<OrdersResponse>>(
      "/api/order/uncompleted",
      token
   );
};

export const getCompletedOrders = async (
   token?: string
): Promise<ApiResponse<OrdersResponse>> => {
   return await ApiClient.get<ApiResponse<OrdersResponse>>(
      "/api/order/completed",
      token
   );
};
