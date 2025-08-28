import { FC } from "react";
import Basket from "../../assets/icons/Basket.svg";

interface CourierDeliveryModalProps {
   isDeliveryAccepted: boolean;
   handleAcceptDelivery: () => void;
}

const CourierDeliveryModal: FC<CourierDeliveryModalProps> = ({ isDeliveryAccepted, handleAcceptDelivery }) => {


   return (
      <div className="flex flex-col min-w-2xl p-8 gap-y-5 font-geist">
         <div className="flex gap-x-5">
            <div className={`h-28 text-main-green`}>
               <Basket />
            </div>
            <div className="flex flex-col gap-y-2">
               <h1 className="uppercase text-2xl font-bold text-main-green">
                  ТОВАР
               </h1>
               <span className="text-base text-dark-gray">
                  Дата доставки: 16.07.2025
               </span>
               <span className="text-base text-dark-gray">
                  Адрес доставки: ул. Ленина, 123
               </span>
            </div>
         </div>
         <div className="flex flex-col gap-y-2">
            <div className="flex items-center gap-x-2">
               <span className="text-main-green font-bold text-lg">Вес:</span>
               <span className="text-base text-dark-gray">1000</span>
            </div>
            <div className="flex items-center gap-x-2">
               <span className="text-main-green font-bold text-lg">
                  Адрес продавца:
               </span>
               <span className="text-base text-dark-gray">ул. Ленина, 123</span>
            </div>
            <div className="flex items-center gap-x-2">
               <span className="text-main-green font-bold text-lg">
                  Телефон продавца:
               </span>
               <span className="text-base text-dark-gray">
                  +7 (999) 999-99-99
               </span>
            </div>
            <div className="flex items-center gap-x-2">
               <span className="text-main-green font-bold text-lg">
                  Способ оплаты:
               </span>
               <span className="text-base text-dark-gray">Наличными</span>
            </div>
            <div className="flex items-center gap-x-2">
               <span className="text-main-green font-bold text-lg">Итого:</span>
               <span className="text-base text-dark-gray">1000</span>
            </div>
         </div>
         <div>
            <button
               onClick={handleAcceptDelivery}
               className={ `cursor-pointer bg-main-green font-bold text-lg px-4 py-2 border-2 rounded-full ${!isDeliveryAccepted ? "bg-main-green text-white border-main-green" : "bg-transparent border-dark-green text-dark-green"} hover:scale-105 transition-all duration-300`}
            >
               Доставлено
            </button>
         </div>
      </div>
   );
};

export default CourierDeliveryModal;
