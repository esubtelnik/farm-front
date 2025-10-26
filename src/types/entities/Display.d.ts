interface IDisplayCardBase {
   id: string;
   title: string;
   image: string;
   price: number;
   overprice: number;
   isAvailable: boolean;
   feedbackAv: number;
   unit: string;
   saleVolume: number;
   isInCart: boolean;
   isInFavourites: boolean;
   delivery: number;
}

export interface IProductCard extends IDisplayCardBase {
   type: "product";
   producerName: string;
   basePrice: number;
   discount: number;
   volume: number;
   amount?: number;
}

export interface IBasketCard extends IDisplayCardBase {
   type: "basket";
   producerName?: string;
   basePrice?: number;
   discount?: number;
   volume?: number;
   products: ICountedProduct[];
   
}

export type IDisplayCard = IProductCard | IBasketCard;

export type IAmountedDisplayCard = IProductCard | IReadyBasket  & {
   amount: number;
   price: number;
};





export interface IDisplayOrderCard {
   id: string;
   customerId: string;
   customerFio: string;
   nearestDelivery: string;
   items: IAmountedDisplayCard[];
   paymentMethod: string;
   invoiceNo: number;
   status: string;
   phoneNumber: string;
   address: string;
}
