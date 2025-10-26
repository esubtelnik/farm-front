import { FC } from "react";
import LogoColor from "@/assets/logos/LogoColor.svg";

interface CloseOrderModalProps {
   handleCloseOrder: () => void;
   handleCloseModal: () => void;
}

const CloseOrderModal: FC<CloseOrderModalProps> = ({ handleCloseOrder, handleCloseModal }) => {
   return (
      <div className="flex flex-col items-center justify-center md:gap-10 gap-5 md:p-10 p-5">
         <h1 className="text-xl font-bold text-main-gray text-center">
            Уверены, что хотите закрыть заказ?
         </h1>
         <div className="w-16 md:w-20">
            <LogoColor />
         </div>
         <div className="flex gap-5 w-full">
            <button
               className="w-full bg-main-green text-white py-2 px-4 rounded-full hover:scale-105 transition-all duration-200 cursor-pointer"
               onClick={() => handleCloseOrder()}
            >
               Закрыть заказ
            </button>
            <button
               className="border-2 w-full border-main-green text-main-green py-2 px-4 rounded-full hover:scale-105 transition-all duration-200 cursor-pointer"
               onClick={() => handleCloseModal()}
            >
               Отмена
            </button>
         </div>
      </div>
   );
};

export default CloseOrderModal;
