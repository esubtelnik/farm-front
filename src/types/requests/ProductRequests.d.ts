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
    volume?: number;
    saleVolume?: number;
    unit?: string;
    delivery?: number;
}


export interface AddToFavouritesRequest {
    productId: string;
}

export interface AddToCartRequest {
    productId: string;
}

export interface RemoveFromFavouritesRequest {
    productId: string;
}

export interface RemoveFromCartRequest {
    productId: string;
}

export interface AddReviewRequest {
    value: number;
    productId: string;
    content: string;
}



