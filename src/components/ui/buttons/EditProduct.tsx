import { FC, useState } from "react";
import { IProduct } from "@/types/entities/Product";
import { Modal } from "@/components/ui/modals/Modal";
import EditProductModal from "@/components/ui/modals/modalContents/EditProductModal";
import { useProductContext } from "@/context/ProductContext";
import Loader from "../Loader";
import { UpdateProductRequest } from "@/types/requests/ProductRequests";
import { useStores } from "@/hooks/useStores";
import Toast from "../Toast";

interface EditProductProps {
   productId: string;
}

const EditProduct: FC<EditProductProps> = ({ productId }) => {
   const { getProductById } = useProductContext();
   const { producerStore } = useStores();

   const [openModal, setOpenModal] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [product, setProduct] = useState<IProduct | null>(null);
   const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "warning" } | null>(null);

   const handleOpenModal = async () => {
      setIsLoading(true);
      const result = await getProductById({ productId });
      if (result.success) {
         setProduct(result.product);
      } 
      setIsLoading(false);
      setOpenModal(true);
   };
   const handleEditProduct = async (payload: UpdateProductRequest) => {
      const result = await producerStore.updateProduct(payload, productId);
      if (result.success) {
         
         setToast({ message: "Продукт успешно создан", type: "success" });
         setOpenModal(false);
      } else {
         setToast({ message: result.message || "Произошла ошибка при создании продукта", type: "error" });
      }
   };

   return (
      <>
         {openModal && (
            <Modal
               isOpen={openModal}
               onClose={() => setOpenModal(false)}
               showCloseButton={true}
               className="overflow-y-hidden p-4"
            >
               {isLoading && <Loader />}
               {product && !isLoading && <EditProductModal product={product} handleEditProduct={(payload) => handleEditProduct(payload)} />}
            </Modal>
         )}
         {toast && (
            <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
         )}
         <button
            className={`${"bg-main-green text-white"} rounded-full p-2 cursor-pointer`}
            onClick={handleOpenModal}
            data-ignore-click
         >
            <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth={1.5}
               stroke="currentColor"
               className="size-6"
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
               />
            </svg>
         </button>
      </>
   );
};

export default EditProduct;
