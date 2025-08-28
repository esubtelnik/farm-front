"use client";
import { FC } from "react";
import { useRouter } from "next/navigation";
import routes from "@/constants/routes";
import RegistrationCodeForm from "@/components/adminComponents/RegistrationCodeForm";

const NavigateButton: FC<{ label: string; path: string }> = ({
   label,
   path,
}) => {
   const router = useRouter();
   return (
      <div>
         <button
            onClick={() => router.push(path)}
            className="border-2 w-full border-main-green cursor-pointer hover:scale-105 hover:border-dark-green hover:text-dark-green transition-all duration-300 text-main-green px-4 py-2 rounded-md"
         >
            {label}
         </button>
      </div>
   );
};

const RootPage: FC = () => {

   return (
      <div className="min-h-screen font-geist p-5">
       <RegistrationCodeForm />
         <div className="flex flex-col mt-5 gap-4 w-fit">
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
