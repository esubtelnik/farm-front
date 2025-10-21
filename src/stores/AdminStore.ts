"use client";
import { makeAutoObservable } from "mobx";
import {
   createRegistrationCourierCodeApi,
   getCouriersFromAdminApi,
   getProducersFromAdminApi,
   changeProducerOverpriceApi,
   saveProducerCodeApi,
   changeProductOverpriceApi,
   createReadyBasketApi,
   updateReadyBasketApi,
   DeleteReadyBasketApi
} from "@/api/adminApi";
import {
   CreateRegistrationCourierCodeRequest,
   SaveProducerCodeRequest,
   ChangeProducerOverpriceRequest,
   ChangeProductOverpriceRequest,
} from "@/types/requests/AdminRequests";
import { deleteCookie, getCookie } from "cookies-next/client";
import { fetchApi } from "@/lib/fetchApi";
import { ICourierFromAdmin, IProducerFromAdmin } from "@/types/entities/User";
import { ICountedProduct, IProductCard, IReadyBasket, IReadyBasketFromAdmin } from "@/types/entities/Product";
import {
   getAllReadyBasketsApi,
   getProductsByProducerIdApi,
   getReadyBasketByIdApi,
   searchOnlyProductsApi,
} from "@/api/productApi";
import { CreateReadyBasketRequest, DeleteReadyBasketRequest, UpdateReadyBasketRequest } from "@/types/requests/ProductRequests";
import { IDisplayCard } from "@/types/entities/Display";

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
      data?: IDisplayCard[];
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

   async getReadyBasketsFromAdmin(): Promise<{
      success: boolean;
      message?: string;
      data?: IReadyBasket[];
   }> {
      const token = getCookie("token")?.toString();
      const res = await fetchApi(getAllReadyBasketsApi(token));
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

   async createReadyBasket(
      payload: CreateReadyBasketRequest
   ): Promise<{ success: boolean; message?: string }> {
      const token = getCookie("token")?.toString();
      const res = await fetchApi(createReadyBasketApi(payload, token));
      if (res.success) {
         // await this.getAllReadyBaskets();
         return { success: true };
      } else {
         return { success: false, message: res.message };
      }
   }

   async updateReadyBasket(
      payload: UpdateReadyBasketRequest,
      basketId: string
   ): Promise<{ success: boolean; message?: string }> {
      const token = getCookie("token")?.toString();
      const res = await fetchApi(updateReadyBasketApi(payload, basketId, token));
      if (res.success) {
         // await this.getAllReadyBaskets();
         return { success: true };
      } else {
         return { success: false, message: res.message };
      }
   }


   async getReadyBasketById(id: string): Promise<{
      success: boolean;
      message?: string;
      data?: IReadyBasketFromAdmin;
   }> {
      const token = getCookie("token")?.toString();
      const basketRes = await fetchApi(getReadyBasketByIdApi({ id }, token));
      const basket: IReadyBasket = basketRes.data;

      // Получаем все продукты
      const productsRes = await fetchApi(searchOnlyProductsApi({}, token));
      const allProducts: IProductCard[] = productsRes.data;

      const countedProducts: ICountedProduct[] = basket.products.map(p => {
         const fullProduct = allProducts.find(prod => prod.id === p.id);

       
         if (!fullProduct) {
           throw new Error(`Продукт с id=${p.id} не найден в общем списке`);
         }
       
         return {
           ...fullProduct,
           amount: p.saleVolume / fullProduct.saleVolume,
           saleVolume: fullProduct.saleVolume,
           price: fullProduct.price,
         };
       });
 
       const readyBasketFromAdmin: IReadyBasketFromAdmin = {
         ...basket,
         products: countedProducts,
       };

       return { success: true, data: readyBasketFromAdmin };
   }


   async deleteReadyBasket(payload: DeleteReadyBasketRequest): Promise<{ success: boolean; message?: string }> {
      const token = getCookie("token")?.toString();
      const res = await fetchApi(DeleteReadyBasketApi(payload, token));
      if (res.success) {
         await this.getReadyBasketsFromAdmin();
         return { success: true };
      } else {
         return { success: false, message: res.message };
      }
   }


   async logout() {
      deleteCookie("token");
   }
}

const adminStore = new AdminStore();
export default adminStore;
