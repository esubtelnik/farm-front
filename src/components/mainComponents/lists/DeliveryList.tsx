"use client";
import DeliveryItem from "@/components/mainComponents/items/DeliveryItem";

const DeliveryList = () => {
   return (
      <div className="grid grid-cols-3 gap-10 px-10 place-items-center">
         <DeliveryItem />
         <DeliveryItem />
         <DeliveryItem />
         <DeliveryItem />
      </div>
   );
};

export default DeliveryList;
