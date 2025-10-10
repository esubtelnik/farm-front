
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