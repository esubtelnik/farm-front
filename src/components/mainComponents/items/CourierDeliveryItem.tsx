"use client";
import { useState } from "react";
import Basket from "@/assets/icons/Basket.svg";
import { Modal } from "@/components/ui/modals/Modal";
import CourierDeliveryModal from "@/components/ui/modals/modalContents/CourierDeliveryModal";

const CourierDeliveryItem = () => {
   const [isConfirmed] = useState<boolean>(true);
   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

   const [isDeliveryAccepted, setIsDeliveryAccepted] = useState(false);

   const handleAcceptDelivery = () => {
      setIsDeliveryAccepted(!isDeliveryAccepted);
      console.log("Доставлено");
   };

   return (
    <>
      <div className="w-full max-w-96 cursor-pointer" onClick={() => setIsModalOpen(true)}>
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
               <span>Дата доставки: 16.07.2025</span>
               <span>Адрес: ул. Ленина, 123</span>
        
            </div>
         </div>
      </div>
      {isModalOpen && (
         <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            showCloseButton={false}
            size="w-fit h-fit"
            backgroundColor="bg-black/20"
            className="border-2 border-main-green shadow-[0_0_5px_theme('colors.main-green')] "

         >
           <CourierDeliveryModal isDeliveryAccepted={isDeliveryAccepted} handleAcceptDelivery={handleAcceptDelivery} /> 
         </Modal>
      )}
      </>
   );
};

export default CourierDeliveryItem;
