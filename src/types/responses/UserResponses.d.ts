import { ICourier, ICustomer, IProducer } from "../entities/User";

export interface AccountResponse {
   email: string;
   account_id: string;
   account_type: string;
}
export interface TokenResponse {
   token: string;
}

export type CustomerResponse = ICustomer;
export type ProducerResponse = IProducer;
export type CourierResponse = ICourier;


