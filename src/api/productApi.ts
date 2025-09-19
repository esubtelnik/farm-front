import { ICategory, IProduct, IProductCard } from "@/types/entities/Product";
import { IReview } from "@/types/entities/Review";
import {
   CreateProductRequest,
   GetProductByIdRequest,
   GetProductsByProducerIdRequest,
   SearchProductsRequest,
   AddReviewRequest,
   GetCategoryByTitleRequest,
   UpdateProductRequest,
   DeleteProductRequest,
} from "@/types/requests/ProductRequests";
import {
   CreateProductResponse,
   UpdateProductResponse,
} from "@/types/responses/ProductResponses";
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
   const formData = new FormData();

   formData.append("title", payload.title);
   formData.append("price", String(payload.price));
   formData.append("productType", payload.productType);
   formData.append("description", payload.description);
   formData.append("composition", payload.composition);
   formData.append("storageConditions", payload.storageConditions);
   formData.append("package", payload.package);
   formData.append("expirationDate", String(payload.expirationDate));
   formData.append("volume", String(payload.volume));
   formData.append("saleVolume", String(payload.saleVolume));
   formData.append("unit", payload.unit);
   formData.append("delivery", String(payload.delivery));

   if (payload.images && payload.images.length > 0) {
      payload.images.forEach((file) => {
         formData.append("images", file);
      });
   }

   return await ApiClient.post<FormData, ApiResponse<CreateProductResponse>>(
      "/api/product/create",
      formData,
      token,
      {
         headers: {
            "Content-Type": "multipart/form-data",
         },
      }
   );
};

export const deleteProductApi = async (
   payload: DeleteProductRequest,
   token?: string
): Promise<ApiResponse<string>> => {
   return await ApiClient.delete<DeleteProductRequest, ApiResponse<string>>(
      "/api/product",
      payload,
      token
   );
};

export const updateProductApi = async (
   payload: UpdateProductRequest,
   productId: string,
   token?: string
): Promise<ApiResponse<UpdateProductResponse>> => {
   const formData = new FormData();

   Object.entries(payload).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
         if (key === "images" && Array.isArray(value)) {
            value.forEach((file) => formData.append("images", file));
         } else {
            formData.append(key, String(value));
         }
      }
   });

   return await ApiClient.patch<FormData, ApiResponse<UpdateProductResponse>>(
      "/api/product/update?productId=" + productId,
      formData,
      token,
      {
         headers: {
            "Content-Type": "multipart/form-data",
         },
      }
   );
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
