export interface AddToFavouritesRequest {
   isBasket: boolean;
   productId: string;
}

export interface AddToCartRequest {
   productId: string;
   isBasket: boolean;
}

export interface RemoveFromFavouritesRequest {
   productId: string;
   isBasket: boolean;
}

export interface RemoveFromCartRequest {
   productId: string;
   isBasket: boolean;
}

export interface CreateOrderRequest {
   products: {
      productId: string;
      isReadyBasket: boolean;
      productAmount: number;
      price: number;
   }[];
   paymentMethod: string;
   deliveryTo: string;
   deliveryPrice: number;
   address: string;
   phoneNumber: string;
   promocode?: string;
   customerFio: string;
}

export interface CheckPromoCodeRequest {
   promocode: string;
}