import { IReview } from "./Review";

export interface ICategory {
   id: string;
   paths: [string, string];
   title: string;
   description: string;
}

export interface IProduct {
   id: string;
   images:string[];
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
}

export interface IProductCard {
   id: string;
   images: string;
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
