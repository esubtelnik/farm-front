import { ICategory, IProduct, IProductCard } from "@/types/entities/Product";
import { IReview } from "@/types/entities/Review";
import {
   CreateProductRequest,
   GetProductByIdRequest,
   GetProductsByProducerIdRequest,
   SearchProductsRequest,
   AddReviewRequest,
   GetCategoryByTitleRequest,
} from "@/types/requests/ProductRequests";
import { CreateProductResponse } from "@/types/responses/ProductResponses";
import { ApiClient } from "@/lib/apiClient";
import { ApiResponse } from "@/types/ApiResponse";

export const getCategoriesApi = async (
   token?: string
): Promise<ApiResponse<ICategory[]>> => {
   return await ApiClient.get<ApiResponse<ICategory[]>>(
      "/api/categories",
      token
   );
};

export const getCategoryByTitleApi = async (
   payload: GetCategoryByTitleRequest,
   token?: string
): Promise<ApiResponse<ICategory>> => {
   return await ApiClient.get<ApiResponse<ICategory>>(
      "/api/categories/category?title=" + payload.title,
      token
   );
};

export const createProductApi = async (
   payload: CreateProductRequest,
   token?: string
): Promise<ApiResponse<CreateProductResponse>> => {
   return await ApiClient.post<
      CreateProductRequest,
      ApiResponse<CreateProductResponse>
   >("/api/product/create", payload, token, {
      headers: {
         "Content-Type": "multipart/form-data",
      },
   });
};

export const getProductsByProducerIdApi = async (
   payload: GetProductsByProducerIdRequest,
   token?: string
): Promise<ApiResponse<IProductCard[]>> => {
   return await ApiClient.get<ApiResponse<IProductCard[]>>(
      `/api/product/producer/${payload.producerId}`,
      token
   );
};

export const getProductByIdApi = async (
   data: GetProductByIdRequest,
   token?: string
): Promise<ApiResponse<IProduct>> => {
   return await ApiClient.get<ApiResponse<IProduct>>(
      `/api/product/${data.productId}`,
      token,
      { params: data }
   );
};

export const searchProductsApi = async (
   payload: SearchProductsRequest,
   token?: string
): Promise<ApiResponse<IProductCard[]>> => {
   return await ApiClient.post<
      SearchProductsRequest,
      ApiResponse<IProductCard[]>
   >("/api/product/search", payload, token);
};

export const addReviewApi = async (
   payload: AddReviewRequest,
   token?: string
): Promise<ApiResponse<IReview>> => {
   return await ApiClient.post<AddReviewRequest, ApiResponse<IReview>>(
      "/api/product/feedback",
      payload,
      token
   );
};
