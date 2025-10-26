"use client";
import { useStores } from "@/hooks/useStores";
import { FC, useEffect, useState } from "react";
import { IDisplayOrderCard } from "@/types/entities/Display";
import Loader from "@/components/ui/Loader";
import OrderListItem from "@/components/adminComponents/OrderListItem";
import { Modal } from "@/components/ui/modals/Modal";
import CloseOrderModal from "@/components/ui/modals/modalContents/CloseOrderModal";
import Toast from "@/components/ui/Toast";

const OrdersFromAdminListPage: FC = () => {
   const [isLoading, setIsLoading] = useState(true);
   const [orders, setOrders] = useState<IDisplayOrderCard[]>([]);
   const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
   const [selectedOrderId, setSelectedOrderId] = useState<string>("");
   const [toast, setToast] = useState<{
      message: string;
      type: "success" | "error" | "warning";
   } | null>(null);
   const { adminStore } = useStores();

   const fetchOrders = async () => {
      setIsLoading(true);
      const res = await adminStore.getOrdersFromAdmin();
      if (res.success) {
         setOrders(res.data || []);
         setIsLoading(false);
      }
   };

   useEffect(() => {
      fetchOrders();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);


   const handleOpenCloseModal = (orderId: string) => {
    setSelectedOrderId(orderId);
    setIsWarningModalOpen(true);
 };
   

   const handleCloseOrder = async (orderId: string) => {
    if (!selectedOrderId) return;
      const res = await adminStore.closeOrder(orderId);
      if (res.success) {
         fetchOrders();
         setToast({
            message: "Заказ успешно закрыт",
            type: "success",
         });
      } else {
         setToast({
            message: res.message || "Произошла ошибка при закрытии заказа",
            type: "error",
         });
      }
      setIsWarningModalOpen(false);
      setSelectedOrderId("");
   };

   return (
      <div className="flex flex-col gap-4 p-4">
         {isLoading ? (
            <Loader />
         ) : (
            <div className="flex flex-col gap-4 overflow-y-auto ">
               {orders.map((order) => (
                  <OrderListItem
                     key={order.id}
                     order={order}
                     handleCloseOrder={handleOpenCloseModal}
                  />
               ))}
            </div>
         )}
         {isWarningModalOpen && (
            <Modal
               isOpen={isWarningModalOpen}
               onClose={() => setIsWarningModalOpen(false)}
            >
               <CloseOrderModal
                  handleCloseOrder={() => handleCloseOrder(selectedOrderId)}
                  handleCloseModal={() => setIsWarningModalOpen(false)}
               />
            </Modal>
         )}

         {toast && (
            <Toast
               message={toast.message}
               type={toast.type}
               onClose={() => setToast(null)}
            />
         )}
      </div>
   );
};

export default OrdersFromAdminListPage;
