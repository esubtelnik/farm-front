import { ICourierFromAdmin, IProducerFromAdmin } from "../entities/User";


export interface SaveProducerCodeResponse {
    id: string;
    email: string;
    overprice: number;
    shopCode: string;
    datetimeInserted: string;
 }
 
 export interface CreateRegistrationCourierCodeResponse {
    id: string;
    email: string;
    courierCode: string;
    datetimeInserted: string;
 }

export type ProducersFromAdminResponse = IProducerFromAdmin[];
export type CouriersFromAdminResponse = ICourierFromAdmin[];
 
 