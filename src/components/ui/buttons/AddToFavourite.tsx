"use client";
import { FC, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { UserType } from "@/constants/UserTypeEnum";
import { useStores } from "@/hooks/useStores";
import { IProductCard } from "@/types/entities/Product";
import { Modal } from "@/components/ui/modals/Modal";
import LoginModal from "../modals/modalContents/LoginModal";


interface AddToFavouriteProps {
   isInFavourites: boolean;
   product: IProductCard;
   onToggle: (newState: boolean) => void;
}

const AddToFavourite: FC<AddToFavouriteProps> = ({ isInFavourites, product }) => {
  const { userType } = useAuthContext();
  const { customerStore } = useStores();

  const [openModal, setOpenModal] = useState(false);

  const handleAddToFavourites = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (userType === UserType.CUSTOMER) {
      if (isInFavourites) {
        await customerStore.removeFromFavourites({ productId: product.id });
      } else {
        await customerStore.addToFavourites(product);
      }
    } else {
      setOpenModal(true);
    }
  };  

   return (
      <>
         {openModal && (
            <Modal
               isOpen={openModal}
               onClose={() => setOpenModal(false)}
               showCloseButton={true}
               size="w-fit h-fit"
            >
               <LoginModal />
         
            </Modal>
         )}
         <button
            data-ignore-click
            className={`${
               isInFavourites
                  ? "bg-main-green text-white"
                  : "bg-white text-main-green"
            } rounded-full flex items-center justify-center md:p-2 p-1 lg:size-12 md:size-10 size-8 cursor-pointer`}
            onClick={handleAddToFavourites}
         >
            <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               
               stroke="currentColor"
               className="w-full h-full md:stroke-3 stroke-2"
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
               />
            </svg>
         </button>
      </>
   );
};

export default AddToFavourite;
