"use client";
import { FC, useState } from "react";
import { Modal } from "@/components/ui/modals/Modal";
import AddProductModal from "@/components/ui/modals/modalContents/AddProductModal";
import { useStores } from "@/hooks/useStores";
import { CreateProductRequest } from "@/types/requests/ProductRequests";
import Toast from "@/components/ui/Toast";

const AddProduct: FC = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const { producerStore } = useStores();
   const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "warning" } | null>(null);


   const handleAddProduct = async (payload: CreateProductRequest) => {

      
      const result = await producerStore.createProduct(payload);
      if (result.success) {
         
         setToast({ message: "Продукт успешно создан", type: "success" });
         setIsModalOpen(false);
      } else {
         setToast({ message: result.message || "Произошла ошибка при создании продукта", type: "error" });
      }

   };


   return (
      <>
         {isModalOpen && (
            <Modal
               isOpen={isModalOpen}
               onClose={() => setIsModalOpen(false)}
               showCloseButton={true}
               size="w-full"
               className="overflow-y-auto p-4"
            >
               <AddProductModal handleAddProduct={(payload) => handleAddProduct(payload)} />
            </Modal>
         )}
         {toast && (
            <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
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
