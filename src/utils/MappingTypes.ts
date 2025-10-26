import {
   IAmountedDisplayCard,
   IDisplayCard,
   IDisplayOrderCard,
} from "@/types/entities/Display";
import { ICountedProduct, IOrder, IProduct, IReadyBasket } from "@/types/entities/Product";
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
         delivery: item.delivery,
         products: item.products as ICountedProduct[],

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
         delivery: item.delivery,
      };
   }
}

export function formatDeliveryOptions(dates: string[]) {
   return dates.map((date) => {
      const d = new Date(date + "T00:00:00");
      const weekday = d.toLocaleDateString("ru-RU", { weekday: "long" });
      const dayMonth = d.toLocaleDateString("ru-RU", {
         day: "2-digit",
         month: "long",
      });
      const capitalizedWeekday =
         weekday.charAt(0).toUpperCase() + weekday.slice(1);
      return {
         label: `${capitalizedWeekday} (${dayMonth})`,
         value: date,
      };
   });
}

export function formatDate(date: string) {
   const formattedDate = new Date(date).toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "long",
      year: "numeric",
   });
   return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
}

export function mapOrderToOrderCard(order: IOrder): IDisplayOrderCard {
   const items: IAmountedDisplayCard[] = [];

   order.products.forEach(
      (item: { product: IProduct; amount: number; price: number }) => {
         if (item.product) {
            items.push({
               ...mapToDisplayCard(item.product),
               amount: item.amount,
               price: item.price,
            });
         }
      }
   );


console.log(order.readyBaskets);
   order.readyBaskets.forEach(
      (item: { readyBasket: IReadyBasket; amount: number; price: number }) => {
         if (item.readyBasket) {
            items.push({
               ...mapToDisplayCard(item.readyBasket),
               amount: item.amount,
               price: item.price,
            });
         }
      }
   );

   return {
      id: order.id,
      customerId: order.customerId,
      customerFio: order.customerFio,
      nearestDelivery: order.nearestDelivery,
      items: items,
      paymentMethod: order.paymentMethod,
      invoiceNo: order.invoiceNo,
      status: order.status,
      phoneNumber: order.phoneNumber,
      address: order.address,
   };
}
