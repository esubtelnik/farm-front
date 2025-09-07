"use client";
import CourierDeliveryItem from "@/components/mainComponents/items/CourierDeliveryItem";

const CourierDeliveryList = () => {
   return (
      <div className="grid grid-cols-3 gap-10 px-10 place-items-center">
         <CourierDeliveryItem />
         <CourierDeliveryItem />
      </div>
   );
};

export default CourierDeliveryList;
