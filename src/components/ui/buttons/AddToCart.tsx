import { FC, useState } from "react";
import Basket from "@/assets/icons/Basket.svg";
import { useAuthContext } from "@/context/AuthContext";
import { UserType } from "@/constants/UserTypeEnum";
import { useStores } from "@/hooks/useStores";
import { IProductCard } from "@/types/entities/Product";
import { Modal } from "@/components/ui/modals/Modal";
import LoginModal from "../modals/modalContents/LoginModal";

interface AddToCartProps {
   isInCart: boolean;
   product: IProductCard;
   onToggle: (newState: boolean) => void;
}

const AddToCart: FC<AddToCartProps> = ({ isInCart, product, onToggle }) => {
   const { userType } = useAuthContext();
   const { customerStore } = useStores();

   const [isModalOpen, setIsModalOpen] = useState(false);

   const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (userType === UserType.CUSTOMER) {
         if (isInCart) {
            await customerStore.removeFromCart({ productId: product.id });
            onToggle(false);
         } else {
            await customerStore.addToCart(product);
            onToggle(true);
         }
      } else {
         setIsModalOpen(true);
      }
   };

   return (
      <>
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
