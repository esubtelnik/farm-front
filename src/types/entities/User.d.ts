import { IReview } from "@/types/entities/Review";
import { UserType } from "@/constants/UserTypeEnum";

export type UserTypeValue = (typeof UserType)[keyof typeof UserType];

export interface ICustomer {
   id: string;
   email: string;
   name: string;
   surname: string;
   address: string;
   phoneNumber: string;
   accountType: number;
   datetimeInserted: string;
   datetimeUpdated: string;
}

export interface IProducer {
   id: string;
   email: string;
   fio: string;
   code: string;
   title: string;
   category: string;
   feedbackAv: number;
   feedback: IReview[];
   description: string;
   image: string;
   activityType: string;
   address: string;
   accountType: number;
   datetimeInserted: string;
   datetimeUpdated: string;
}

export interface IProducerCard {
   id: string;
   title: string;
   feedbackAv: number;
   description: string;
   image: string;
}

export interface ICourier {
   id: string;
   email: string;
   fio: string;
   code: string;
   address: string;
   phoneNumber: string;
   carNumber: string;
   accountType: number;
   datetimeInserted: string;
   datetimeUpdated: string;
}

export interface IProducerFromAdmin {
   id: string;
   overpriceId: string;
   overprice: number;
   code: string;
   producerId: string;
   producerFio: string;
   producerEmail: string;
}

export interface ICourierFromAdmin {
   id: string;
   code: string;
   courierFio: string;
   courierEmail: string;
}
