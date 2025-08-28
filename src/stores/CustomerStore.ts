"use client";
import { makeAutoObservable, runInAction } from "mobx";
import {
   getCustomerApi,
   getCustomerCartApi,
   getCustomerFavouritesApi,
} from "@/api/customerApi";
import {
   addToCartApi,
   removeFromCartApi,
   addToFavouritesApi,
   removeFromFavouritesApi,
   removeAllFromCartApi,
} from "@/api/customerApi";
import { updateCustomerApi } from "@/api/userApi";

import { ICustomer } from "@/types/entities/User";
import { IProductCard } from "@/types/entities/Product";
import {
   AddToCartRequest,
   RemoveFromCartRequest,
   AddToFavouritesRequest,
   RemoveFromFavouritesRequest,
} from "@/types/requests/ProductRequests";
import { CustomerUpdateRequest } from "@/types/requests/UserRequests";
import { getCookie, deleteCookie } from "cookies-next";
import { fetchApi } from "@/lib/fetchApi";


class CustomerStore {
   profile: ICustomer | null = null;
   favourites: IProductCard[] = [];
   cart: IProductCard[] = [];

   constructor() {
      makeAutoObservable(this);
   }

   async fetchCustomerData() {
      try {
         const token = getCookie("token")?.toString();
         const res = await fetchApi(getCustomerApi(token));
         if (res.success) {
            runInAction(() => {
               this.profile = res.data;
            });
         }
      } catch (e) {
         console.error("Ошибка получения данных покупателя", e);
      }
   }

   async fetchCustomerCart() {
      try {
         const token = getCookie("token")?.toString();
         const res = await fetchApi(getCustomerCartApi(token));
         if (res.success) {
            runInAction(() => {
               this.cart = res.data.products;
            });
         }
      } catch (e) {
         console.error("Ошибка получения корзины", e);
      }
   }

   async fetchCustomerFavourites() {
      try {
         const token = getCookie("token")?.toString();
         const res = await fetchApi(getCustomerFavouritesApi(token));
         if (res.success) {
            runInAction(() => {
               this.favourites = res.data.products;
            });
         }
      } catch (e) {
         console.error("Ошибка получения избранного", e);
      }
   }

   async addToFavourites(
      product: IProductCard
   ): Promise<{ success: boolean; message?: string }> {
      try {
         const payload: AddToFavouritesRequest = { productId: product.id };
         const newProduct = { ...product, isInFavourites: true };
         const token = getCookie("token")?.toString();
         const res = await fetchApi(addToFavouritesApi(payload, token));
         runInAction(() => {
            this.favourites.push(newProduct);
            this.cart = this.cart.map((item) =>
               item.id === product.id ? { ...item, isInFavourites: true } : item
            );
         });
         if (res.success) {
            return { success: true };
         } else {
            return { success: false, message: res.message };
         }
      } catch (e) {
         console.error("Ошибка при добавлении в избранное", e);
         return {
            success: false,
            message: "Ошибка при добавлении в избранное",
         };
      }
   }

   async removeFromFavourites(
      payload: RemoveFromFavouritesRequest
   ): Promise<{ success: boolean; message?: string }> {
      try {
         const token = getCookie("token")?.toString();
         const res = await fetchApi(removeFromFavouritesApi(payload, token));
         if (res.success) {
            runInAction(() => {
               runInAction(() => {
                  this.favourites = this.favourites.filter(
                     (p) => p.id !== payload.productId
                  );

                  this.cart = this.cart.map((item) =>
                     item.id === payload.productId
                        ? { ...item, isInFavourites: false }
                        : item
                  );
               });
            });
            return { success: true };
         } else {
            return { success: false, message: res.message };
         }
      } catch (e) {
         console.error("Ошибка при удалении из избранного", e);
         return {
            success: false,
            message: "Ошибка при удалении из избранного",
         };
      }
   }

   async addToCart(
      product: IProductCard
   ): Promise<{ success: boolean; message?: string }> {
      try {
         const payload: AddToCartRequest = { productId: product.id };
         const newProduct = { ...product, isInCart: true };
         const token = getCookie("token")?.toString();
         const res = await fetchApi(addToCartApi(payload, token));
         if (res.success) {
            runInAction(() => {
               this.cart.push(newProduct);
               this.favourites = this.favourites.map((item) =>
                  item.id === product.id ? { ...item, isInCart: true } : item
               );
            });
            return { success: true };
         } else {
            return { success: false, message: res.message };
         }
      } catch (e) {
         console.error("Ошибка при добавлении в корзину", e);
         return { success: false, message: "Ошибка при добавлении в корзину" };
      }
   }

   async removeFromCart(
      payload: RemoveFromCartRequest
   ): Promise<{ success: boolean; message?: string }> {
      try {
         const token = getCookie("token")?.toString();
         const res = await fetchApi(removeFromCartApi(payload, token));

         if (res.success) {
            runInAction(() => {
               this.cart = this.cart.filter(
                  (item) => item.id !== payload.productId
               );
               this.favourites = this.favourites.map((item) =>
                  item.id === payload.productId
                     ? { ...item, isInCart: false }
                     : item
               );
            });
            return { success: true };
         } else {
            return { success: false, message: res.message };
         }
      } catch (e) {
         console.error("Ошибка при удалении из корзины", e);
         return { success: false, message: "Ошибка при удалении из корзины" };
      }
   }

   async removeAllFromCart(): Promise<{ success: boolean; message?: string }> {
      try {
         const token = getCookie("token")?.toString();
         const res = await fetchApi(removeAllFromCartApi(token));
         if (res.success) {
            runInAction(() => {
               runInAction(() => {
                  // const cartProductIds = this.cart.map(item => item.id);
                  
                  this.cart = [];
                  
                  this.favourites = this.favourites.map(item => ({
                     ...item,
                     isInCart: false
                 }));
              }); 
            });
            return { success: true };
         } else {
            return { success: false, message: res.message };
         }
      } catch (e) {
         console.error("Ошибка при удалении корзины", e);
         return { success: false, message: "Ошибка при удалении корзины" };
      }
   }

   async updateCustomer(
      data: CustomerUpdateRequest
   ): Promise<{ success: boolean; message?: string }> {
      try {
         const token = getCookie("token")?.toString();
         const res = await fetchApi(updateCustomerApi(data, token));
         if (res.success) {
            runInAction(() => {
               this.profile = res.data;
            });
            return { success: true };
         } else {
            return { success: false, message: res.message };
         }
      } catch (e) {
         console.error("Ошибка при обновлении профиля", e);
         return { success: false, message: "Ошибка при обновлении профиля" };
      }
   }

   async logout() {
      deleteCookie("token");
      this.profile = null;
      this.cart = [];
      this.favourites = [];
   }
}

const customerStore = new CustomerStore();
export default customerStore;
