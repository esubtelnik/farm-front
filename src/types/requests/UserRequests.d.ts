export interface SendEmailRequest {
   email: string;
}

export interface CustomerLoginRequest {
   email: string;
   password: string;
}

export interface CustomerInitRequest {
   email: string;
}

export interface CustomerRegisterRequest {
   email: string;
   password: string;
   code: string;
}


export interface ProducerInitRequest {
   email: string;
   shopCode: string;
}


export interface ProducerRegisterRequest {
   fio: string;
   email: string;
   password: string;
   shopCode: string;
   code: string;
}

export interface ProducerLoginRequest {
   email: string;
   password: string;
   // shopCode: string;

}


export interface CourierInitRequest {
   email: string;
   courierCode: string;
}


export interface CourierRegisterRequest {
   fio: string;
   email: string;
   password: string;
   courierCode: string;
   code: string;
}

export interface CourierLoginRequest {
   email: string;
   password: string;
   // courierCode: string;

}

export interface CustomerUpdateRequest {
   name?: string;
   surname?: string;
   address?: string;
   phoneNumber: string;
}

export interface ProducerUpdateRequest {
   title?: string;
   category?: string;
   description?: string;
   address?: string;
   activityType?: string;
   image?: File;
}

export interface CourierUpdateRequest {
   fio?: string;
   address?: string;
   phoneNumber?: string;
   carNumber?: string;
}

