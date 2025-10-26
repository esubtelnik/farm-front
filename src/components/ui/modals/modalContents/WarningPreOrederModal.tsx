"use client";
import { FC } from "react";
import { useRouter } from "next/navigation";
import LogoColor from "@/assets/logos/LogoColor.svg";

interface WarningPreOrederModalProps {
   message: string;
   route: string;
   buttonText: string;
}

const WarningPreOrederModal: FC<WarningPreOrederModalProps> = ({ message, route, buttonText }) => {
   const router = useRouter();
   return (
      <div className="flex flex-col items-center justify-center md:gap-10 gap-5 md:p-10 p-5">
         <h1 className="text-xl font-bold text-main-gray text-center">
            {message}
         </h1>
         <div className="w-16 md:w-20">
            <LogoColor />
         </div>

         <button
            className="w-full bg-main-green text-white py-2 px-4 rounded-full hover:scale-105 transition-all duration-200 cursor-pointer"
            onClick={() => router.push(route)}
         >
            {buttonText}
         </button>
      </div>
   );
};

export default WarningPreOrederModal;
