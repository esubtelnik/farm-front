import { IProductCart } from "../entities/Product";

export interface CustomerFavouritesResponse {
    id: string,
    customerId: string,
    products: IProductCart[],
    datetimeInserted: string,
    datetimeUpdated: string,
}

export interface CustomerCartResponse {
    id: string,
    customerId: string,
    products: IProductCart[],
    datetimeInserted: string,
    datetimeUpdated: string,
}