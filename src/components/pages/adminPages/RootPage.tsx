"use client";
import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import routes from "@/constants/routes";
import RegistrationCodeForm from "@/components/adminComponents/RegistrationCodeForm";

const NavigateButton: FC<{
   label: string;
   path?: string;
   onClick?: () => void;
}> = ({ label, path, onClick }) => {
   const router = useRouter();
   return (
      <div>
         <button
            onClick={() => {
               if (path) {
                  router.push(path);
               }
               if (onClick) {
                  onClick();
               }
            }}
            className="border-2 md:text-base text-sm w-full border-main-green cursor-pointer hover:scale-102 hover:border-dark-green hover:text-dark-green transition-all duration-300 text-main-green px-4 py-2 rounded-md"
         >
            {label}
         </button>
      </div>
   );
};

const RootPage: FC = () => {
   const [isRegistrationCodeFormOpen, setIsRegistrationCodeFormOpen] =
      useState(false);

   return (
      <div className="min-h-screen font-geist py-5 md:px-10 px-5">
         <div className="flex flex-col mt-5 gap-4 w-full">
         <NavigateButton
            label={isRegistrationCodeFormOpen ? "Закрыть" : "Выдать код для регистрации"}
            onClick={() => {
               setIsRegistrationCodeFormOpen(!isRegistrationCodeFormOpen);
            }}
         />
         {isRegistrationCodeFormOpen && <RegistrationCodeForm />}
         
            <NavigateButton
               label="Список производителей"
               path={routes.admin.lists.producers}
            />
            <NavigateButton
               label="Список курьеров"
               path={routes.admin.lists.couriers}
            />
         </div>
      </div>
   );
};

export default RootPage;
