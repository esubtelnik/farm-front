import { IProductForOrder } from "@/types/entities/Product";

export interface ICalculatePriceReadyBasket {
   objects: {
      price: number;
      basePrice: number;
      amount: number;
      discount: number;
      overprice: number;
   }[];
   overprice: number | null;
}

export const calculatePriceReadyBasket = (
   payload: ICalculatePriceReadyBasket
) => {
   let price = 0.0;

   for (const obj of payload.objects) {
      if (payload.overprice === null || payload.overprice >= obj.overprice) {
         price += obj.price * obj.amount;
         continue;
      }

      const discountAmount = obj.basePrice * (obj.discount / 100);
      const overpriceAmount = obj.basePrice * (payload.overprice / 100);

      price += (obj.basePrice - discountAmount + overpriceAmount) * obj.amount;
   }

   return Number(price.toFixed(2));
};

export function calculateTotal(
   products: IProductForOrder[],
   minDeliveryPrice: number
) {
   let total = products.reduce(
      (sum, product) => sum + product.price * product.amount,
      0
   );

   let deliveryFee = 0;
   let message = "";

   if (total < minDeliveryPrice) {
      deliveryFee = 10;
      message = "К заказу добавлена доставка 10 р., так как сумма меньше 50 р.";
   }

   total += deliveryFee;

   return { total, deliveryFee, message };
}


export function getAvailableDeliveryDates(products: IProductForOrder[]) {
   const DELIVERY_DAYS = [3, 5, 6]; 
   const today = new Date();
 
   const belarusOffset = 3 * 60;
   const utc = today.getTime() + today.getTimezoneOffset() * 60000;
   const belarusTime = new Date(utc + belarusOffset * 60000);
 
   const maxPrep = Math.max(...products.map((p) => p.delivery ?? 0));
   const availableDates: string[] = [];
 
   for (let i = 1; i <= 21; i++) {
     const candidate = new Date(belarusTime);
     candidate.setDate(belarusTime.getDate() + i);
 
     const dayOfWeek = candidate.getDay();
     const daysUntilDelivery = Math.ceil(
       (candidate.getTime() - belarusTime.getTime()) / (1000 * 60 * 60 * 24)
     );
 
     if (DELIVERY_DAYS.includes(dayOfWeek) && daysUntilDelivery >= maxPrep) {
       const year = candidate.getFullYear();
       const month = String(candidate.getMonth() + 1).padStart(2, "0");
       const day = String(candidate.getDate()).padStart(2, "0");
       const formatted = `${year}-${month}-${day}`;
 
       availableDates.push(formatted);
     }
   }
 
   return availableDates;
 }
 

