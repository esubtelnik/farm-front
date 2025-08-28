export interface AdminLoginRequest {
   email: string;
   password: string;
}

export interface SaveProducerCodeRequest {
   email: string;
   code: string;
   overprice: number;
}

export interface CreateRegistrationCourierCodeRequest {
   email: string;
   code: string;
}

export interface ChangeProducerOverpriceRequest {
   producerId: string;
   overprice: number;
   overpriceId: string;
}


export interface ChangeProductOverpriceRequest {
   productId: string;
   overprice: number;
}





