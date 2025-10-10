"use client";
import { createContext, useContext, useState } from "react";
import { ReactNode } from "react";
import { ICategory, IProduct, IProductCard } from "../types/entities/Product";
import {
   getCategoriesApi,
   getProductByIdApi,
   getProductsByProducerIdApi,
   searchProductsApi,
   addReviewApi,
   searchOnlyProductsApi,
} from "@/api/productApi";
import {
   GetProductByIdRequest,
   SearchProductsRequest,
   AddReviewRequest,
} from "../types/requests/ProductRequests";
import {
   addProducerReviewApi,
   getAllProducersApi,
   getProducerByIdApi,
} from "@/api/producerApi";
import { IProducerCard } from "../types/entities/User";
import { IReview } from "../types/entities/Review";
import {
   AddProducerReviewRequest,
   GetProducerByIdRequest,
} from "../types/requests/ProducerRequests";
import { ProducerByIdResponse } from "../types/responses/ProducerResponses";
import { IDisplayCard } from "@/types/entities/Display";

interface ProductContextType {
   categories: ICategory[];
   searchedProducts: IProductCard[];
   getCategories: () => Promise<{
      success: boolean;
      categories: ICategory[];
      message?: string;
   }>;
   setSearchedProducts: (products: IProductCard[]) => void;
   getProductsByProducerId: (producerId: string) => Promise<{
      success: boolean;
      products: IDisplayCard[];
      message?: string;
   }>;
   searchProducts: (payload: SearchProductsRequest) => Promise<{
      success: boolean;
      products: IDisplayCard[];
      message?: string;
   }>;

   searchOnlyProducts: (payload: SearchProductsRequest) => Promise<{
      success: boolean;
      products: IProductCard[];
      message?: string;
   }>;

   getProductById: (payload: GetProductByIdRequest) => Promise<{
      success: boolean;
      product: IProduct | null;
      message?: string;
   }>;

   getAllProducers: () => Promise<{
      success: boolean;
      producers: IProducerCard[];
      message?: string;
   }>;

   getProducerById: (payload: GetProducerByIdRequest) => Promise<{
      success: boolean;
      data: ProducerByIdResponse | null;
      message?: string;
   }>;

   addReview: (payload: AddReviewRequest) => Promise<{
      success: boolean;
      review: IReview | null;
      message?: string;
   }>;

