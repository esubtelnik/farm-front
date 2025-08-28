"use client";
import { makeAutoObservable } from "mobx";
import {
   createRegistrationCourierCodeApi,
   getCouriersFromAdminApi,
   getProducersFromAdminApi,
   changeProducerOverpriceApi,
   saveProducerCodeApi,
   changeProductOverpriceApi,
} from "@/api/adminApi";
import {
   CreateRegistrationCourierCodeRequest,
   SaveProducerCodeRequest,
   ChangeProducerOverpriceRequest,
   ChangeProductOverpriceRequest,
} from "@/types/requests/AdminRequests";
import { getCookie } from "cookies-next/client";
import { fetchApi } from "@/lib/fetchApi";
import { ICourierFromAdmin, IProducerFromAdmin } from "@/types/entities/User";
import { IProductCard } from "@/types/entities/Product";
import { getProductsByProducerIdApi } from "@/api/productApi";

class AdminStore {
   constructor() {
      makeAutoObservable(this);
   }

   async saveProducerCode(
      payload: SaveProducerCodeRequest
   ): Promise<{ success: boolean; message?: string }> {
      const token = getCookie("token")?.toString();
      const res = await fetchApi(saveProducerCodeApi(payload, token));
      if (res.success) {
         return { success: true };
      }
      return { success: false, message: res.message };
   }

   async createRegistrationCourierCode(
      payload: CreateRegistrationCourierCodeRequest
   ): Promise<{ success: boolean; message?: string }> {
      const token = getCookie("token")?.toString();
      const res = await fetchApi(
         createRegistrationCourierCodeApi(payload, token)
      );
      if (res.success) {
         return { success: true };
      }
      return { success: false, message: res.message };
   }

   async getProducersFromAdmin(): Promise<{
      success: boolean;
      message?: string;
      data?: IProducerFromAdmin[];
   }> {
      const token = getCookie("token")?.toString();
      const res = await fetchApi(getProducersFromAdminApi(token));
      if (res.success) {
         return { success: true, data: res.data };
      }
      return { success: false, message: res.message };
   }

   async getProductsFromAdmin(producerId: string): Promise<{
      success: boolean;
      message?: string;
      data?: IProductCard[];
   }> {
      const token = getCookie("token")?.toString();
      const res = await fetchApi(
         getProductsByProducerIdApi({ producerId: producerId }, token)
      );
      if (res.success) {
         return { success: true, data: res.data };
      }
      return { success: false, message: res.message };
   }

   async getCouriersFromAdmin(): Promise<{
      success: boolean;
      message?: string;
      data?: ICourierFromAdmin[];
   }> {
      const token = getCookie("token")?.toString();
      const res = await fetchApi(getCouriersFromAdminApi(token));
      if (res.success) {
         return { success: true, data: res.data };
      }
      return { success: false, message: res.message };
   }

   async changeProducerOverprice(
      payload: ChangeProducerOverpriceRequest
   ): Promise<{ success: boolean; message?: string }> {
      const token = getCookie("token")?.toString();
      const res = await fetchApi(changeProducerOverpriceApi(payload, token));
      if (res.success) {
         return { success: true };
      }
      return { success: false, message: res.message };
   }

   
   async changeProductOverprice(
    payload: ChangeProductOverpriceRequest
 ): Promise<{ success: boolean; message?: string }> {
    const token = getCookie("token")?.toString();
    const res = await fetchApi(changeProductOverpriceApi(payload, token));
    if (res.success) {
       return { success: true };
    }
    return { success: false, message: res.message };
 }
}

const adminStore = new AdminStore();
export default adminStore;
