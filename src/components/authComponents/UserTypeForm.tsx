"use client";
import { FC } from "react";
import UserIcon from "@/assets/icons/UserIcon.svg";
import FarmerIcon from "@/assets/icons/FarmerIcon.svg";
import TruckIcon from "@/assets/icons/TruckIcon.svg";
import { UserType } from "@/constants/UserTypeEnum";
import { useAuthContext } from "@/context/AuthContext";
import routes from "@/constants/routes";
import { useRouter } from "next/navigation";

const UserList = [
   {
      userType: UserType.CUSTOMER,
      icon: UserIcon,
   },
   {
      userType: UserType.PRODUCER,
      icon: FarmerIcon,
   },
   {
      userType: UserType.COURIER,
      icon: TruckIcon,
   },
];



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
         <h1 className="md:text-3xl text-xl text-center md:text-start font-bold mb-16">УКАЖИТЕ ВАШУ КАТЕГОРИЮ</h1>
         <div className="flex flex-col md:w-2/5 w-full md:space-y-10 space-y-5 px-3">
            {/* <button
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
            </button> */}

            {UserList.map((user) => (
               <button
                  key={user.userType.type}
                  onClick={() => handleRegistrationNavigate(user.userType)}
                  className="border-2 font-normal md:text-xl text-base md:p-4 p-3 rounded-full flex justify-between gap-x-6 items-center cursor-pointer hover:text-dark-green hover:font-bold transition-all hover:scale-105"
               >
                  <span>{user.userType.title}</span>
                  <user.icon />
               </button>
            ))}
         </div>
      </div>
   );
};

export default UserTypeForm;
