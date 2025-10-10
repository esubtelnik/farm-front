import { IReview } from "./Review";

export interface ICategory {
   id: string;
   paths: [string, string];
   title: string;
   description: string;
}

export interface IProduct {
   id: string;
   images: string[];
   isAvailable: boolean;
   producerId: string;
   producerName: string;
   basePrice: number;
   price: number;
   discount: number;
   overprice: number;
   feedback: IReview[];
   feedbackAv: number;
   isInCart: boolean;
   isInFavourites: boolean;
   title: string;
   unit: string;
   productType: string;
   description: string;
   composition: string;
   storageConditions: string;
   package: string;
   expirationDate: number;
   volume: number;
   saleVolume: number;
   delivery: number;
   datetimeInserted: string;
   datetimeUpdated: string;
   inaccuracy: number;
}

export interface ICountedProduct extends IProductCard {
   amount: number;
 }

export interface IProductCard {
   id: string;
   images: string;
   isAvailable: boolean;
   producerName: string;
   basePrice: number;
   price: number;
   discount: number;
   overprice: number;
   feedbackAv: number;
   isInCart: boolean;
   isInFavourites: boolean;
   unit: string;
   title: string;
   volume: number;
   saleVolume: number;
}

   export interface IReadyBasket {
      id: string
      isAvailable: boolean;
      title: string;
      images: string[];
      overprice: number;
      feedback: IReview[];
      feedbackAv: number;
      isInCart: boolean;
      isInFavourites: boolean;
      storageConditions: string;
      package: string;
      description: string;
      composition: string;
      delivery: number;
      products: IProductCard[];
      price: number;
      overprice: number;
   }

   
   export interface IReadyBasketFromAdmin {
      id: string
      isAvailable: boolean;
      title: string;
      images: string[];
      overprice: number;
      feedback: IReview[];
      feedbackAv: number;
      isInCart: boolean;
      isInFavourites: boolean;
      storageConditions: string;
      package: string;
      description: string;
      composition: string;
      delivery: number;
      products: ICountedProduct[];
      price: number;
      overprice: number;
   }

