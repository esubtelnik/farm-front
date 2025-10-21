import { makeAutoObservable, runInAction } from "mobx";
import { ICourier } from "@/types/entities/User";
import { CourierUpdateRequest } from "@/types/requests/UserRequests";
import { getCourierApi, updateCourierApi } from "@/api/courierApi";
import { getCookie, deleteCookie } from "cookies-next";
import { fetchApi } from "@/lib/fetchApi";

class CourierStore {
   profile: ICourier | null = null;

   constructor() {
      makeAutoObservable(this);
   }

   async fetchCourierData() {
      try {
         const token = getCookie("token")?.toString();
         const res = await fetchApi(getCourierApi(token));

         if (res.success) {
            runInAction(() => {
               this.profile = res.data;
            });
         }
      } catch (e) {
         console.error("Ошибка получения данных покупателя", e);
      }
   }

   async updateCourier(
      data: CourierUpdateRequest
   ): Promise<{ success: boolean; message?: string }> {
      try {
         const token = getCookie("token")?.toString();
         const response = await fetchApi(updateCourierApi(data, token));
         if (response.success) {
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

   async logout() {
    deleteCookie("token");
    this.profile = null;

 }
}

const courierStore = new CourierStore();
export default courierStore;
