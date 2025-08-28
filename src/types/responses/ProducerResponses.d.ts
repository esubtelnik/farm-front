import { IProducer } from "../entities/User";

export interface ProducerGalleryResponse {
   id: number;
   producerId: number;
   images: string[];
   datetimeInserted: string;
}

export interface ProducerCertificatesResponse {
   id: number;
   producerId: number;
   images: string[];
   datetimeInserted: string;
}

export interface ProducerByIdResponse {
   producer: IProducer;
   gallery: ProducerGalleryResponse;
   certificates: ProducerCertificatesResponse;
}