   addProducerReview: (payload: AddProducerReviewRequest) => Promise<{
      success: boolean;
      review: IReview | null;
      message?: string;
   }>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductContextProvider = ({
   children,
}: {
   children: ReactNode;
}) => {
   const [categories, setCategories] = useState<ICategory[]>([]);
   const [searchedProducts, setSearchedProducts] = useState<IProductCard[]>([]);

   const getCategories = async (): Promise<{
      success: boolean;
      categories: ICategory[];
      message?: string;
   }> => {
      try {
         const response = await getCategoriesApi();

         if (response.successful) {
            setCategories(response.data);
            return { success: true, categories: response.data };
         } else {
            return {
               success: false,
               categories: [],
               message: response.error.message,
            };
         }
      } catch (error) {
         console.log(error);
         return {
            success: false,
            categories: [],
            message: "Ошибка при получении категорий",
         };
      }
   };

   const getProductsByProducerId = async (
      producerId: string
   ): Promise<{
      success: boolean;
      products: IDisplayCard[];
      message?: string;
   }> => {
      try {
         const response = await getProductsByProducerIdApi({ producerId });
         if (response.successful) {
            return { success: true, products: response.data };
         } else {
            return {
               success: false,
               products: [],
               message: response.error.message,
            };
         }
      } catch (error) {
         console.log(error);
         return {
            success: false,
            products: [],
            message: "Ошибка при получении продуктов",
         };
      }
   };

   const searchProducts = async (
      payload: SearchProductsRequest
   ): Promise<{
      success: boolean;
      products: IDisplayCard[];
      message?: string;
   }> => {
      try {
         const response = await searchProductsApi(payload);
         if (response.successful) {
            return { success: true, products: response.data };
         } else {
            return {
               success: false,
               products: [],
               message: response.error.message,
            };
         }
      } catch (error) {
         console.log(error);
         return {
            success: false,
            products: [],
            message: "Ошибка при получении продуктов",
         };
      }
   };

   const searchOnlyProducts = async (
      payload: SearchProductsRequest
   ): Promise<{
      success: boolean;
      products: IProductCard[];
      message?: string;
   }> => {
      try {
         const response = await searchOnlyProductsApi(payload);
         if (response.successful) {
            return { success: true, products: response.data };
         } else {
            return {
               success: false,
               products: [],
               message: response.error.message,
            };
         }
      } catch (error) {
         console.log(error);
         return {
            success: false,
            products: [],
            message: "Ошибка при получении продуктов",
         };
      }
   };

   const getProductById = async (
      payload: GetProductByIdRequest
   ): Promise<{
      success: boolean;
      product: IProduct | null;
      message?: string;
   }> => {
      try {
         const response = await getProductByIdApi(payload);
         if (response.successful) {
            return { success: true, product: response.data };
         } else {
            return {
               success: false,
               product: null,
               message: response.error.message,
            };
         }
      } catch (error) {
         console.log(error);
         return {
            success: false,
            product: null,
            message: "Ошибка при получении продукта",
         };
      }
   };

   const getAllProducers = async (): Promise<{
      success: boolean;
      producers: IProducerCard[];
      message?: string;
   }> => {
      try {
         const response = await getAllProducersApi();
         if (response.successful) {
            return { success: true, producers: response.data };
         } else {
            return {
               success: false,
               producers: [],
               message: response.error.message,
            };
         }
      } catch (error) {
         console.log(error);
         return {
            success: false,
            producers: [],
            message: "Ошибка при получении производителей",
         };
      }
   };

   const getProducerById = async (
      payload: GetProducerByIdRequest
   ): Promise<{
      success: boolean;
      data: ProducerByIdResponse | null;
      message?: string;
   }> => {
      try {
         const response = await getProducerByIdApi(payload);
         if (response.successful) {
            return { success: true, data: response.data };
         } else {
            return {
               success: false,
               data: null,
               message: response.error.message,
            };
         }
      } catch (error) {
         console.log(error);
         return {
            success: false,
            data: null,
            message: "Ошибка при получении производителя",
         };
      }
   };

   const addReview = async (
      payload: AddReviewRequest
   ): Promise<{
      success: boolean;
      review: IReview | null;
      message?: string;
   }> => {
      try {
         const response = await addReviewApi(payload);
         if (response.successful) {
            return { success: true, review: response.data };
         } else {
            return {
               success: false,
               review: null,
               message: response.error.message,
            };
         }
      } catch (error) {
         console.log(error);
         return {
            success: false,
            review: null,
            message: "Ошибка при добавлении отзыва",
         };
      }
   };

   const addProducerReview = async (
      payload: AddProducerReviewRequest
   ): Promise<{
      success: boolean;
      review: IReview | null;
      message?: string;
   }> => {
      try {
         const response = await addProducerReviewApi(payload);
         if (response.successful) {
            return { success: true, review: response.data };
         } else {
            return {
               success: false,
               review: null,
               message: response.error.message,
            };
         }
      } catch (error) {
         console.log(error);
         return {
            success: false,
            review: null,
            message: "Ошибка при добавлении отзыва",
         };
      }
   };

   // useEffect(() => {
   //    const fetchCategories = async () => {
   //       const { success, message } = await getCategories();
   //       if (!success) {
   //          console.log(message);
   //       }
   //    };
   //    fetchCategories();
   // }, []);

   return (
      <ProductContext.Provider
         value={{
            categories,
            searchedProducts,
            searchProducts,
            setSearchedProducts,
            getProductsByProducerId,
            getAllProducers,
            getProductById,
            addReview,
            getProducerById,
            addProducerReview,
            getCategories,
            searchOnlyProducts,
         }}
      >
         {children}
      </ProductContext.Provider>
   );
};

export const useProductContext = (): ProductContextType => {
   const context = useContext(ProductContext);
   if (!context) {
      throw new Error(
         "ProductContext must be used within a ProductContextProvider"
      );
   }
   return context;
};
