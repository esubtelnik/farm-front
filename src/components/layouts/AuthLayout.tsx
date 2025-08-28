"use client";
import { FC, ReactNode } from "react";
import Image from "next/image";
import { useAuthContext } from "@/context/AuthContext";
import { motion } from "framer-motion";
import AnimateHeightWrapper from "@/components/ui/AnimateHeightWrapper";

interface LayoutProps {
   children: ReactNode;
}

const AuthLayout: FC<LayoutProps> = ({ children }) => {
   const { isLogoShow } = useAuthContext();
   return (
      <div
         className={`bg-main-green w-full min-h-screen flex ${
            isLogoShow ? "justify-between" : "justify-center"
         }  items-center px-30 gap-20`}
      >
         <motion.div
            className={`bg-white p-12 drop-shadow-xl shadow-2xl rounded-3xl ${
               isLogoShow ? "w-full" : "md:w-2/3 w-md"
            }`}
            style={{ overflow: "hidden" }}
         >
            <AnimateHeightWrapper>{children}</AnimateHeightWrapper>
         </motion.div>
         {isLogoShow && (
            <div className="flex justify-center items-center w-2/5">
               <Image
                  src="/LogoWhite.svg"
                  alt="Logo"
                  width={100}
                  height={100}
                  className="w-full h-full"
               />
               
            </div>
         )}
      </div>
   );
};

export default AuthLayout;
