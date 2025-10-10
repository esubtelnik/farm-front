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

import {
   AddToCartRequest,
   RemoveFromCartRequest,
   AddToFavouritesRequest,
   RemoveFromFavouritesRequest,
} from "@/types/requests/CustomerRequests";
import { CustomerUpdateRequest } from "@/types/requests/UserRequests";
import { getCookie, deleteCookie } from "cookies-next";
import { fetchApi } from "@/lib/fetchApi";
import { IDisplayCard } from "@/types/entities/Display";

class CustomerStore {
   profile: ICustomer | null = null;
   favourites: IDisplayCard[] = [];
   cart: IDisplayCard[] = [];

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
               const products = res.data.products ?? [];
               const readyBaskets = res.data.readyBaskets ?? [];
               this.cart = [...products, ...readyBaskets];
            });
         } else {
            this.cart = [];
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
               const products = res.data.products ?? [];
               const readyBaskets = res.data.readyBaskets ?? [];
               this.favourites = [...products, ...readyBaskets];
            });
         } else {
            this.favourites = [];
         }
      } catch (e) {
         console.error("Ошибка получения избранного", e);
      }
   }

   async addToFavourites(
      product: IDisplayCard
   ): Promise<{ success: boolean; message?: string }> {
      try {
         const payload: AddToFavouritesRequest = {
            productId: product.id,
            isBasket: product.type === "basket",
         };
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
      product: IDisplayCard
   ): Promise<{ success: boolean; message?: string }> {
      try {
         const payload: RemoveFromFavouritesRequest = {
            productId: product.id,
            isBasket: product.type === "basket",
         };
         const token = getCookie("token")?.toString();
         const res = await fetchApi(removeFromFavouritesApi(payload, token)); 
         if (res.success) {
            runInAction(() => {
               this.favourites = this.favourites.filter(
                  (p) => p.id !== product.id
               );

               this.cart = this.cart.map((item) =>
                  item.id === product.id
                     ? { ...item, isInFavourites: false }
                     : item
               );
            });

            // const productInFavourites = this.favourites.find(
            //    (p) => p.id === payload.productId
            // );
            // if (productInFavourites) {
            //    const index = this.favourites.indexOf(productInFavourites);
            //    this.favourites.splice(index, 1);
            // }

            // const productInCart = this.cart.find((p) => p.id === payload.productId);
            // if (productInCart) productInCart.isInFavourites = false;

            // const productInFavouritesList = this.favourites.find(
            //    (p) => p.id === payload.productId
            // );
            // if (productInFavouritesList) productInFavouritesList.isInFavourites = false;

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
      product: IDisplayCard
   ): Promise<{ success: boolean; message?: string }> {
      try {
         const payload: AddToCartRequest = {
            productId: product.id,
            isBasket: product.type === "basket",
         };
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
      product: IDisplayCard
   ): Promise<{ success: boolean; message?: string }> {
      try {
         const token = getCookie("token")?.toString();
         const payload: RemoveFromCartRequest = {
            productId: product.id,
            isBasket: product.type === "basket",
         };
         const res = await fetchApi(removeFromCartApi(payload, token));

         if (res.success) {
            runInAction(() => {
               this.cart = this.cart.filter(
                  (item) => item.id !== product.id
               );
               this.favourites = this.favourites.map((item) =>
                  item.id === product.id
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

                  this.favourites = this.favourites.map((item) => ({
                     ...item,
                     isInCart: false,
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

   async getCartItems() {
      return this.cart.length;
   }

   syncProductsWithUserData(products: IDisplayCard[]): IDisplayCard[] {
      const result = products.map((product) => {
         const isInCart = this.cart.some(
            (cartItem) => cartItem.id === product.id
         );
         const isInFavourites = this.favourites.some(
            (favItem) => favItem.id === product.id
         );

         return {
            ...product,
            isInCart,
            isInFavourites,
         };
      });

      return result;
   }

   async ensureUserDataLoaded() {
      const token = getCookie("token")?.toString();
      if (!token) return;

      if (!this.profile) {
         await this.fetchCustomerData();
      }
      await Promise.all([
         this.fetchCustomerCart(),
         this.fetchCustomerFavourites(),
      ]);
   }

   get isDataInitialized(): boolean {
      return this.profile !== null;
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
