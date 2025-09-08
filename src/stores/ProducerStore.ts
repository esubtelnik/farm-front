import { makeAutoObservable, runInAction } from "mobx";
import {
   addGalleryApi,
   addCertificateApi,
   getProducerApi,
   getProducerCertificatesApi,
   getProducerGalleryApi,
   updateProducerApi,
   deleteGalleryApi,
   deleteCertificateApi,
} from "@/api/producerApi";
import { IProducer } from "@/types/entities/User";
import { IProductCard } from "@/types/entities/Product";
import { ProducerUpdateRequest } from "@/types/requests/UserRequests";
import { CreateProductRequest, UpdateProductRequest } from "@/types/requests/ProductRequests";
import { createProductApi, getProductsByProducerIdApi, updateProductApi } from "@/api/productApi";
import { getCookie, deleteCookie } from "cookies-next";
import { fetchApi } from "@/lib/fetchApi";

class ProducerStore {
   profile: IProducer | null = null;
   gallery: string[] = [];
   certificates: string[] = [];
   products: IProductCard[] = [];

   constructor() {
      makeAutoObservable(this);
   }

   async fetchProducerData() {
      try {
         const token = getCookie("token")?.toString();
         const res = await fetchApi(getProducerApi(token));

         if (res.success) {
            runInAction(() => {
               this.profile = res.data;
            });
         }
      } catch (e) {
         console.error("Ошибка получения данных покупателя", e);
      }
   }

   async updateProducer(
      data: ProducerUpdateRequest
   ): Promise<{ success: boolean; message?: string }> {
      try {
         console.log("data", data);
         const token = getCookie("token")?.toString();
         const response = await fetchApi(updateProducerApi(data, token));
         if (response.success) {
            console.log("Успешно!", response.data);

            runInAction(() => {
               this.profile = response.data;
            });

            return { success: true };
         } else {
                console.log("Ошибка:", response.message);
            return { success: false, message: response.message };
         }
      } catch (error) {
         console.error("Ошибка при выполнении запроса:", error);
         return { success: false, message: "Ошибка сети или сервера" };
      }
   }

   async fetchProducerGallery() {
      const token = getCookie("token")?.toString();
      const res = await fetchApi(getProducerGalleryApi(token));
      if (res.success) {
         runInAction(() => {
            this.gallery = res.data?.images ?? [];
         });
      }
   }

   async addGallery(image: File) {
      const token = getCookie("token")?.toString();
      const res = await fetchApi(addGalleryApi({ image }, token));
      if (res.success) {
         runInAction(() => {
            this.gallery = res.data?.images ?? []  ;
         });
      }
   }

   async deleteGallery(imagePath: string) {
      const token = getCookie("token")?.toString();
      const res = await fetchApi(deleteGalleryApi({ imagePath }, token));
      if (res.success) {
         runInAction(() => {
            this.gallery = res.data?.images ?? []  ;
         });
      }
   }

   async fetchProducerCertificates() {
      const token = getCookie("token")?.toString();
      const res = await fetchApi(getProducerCertificatesApi(token));
      if (res.success) {
         runInAction(() => {
           this.certificates = res.data?.images ?? [];
         });
      }
   }

   async addCertificate(image: File) {
      const token = getCookie("token")?.toString();
      const res = await fetchApi(addCertificateApi({ image }, token));
      if (res.success) {
         runInAction(() => {
           this.certificates = res.data?.images ?? [];
         });
      }
   }

   async deleteCertificate(imagePath: string) {
      const token = getCookie("token")?.toString();
      const res = await fetchApi(deleteCertificateApi({ imagePath }, token));
      if (res.success) {
         runInAction(() => {
           this.certificates = res.data?.images ?? [];
         });
      }
   }

   async createProduct(payload: CreateProductRequest): Promise<{ success: boolean; message?: string }> {
      const token = getCookie("token")?.toString();
      const res = await fetchApi(createProductApi(payload, token));
      if (res.success) {
         await this.getProductsByProducerId();
         return { success: true };
      } else {
         return { success: false, message: res.message };
      }
   }

   async updateProduct(payload: UpdateProductRequest, productId: string): Promise<{ success: boolean; message?: string }> {
      const token = getCookie("token")?.toString();
      const res = await fetchApi(updateProductApi(payload, productId, token));
      if (res.success) {
         await this.getProductsByProducerId();
         return { success: true };
      } else {
         return { success: false, message: res.message };
      }
   }

   async getProductsByProducerId() {
      if (!this.profile) return;
      const token = getCookie("token")?.toString();
      const res = await fetchApi(getProductsByProducerIdApi({ producerId: this.profile.id}, token));
      if (res.success) {
         runInAction(() => {
            this.products = res.data ?? [];
         });
      }
   }

   async logout() {
      deleteCookie("token");
      this.profile = null;
      this.gallery = [];
      this.certificates = [];
      this.products = [];
   }
}

const producerStore = new ProducerStore();
export default producerStore;
