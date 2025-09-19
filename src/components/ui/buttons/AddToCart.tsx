import { FC, useState } from "react";
import Basket from "@/assets/icons/Basket.svg";
import { useAuthContext } from "@/context/AuthContext";
import { UserType } from "@/constants/UserTypeEnum";
import { useStores } from "@/hooks/useStores";
import { IProductCard } from "@/types/entities/Product";
import { Modal } from "@/components/ui/modals/Modal";
import LoginModal from "@/components/ui/modals/modalContents/LoginModal";
import Toast from "@/components/ui/Toast";

interface AddToCartProps {
   isInCart: boolean;
   product: IProductCard;
   onToggle: (newState: boolean) => void;
}

const AddToCart: FC<AddToCartProps> = ({ isInCart, product, onToggle }) => {
   const { userType } = useAuthContext();
   const { customerStore } = useStores();

   const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "warning" | "info" } | null>(null);


   const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (userType === UserType.CUSTOMER) {
         if (isInCart) {
            await customerStore.removeFromCart({ productId: product.id });
            onToggle(false);
            setToast({ message: "Продукт успешно удален из корзины", type: "info" });
         } else {
            await customerStore.addToCart(product);
            onToggle(true);
        setToast({ message: "Продукт успешно добавлен в корзины", type: "success" });

         }
      } else {
         setIsModalOpen(true);
      }
   };

   return (
      <>
         {toast && (
            <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
         )}    
         {isModalOpen && (
            <Modal
               isOpen={isModalOpen}
               onClose={() => setIsModalOpen(false)}
               showCloseButton={true}
               size="w-fit h-fit"
            >
               <LoginModal />
              
            </Modal>
         )}
         <button
            data-ignore-click
            className={`${
               isInCart ? "bg-main-gray text-white" : "bg-main-green text-white"
            } rounded-full flex items-center justify-center  md:p-2 p-1 lg:size-12 md:size-10 size-8 cursor-pointer`}
            onClick={handleAddToCart}
         >
            <Basket />
         </button>
      </>
   );
};

export default AddToCart;
