"use client";
import DeliveryItem from "@/components/mainComponents/items/DeliveryItem";
import { IDisplayOrderCard } from "@/types/entities/Display";
import { FC } from "react";

interface DeliveryListProps {
   orders: IDisplayOrderCard[];
   isLoading?: boolean;
   isError?: boolean;
   errorMessage?: string;
}

const DeliveryList: FC<DeliveryListProps> = ({
   orders,
   isLoading = false,
   isError = false,
   errorMessage = "",
}) => {
   if (isLoading) {
      return (
         <div className="flex items-center justify-center h-[50vh]">
            <div className="text-main-gray">Загрузка...</div>
         </div>
      );
   }

   if (isError) {
      return <div className="text-center text-main-gray">{errorMessage}</div>;
   }

   if (orders.length === 0) {
      return (
         <div className="flex justify-center items-center my-5 h-full">
            <span className="text-main-gray">Доставок нет</span>
         </div>
      );
   }

   return (
      <div className="grid md:grid-cols-3 grid-cols-2 md:gap-10 gap-5 md:px-10 px-5 place-items-center">
         {orders.map((order) => (
            <DeliveryItem key={order.id} order={order} />
         ))}
      </div>
   );
};

export default DeliveryList;
