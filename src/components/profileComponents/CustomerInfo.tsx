"use client";
import { observer } from "mobx-react-lite";
import { useStores } from "../../hooks/useStores";
import { FC, useEffect, useState } from "react";
import Skeleton from "@/components/ui/Skeleton";
import { useRouter } from "next/navigation";
import routes from "@/constants/routes";
import { Modal } from "@/components/ui/modals/Modal";
import CreateOrderModal from "@/components/ui/modals/modalContents/CreateOrderModal";
import WarningPreOrederModal from "@/components/ui/modals/modalContents/WarningPreOrederModal";
import { CreateOrderRequest } from "@/types/requests/CustomerRequests";
import Toast from "@/components/ui/Toast";
import { paymentMethodsValues } from "@/constants/constants";

interface CustomerInfoProps {
   isCart?: boolean;
   setIsLoadingPayment?: (isLoading: boolean) => void;
}

const CustomerInfo: FC<CustomerInfoProps> = observer(
   ({ isCart = false, setIsLoadingPayment }) => {
      const { customerStore } = useStores();

      const [isCreateOrderModalOpen, setIsCreateOrderModalOpen] =
         useState(false);
      const [isWarningPreOrderModalOpen, setIsWarningPreOrderModalOpen] =
         useState(false);
      const [isWarningNoCartItemsModalOpen, setIsWarningNoCartItemsModalOpen] =
         useState(false);
      const [cartItems, setCartItems] = useState(0);

      const [toast, setToast] = useState<{
         message: string;
         type: "success" | "error" | "warning";
      } | null>(null);
      const profile = customerStore.profile;
      const isLoading = !profile;

      const router = useRouter();

      const loadCartItems = async () => {
         const items = await customerStore.getCartItems();
         setCartItems(items);
      };

      useEffect(() => {
         loadCartItems();
         // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [customerStore, customerStore.cart.length]);

      const handleClearCart = async () => {
         await customerStore.removeAllFromCart();
         setCartItems(await customerStore.getCartItems());
      };

      const handleLogout = async () => {
         await customerStore.logout();
         router.push(routes.auth.login);
      };

      const handleOpenCreateOrderModal = async () => {
         await loadCartItems();
         await customerStore.fetchCustomerCart();
         if (customerStore.cart.length === 0) {
            setIsWarningNoCartItemsModalOpen(true);
            return;
         }
         if (!profile?.address || !profile.phoneNumber) {
            setIsWarningPreOrderModalOpen(true);
         } else {
            setIsCreateOrderModalOpen(true);
         }
      };

      const handleCreateOrder = async (
         payload: CreateOrderRequest
      ): Promise<{ success: boolean; message?: string }> => {
         const result = await customerStore.createOrder(payload);
         if (result.success) {
            if (
               payload.paymentMethod === paymentMethodsValues.EPOS &&
               result.data
            ) {
               setIsLoadingPayment?.(true);
               window.location.href = result.data;
            }
            await customerStore.getOrders("uncompleted");
            setIsCreateOrderModalOpen(false);
            setToast({ message: "Заказ успешно оформлен", type: "success" });

         } else {
            setToast({
               message: result.message || "Ошибка при оформлении заказа",
               type: "error",
            });
         }
         return result;
      };

      return (
         <div className="flex flex-col md:flex-row md:gap-x-8 gap-y-4 md:p-8 p-4 mb-8 md:mb-0 justify-between">
            <div className="flex flex-col gap-y-3">
               {isLoading ? (
                  <>
                     <Skeleton className="h-8 w-48" />
                     <Skeleton className="h-5 w-40" />
                     <Skeleton className="h-5 w-64" />
                  </>
               ) : (
                  <>
                     <span className="title-text">
                        {profile.name ?? "Имя не указано"}
                     </span>
                     <span className="info-text">
                        Номер телефона: {profile.phoneNumber ?? "Не указан"}
                     </span>
                     <span className="info-text">
                        Адрес: {profile.address ?? "Не указан"}
                     </span>
                  </>
               )}
            </div>
            <div className="flex flex-col gap-y-2">
               {isCart ? (
                  <>
                     <button
                        onClick={handleOpenCreateOrderModal}
                        className="flex items-center justify-center text-sm md:text-base gap-x-2 border-2 border-main-green text-main-green px-4 rounded-full py-2 h-fit hover:scale-105 transition-all duration-100 cursor-pointer"
                     >
                        Оформить заказ ({cartItems})
                     </button>
                     <button
                        onClick={handleClearCart}
                        className="flex justify-center items-center text-sm md:text-base gap-x-2 border-2 border-main-green text-main-green px-4 rounded-full py-2 h-fit hover:scale-105 transition-all duration-100 cursor-pointer"
                     >
                        Очистить корзину
                     </button>
                  </>
               ) : (
                  <>
                     <button
                        onClick={() => {
                           router.push(routes.users.profile + "?edit=true");
                        }}
                        className="flex items-center justify-between text-sm md:text-base gap-x-2 border-2 border-main-green text-main-green px-4 rounded-full py-2 h-fit hover:scale-105 transition-all duration-100 cursor-pointer"
                     >
                        Редактировать профиль
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 24 24"
                           strokeWidth={1.5}
                           stroke="currentColor"
                           className="md:size-6 size-5"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                           />
                        </svg>
                     </button>
                     <button
                        onClick={handleOpenCreateOrderModal}
                        className="flex items-center justify-start text-sm md:text-base gap-x-2 border-2 border-main-green text-main-green px-4 rounded-full py-2 h-fit hover:scale-105 transition-all duration-100 cursor-pointer"
                     >
                        Оформить заказ ({cartItems}{" "}
                        {(() => {
                           switch (cartItems) {
                              case 1:
                                 return "продукт";
                              case 2:
                              case 3:
                              case 4:
                                 return "продукта";
                              default:
                                 return "продуктов";
                           }
                        })()}
                        )
                     </button>
                     <button
                        onClick={handleLogout}
                        className="flex items-center justify-between text-sm md:text-base gap-x-2 border-2 border-main-green text-white bg-main-green px-4 rounded-full py-2 h-fit hover:scale-105 transition-all duration-100 cursor-pointer"
                     >
                        Выйти из аккаунта
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 24 24"
                           strokeWidth={1.5}
                           stroke="currentColor"
                           className="md:size-6 size-5"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                           />
                        </svg>
                     </button>
                  </>
               )}

               {isCreateOrderModalOpen && (
                  <Modal
                     size="w-full md:w-fit"
                     isOpen={isCreateOrderModalOpen}
                     onClose={() => setIsCreateOrderModalOpen(false)}
                     showCloseButton={true}
                  >
                     <CreateOrderModal
                        handleCreateOrder={handleCreateOrder}
                        userInfo={profile!}
                        products={customerStore.cart.filter(
                           (p) => p.isAvailable
                        )}
                     />
                  </Modal>
               )}
               {isWarningNoCartItemsModalOpen && (
                  <Modal
                     isOpen={isWarningNoCartItemsModalOpen}
                     onClose={() => setIsWarningNoCartItemsModalOpen(false)}
                     showCloseButton={true}
                  >
                     <WarningPreOrederModal
                        message="В корзине нет товаров, перейдите в каталог и выберите товары"
                        route={routes.home.catalog}
                        buttonText="Перейти в каталог"
                     />
                  </Modal>
               )}
               {isWarningPreOrderModalOpen && (
                  <Modal
                     isOpen={isWarningPreOrderModalOpen}
                     onClose={() => setIsWarningPreOrderModalOpen(false)}
                     showCloseButton={true}
                  >
                     <WarningPreOrederModal
                        message="Перед оформлением заказа необходимо закочить оформление профиля"
                        route={routes.users.profile + "?edit=true"}
                        buttonText="Профиль"
                     />
                  </Modal>
               )}
            </div>
            {toast && <Toast message={toast.message} type={toast.type} />}
         </div>
      );
   }
);

export default CustomerInfo;
