import { IProductCart } from "../entities/Product";

export interface CustomerFavouritesResponse {
    id: string,
    customerId: string,
    products: IProductCart[],
    readyBaskets: IReadyBasket[],
    datetimeInserted: string,
    datetimeUpdated: string,
}

export interface CustomerCartResponse {
    id: string,
    customerId: string,
    products: IProductCart[],
    readyBaskets: IReadyBasket[],
    datetimeInserted: string,
    datetimeUpdated: string,
}