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
  }
  
  export interface IProductCard extends IDisplayCardBase {
    type: "product";
    producerName: string;
    basePrice: number;
    discount: number;
    volume: number;
  }
  
  export interface IBasketCard extends IDisplayCardBase {
    type: "basket";
    producerName?: string;
    basePrice?: number;
    discount?: number;
    volume?: number;
  }
  
  export type IDisplayCard = IProductCard | IBasketCard;
  