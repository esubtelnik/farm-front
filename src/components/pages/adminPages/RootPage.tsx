"use client";
import { FC, useState } from "react";
import routes from "@/constants/routes";
import RegistrationCodeForm from "@/components/adminComponents/RegistrationCodeForm";
import AdminActionButton from "@/components/adminComponents/AdminActionButton";

const RootPage: FC = () => {
   const [isRegistrationCodeFormOpen, setIsRegistrationCodeFormOpen] =
      useState(false);

   return (
      <div className="min-h-screen font-geist py-5 md:px-10 px-5">
         <div className="flex flex-col mt-5 gap-4 w-full">
            <AdminActionButton
               label={
                  isRegistrationCodeFormOpen
                     ? "Закрыть"
                     : "Выдать код для регистрации"
               }
               onClick={() => {
                  setIsRegistrationCodeFormOpen(!isRegistrationCodeFormOpen);
               }}
            />
            {isRegistrationCodeFormOpen && <RegistrationCodeForm />}
            <AdminActionButton
               label="Готовые корзины"
               path={routes.admin.lists.readyBaskets}
            />
              <AdminActionButton
               label="Создать готовую корзину"
               path={routes.admin.items.addReadyBasket}
            />
            <AdminActionButton
               label="Список производителей"
               path={routes.admin.lists.producers}
            />
            <AdminActionButton
               label="Список курьеров"
               path={routes.admin.lists.couriers}
            />
         </div>
      </div>
   );
};

export default RootPage;
