import { FC } from "react";

interface DeleteProductModalProps {
   handleDeleteProduct: () => void;
   handleCloseModal: () => void;
}
const DeleteProductModal: FC<DeleteProductModalProps> = ({
   handleDeleteProduct,
   handleCloseModal,
}) => {
   return (
      <div className="flex flex-col items-center justify-center md:gap-6 gap-3 md:p-10 p-5">
         <h1 className="text-base font-bold text-main-gray text-center">
            Подтвердите действие{" "}
         </h1>
         <div className="text-center md:text-xl text-base font-bold text-main-gray">
         Уверены, что хотите удалить продукт?
         </div>

         <div className="flex md:gap-5 gap-2 w-full">
            <button
               className="w-full flex items-center justify-center text-sm md:text-base bg-main-green text-white py-2 md:px-4 px-2 rounded-full hover:scale-105 transition-all duration-200 cursor-pointer"
               onClick={() => handleDeleteProduct()}
            >
               Да, подтверждаю
            </button>
            <button
               className="border-2 flex items-center justify-center text-sm md:text-base w-full border-main-green text-main-green py-2 md:px-4 px-2 rounded-full hover:scale-105 transition-all duration-200 cursor-pointer"
               onClick={() => handleCloseModal()}
            >
               Отмена
            </button>
         </div>
      </div>
   );
};

export default DeleteProductModal;
