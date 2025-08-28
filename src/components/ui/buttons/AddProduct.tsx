"use client";
import { FC, useState } from "react";
import { Modal } from "@/components/ui/modals/Modal";
import AddProductModal from "@/components/ui/modals/modalContents/AddProductModal";

const AddProduct: FC = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   return (
      <>
         {isModalOpen && (
            <Modal
               isOpen={isModalOpen}
               onClose={() => setIsModalOpen(false)}
               showCloseButton={false}
               size="w-[90%] h-fit"
            >
               <AddProductModal />
            </Modal>
         )}

         <button
            onClick={() => setIsModalOpen(true)}
            className="bg-main-green text-white p-1 rounded-full w-fit self-center cursor-pointer shadow-md/40 hover:scale-115 transition-all duration-100"
         >
            <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth={2}
               stroke="currentColor"
               className="size-10"
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
               />
            </svg>
         </button>
      </>
   );
};

export default AddProduct;
