import { IProduct } from "@/types/entities/Product";
import { IProductCard } from "@/types/entities/Product";

export const mapProductToCard = (product: IProduct): IProductCard => ({
    id: product.id,
    images: product.images[0],
    producerName: product.producerName,
    basePrice: product.basePrice,
    price: product.price,
    discount: product.discount,
    overprice: product.overprice,
    feedbackAv: product.feedbackAv,
    isInCart: product.isInCart,
    isInFavourites: product.isInFavourites,
    unit: product.unit,
    title: product.title,
    volume: product.volume,
    saleVolume: product.saleVolume,
  });