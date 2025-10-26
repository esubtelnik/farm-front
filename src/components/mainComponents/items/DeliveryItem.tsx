"use client";
import { useState } from "react";
import Basket from "@/assets/icons/Basket.svg";
import { IDisplayOrderCard } from "@/types/entities/Display";
import { FC } from "react";
import { formatDate } from "@/utils/MappingTypes";
import { OrderStatuses, paymentMethodsValues } from "@/constants/constants";

interface DeliveryItemProps {
   order: IDisplayOrderCard;
}

const getStatusColor = (status: string) => {
   switch (status) {
      case OrderStatuses.COMPLETED:
         return "bg-green-100 text-green-700 border-green-200";
      case OrderStatuses.NOT_PAID:
         return "bg-red-100 text-red-700 border-red-200";
      case OrderStatuses.PAID:
         return "bg-blue-100 text-blue-700 border-blue-200";
      default:
         return "bg-gray-100 text-gray-700 border-gray-200";
   }
};

const DeliveryItem: FC<DeliveryItemProps> = ({ order }) => {
   const [isConfirmed] = useState<boolean>(true);
   return (
      <div className="w-full max-w-96">
         <span
            className={`text-dark-green w-full flex justify-end pr-4 text-sm ${
               isConfirmed ? "opacity-0" : "opacity-100"
            }`}
         >
            Подтвердите заказ!
         </span>

         <div
            className={`${
               isConfirmed ? "shadow-md/30" : "border-dark-green border-2"
            }  flex flex-col md:flex-row gap-2 md:gap-4 rounded-2xl py-3 px-4 w-full justify-between items-center`}
         >
            <div
               className={`w-20 md:w-28 ${
                  isConfirmed ? "text-main-green" : "text-dark-green"
               }`}
            >
               <Basket className="text-main-green" />
            </div>
            <div className="flex flex-col md:gap-y-5 gap-y-2">
               <span
                  className={`${
                     isConfirmed ? "text-main-green" : "text-dark-green"
                  } lg:text-xl md:text-lg text-base w-full text-center md:text-left font-bold uppercase`}
               >
                  Доставка
               </span>
               <span className="text-main-gray w-full text-center md:text-left md:text-base text-sm">
                  {formatDate(order.nearestDelivery)}
               </span>
               <div
                  className={`flex items-center w-full justify-center gap-2 px-4 py-2 rounded-full border ${
                     order.paymentMethod === paymentMethodsValues.CASH
                        ? "bg-blue-100 text-blue-700 border-blue-200"
                        : `${getStatusColor(order.status)}`
                  } `}
               >
                  {order.paymentMethod === paymentMethodsValues.CASH ? (
                     <span className="font-semibold text-sm ">Наличными</span>
                  ) : (
                     <span className="font-semibold text-sm">{order.status}</span>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default DeliveryItem;
