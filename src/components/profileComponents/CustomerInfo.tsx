"use client";
import { observer } from "mobx-react-lite";
import { useStores } from "../../hooks/useStores";
import { FC, useState } from "react";
import Skeleton from "@/components/ui/Skeleton";
import { useRouter } from "next/navigation";
import routes from "@/constants/routes";
import { Modal } from "@/components/ui/modals/Modal";
// import CreateOrderModal from "@/components/modals/CreateOrderModal";

interface CustomerInfoProps {
   isCart?: boolean;
}

const CustomerInfo: FC<CustomerInfoProps> = observer(({ isCart = false }) => {
   const [isCreateOrderModalOpen, setIsCreateOrderModalOpen] = useState(false);
   const { customerStore } = useStores();
   const profile = customerStore.profile;
   const isLoading = !profile;

   const router = useRouter();

   const handleClearCart = async () => {
      await customerStore.removeAllFromCart();
   };

   const handleLogout = async () => {
      await customerStore.logout();
      router.push(routes.auth.login);
   };

   const handleCreateOrder = async () => {
      setIsCreateOrderModalOpen(true);
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
                  <button onClick={handleCreateOrder} className="flex items-center justify-between text-sm md:text-base gap-x-2 border-2 border-main-green text-main-green px-4 rounded-full py-2 h-fit hover:scale-105 transition-all duration-100 cursor-pointer">
                     Оформить заказ
                  </button>
                  <button
                     onClick={handleClearCart}
                     className="flex justify-center items-center text-sm md:text-base gap-x-2 border-2 border-main-green text-main-green px-4 rounded-full py-2 h-fit hover:scale-105 transition-all duration-100 cursor-pointer"
                  >
                     Очистить корзину
                  </button>
                  {isCreateOrderModalOpen && (
                     <Modal
                        isOpen={isCreateOrderModalOpen}
                        onClose={() => setIsCreateOrderModalOpen(false)}
                        showCloseButton={false}
                     >
                        {/* <CreateOrderModal /> */}
                        <div>В разработке</div>
                     </Modal>
                  )}
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
         </div>
      </div>
   );
});

export default CustomerInfo;
