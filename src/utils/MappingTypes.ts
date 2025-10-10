import { IDisplayCard } from "@/types/entities/Display";
import { IProduct, IReadyBasket } from "@/types/entities/Product";
import { IProductCard } from "@/types/entities/Product";

export function mapToDisplayCard(
   item: IProductCard | IProduct | IReadyBasket
): IDisplayCard {
   if ("products" in item) {
      return {
         id: item.id,
         title: item.title,
         image: item.images[0],
         price: item.price,
         overprice: item.overprice,
         isAvailable: item.isAvailable,
         isInCart: item.isInCart,
         isInFavourites: item.isInFavourites,
         type: "basket",
         feedbackAv: item.feedbackAv,
         unit: "шт.",
         saleVolume: 1,
      };
   } else {
      return {
         id: item.id,
         title: item.title,
         producerName: item.producerName,
         image: Array.isArray(item.images) ? item.images[0] : item.images,
         price: item.price,
         overprice: item.overprice,
         basePrice: item.basePrice,
         discount: item.discount,
         isAvailable: item.isAvailable,
         isInCart: item.isInCart,
         isInFavourites: item.isInFavourites,
         type: "product",
         feedbackAv: item.feedbackAv,
         unit: item.unit,
         saleVolume: item.saleVolume,
         volume: item.volume,
      };
   }
}
