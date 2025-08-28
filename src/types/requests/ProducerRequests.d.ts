export interface AddPhotoRequest {
   image: File;
}

export interface DeletePhotoRequest {
   imagePath: string;
}

export interface GetProducerByIdRequest {
   producerId: string;
}

export interface AddProducerReviewRequest {
   producerId: string;
   value: number;
   content: string;
}

