import { IReview } from "@/types/entities/Review";
import { IProducerCard } from "@/types/entities/User";
import {
  AddPhotoRequest,
  AddProducerReviewRequest,
  DeletePhotoRequest,
  GetProducerByIdRequest,
} from "@/types/requests/ProducerRequests";
import { ProducerUpdateRequest } from "@/types/requests/UserRequests";
import {
  ProducerCertificatesResponse,
  ProducerGalleryResponse,
  ProducerByIdResponse,
} from "@/types/responses/ProducerResponses";
import { ProducerResponse } from "@/types/responses/UserResponses";
import { ApiClient } from "@/lib/apiClient";
import { ApiResponse } from "@/types/ApiResponse";

export const getAllProducersApi = async (
  token?: string
): Promise<ApiResponse<IProducerCard[]>> => {
  return await ApiClient.get<ApiResponse<IProducerCard[]>>(
    "/api/producer/all",
    token
  );
};

export const getProducerApi = async (
  token?: string
): Promise<ApiResponse<ProducerResponse>> => {
  return await ApiClient.get<ApiResponse<ProducerResponse>>("/api/producer", token);
};

export const getProducerByIdApi = async (
  payload: GetProducerByIdRequest,
  token?: string
): Promise<ApiResponse<ProducerByIdResponse>> => {
  return await ApiClient.get<ApiResponse<ProducerByIdResponse>>(
    `/api/producer/${payload.producerId}`,
    token
  );
};

export const updateProducerApi = async (
  payload: ProducerUpdateRequest,
  token?: string
): Promise<ApiResponse<ProducerResponse>> => {
  console.log("payload", payload);
  return await ApiClient.patch<
    ProducerUpdateRequest,
    ApiResponse<ProducerResponse>
  >(
    "/api/producer/update",
    payload,
    token,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const getProducerGalleryApi = async (
  token?: string
): Promise<ApiResponse<ProducerGalleryResponse>> => {
  return await ApiClient.get<ApiResponse<ProducerGalleryResponse>>(
    "/api/producer/gallery/get",
    token
  );
};

export const getProducerCertificatesApi = async (
  token?: string
): Promise<ApiResponse<ProducerCertificatesResponse>> => {
  return await ApiClient.get<ApiResponse<ProducerCertificatesResponse>>(
    "/api/producer/certificate/get",
    token
  );
};

export const addGalleryApi = async (
  payload: AddPhotoRequest,
  token?: string
): Promise<ApiResponse<ProducerGalleryResponse>> => {
  return await ApiClient.post<
    AddPhotoRequest,
    ApiResponse<ProducerGalleryResponse>
  >(
    "/api/producer/gallery/add",
    payload,
    token,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const addCertificateApi = async (
  payload: AddPhotoRequest,
  token?: string
): Promise<ApiResponse<ProducerCertificatesResponse>> => {
  return await ApiClient.post<
    AddPhotoRequest,
    ApiResponse<ProducerCertificatesResponse>
  >(
    "/api/producer/certificate/add",
    payload,
    token,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const deleteGalleryApi = async (
  payload: DeletePhotoRequest,
  token?: string
): Promise<ApiResponse<ProducerGalleryResponse>> => {
  return await ApiClient.delete<
    DeletePhotoRequest,
    ApiResponse<ProducerGalleryResponse>
  >(
    "/api/producer/gallery/delete",
    payload,
    token
  );
};

export const deleteCertificateApi = async (
  payload: DeletePhotoRequest,
  token?: string
): Promise<ApiResponse<ProducerCertificatesResponse>> => {
  return await ApiClient.delete<
    DeletePhotoRequest,
    ApiResponse<ProducerCertificatesResponse>
  >(
    "/api/producer/certificate/delete",
    payload,
    token
  );
};

export const addProducerReviewApi = async (
  payload: AddProducerReviewRequest,
  token?: string
): Promise<ApiResponse<IReview>> => {
  return await ApiClient.post<AddProducerReviewRequest, ApiResponse<IReview>>(
    "/api/producer/feedback",
    payload,
    token
  );
};
