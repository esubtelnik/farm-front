"use client";
import { useState } from "react";
import Basket from "@/assets/icons/Basket.svg";

const DeliveryItem = () => {
   const [isConfirmed] = useState<boolean>(true);
   return (
      <div className="w-full max-w-96">
         <span className={`text-dark-green w-full flex justify-end pr-4 text-sm ${isConfirmed ? "opacity-0" : "opacity-100" }`}>Подтвердите заказ!</span>

         <div
            className={`${
               isConfirmed ? "shadow-md/30" : "border-dark-green border-2"
            }  flex rounded-2xl py-3 px-4 w-full justify-between items-center`}
         >
            <div
               className={`h-32 ${
                  isConfirmed ? "text-main-green" : "text-dark-green"
               }`}
            >
               <Basket />
            </div>
            <div className="flex flex-col gap-y-5">
               <span
                  className={`${
                     isConfirmed ? "text-main-green" : "text-dark-green"
                  } text-xl font-bold uppercase`}
               >
                  КОРЗИНА 1
               </span>
               <span>Еженедельно</span>
            </div>
         </div>
      </div>
   );
};

export default DeliveryItem;
