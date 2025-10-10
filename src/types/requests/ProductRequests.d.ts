export interface GetCategoryByTitleRequest {
    title: string;
}

export interface GetProductsByCategoryRequest {
    category: string;
}

export interface GetProductsByProducerIdRequest {
    producerId: string;
}

export interface GetProductByIdRequest {
    productId: string;
}

export interface SearchProductsRequest {
    title?: string;
    category?: string[];
    priceFrom?: number;
    priceTo?: number;
    deliveryFrom?: number;
    deliveryTo?: number;
}

export interface CreateProductRequest {
    title: string;
    price: number;
    productType: string;
    description: string;
    composition: string;
    storageConditions: string;
    images: File[];
    package: string;
    expirationDate: number;
    volume: number;
    saleVolume: number;
    unit: string;
    delivery: number;
    inaccuracy: number;
}

export interface UpdateProductRequest {
    title?: string;
    price?: number;
    productType?: string;
    description?: string;
    composition?: string;
    storageConditions?: string;
    images?: File[];
    package?: string;
    expirationDate?: number;
    dailyVolume?: number;
    saleVolume?: number;
    unit?: string;
    delivery?: number;
    inaccuracy?: number;
}

export interface DeleteProductRequest {
    productId: string;
}

export interface DeleteReadyBasketRequest {
    basketId: string;
}



export interface AddReviewRequest {
    value: number;
    productId: string;
    content: string;
}


export interface GetReadyBasketByIdRequest {
    id: string;
}

export interface CreateReadyBasketRequest {
    title: string;
    overprice: number;
    products: {
        productId: string;
        amount: number;
    }[];
    images: File[];
    storageConditions: string;
    package: string;
    description: string;
    composition: string;
    delivery: number;
}

export interface UpdateReadyBasketRequest {
    id: string;
    title?: string;
    overprice?: number;
    products: {
        productId: string;
        amount: number;
    }[];
    images?: File[];
    storageConditions?: string;
    package?: string;
    description?: string;
    composition?: string;
    delivery?: number;
}





