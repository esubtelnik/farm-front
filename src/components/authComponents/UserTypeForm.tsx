"use client";
import { FC } from "react";
import UserIcon from "@/assets/icons/UserIcon.svg";
import FarmerIcon from "@/assets/icons/FarmerIcon.svg";
import TruckIcon from "@/assets/icons/TruckIcon.svg";
import { UserType } from "@/constants/UserTypeEnum";
import { useAuthContext } from "@/context/AuthContext";
import routes from "@/constants/routes";
import { useRouter } from "next/navigation";
const UserTypeForm: FC = () => {
   const router = useRouter();
   const { setIsLogoShow } = useAuthContext();

   const handleRegistrationNavigate = (
      userType: (typeof UserType)[keyof typeof UserType]
   ) => {
      router.push(`${routes.auth.register}?userType=${userType.value}`);
      setIsLogoShow(true);
   };

   return (
      <div className="h-full flex flex-col font-geist text-main-green">
         <h1 className="text-3xl font-bold mb-16">УКАЖИТЕ ВАШУ КАТЕГОРИЮ</h1>
         <div className="flex flex-col w-2/5 space-y-10 px-3">
            <button
               onClick={() => handleRegistrationNavigate(UserType.CUSTOMER)}
               className="border-2 font-normal text-xl p-4 rounded-full flex justify-between gap-x-6 items-center cursor-pointer hover:text-dark-green hover:font-bold transition-all hover:scale-105"
            >
               <span>{UserType.CUSTOMER.title}</span>
               <UserIcon />
            </button>
            <button
               onClick={() => handleRegistrationNavigate(UserType.PRODUCER)}
               className="border-2 font-normal text-xl p-4 rounded-full flex justify-between gap-x-6 items-center cursor-pointer hover:text-dark-green hover:font-bold transition-all hover:scale-105"
            >
               <span>{UserType.PRODUCER.title}</span>
               <FarmerIcon />
            </button>
            <button
               onClick={() => handleRegistrationNavigate(UserType.COURIER)}
               className="border-2 font-normal text-xl p-4 rounded-full flex justify-between gap-x-6 items-center cursor-pointer hover:text-dark-green hover:font-bold transition-all hover:scale-105"
            >
               <span>{UserType.COURIER.title}</span>
               <TruckIcon />
            </button>
         </div>
      </div>
   );
};

export default UserTypeForm;
