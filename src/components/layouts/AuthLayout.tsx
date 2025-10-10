"use client";
import { FC, ReactNode } from "react";
import Image from "next/image";
import { useAuthContext } from "@/context/AuthContext";
import { motion } from "framer-motion";
import AnimateHeightWrapper from "@/components/ui/AnimateHeightWrapper";
import { useRouter } from "next/navigation";
import routes from "@/constants/routes";

interface LayoutProps {
   children: ReactNode;
}

const AuthLayout: FC<LayoutProps> = ({ children }) => {
   const { isLogoShow } = useAuthContext();
   const router = useRouter();
   return (
      <div
         className={`bg-main-green w-full min-h-[100dvh] h-full flex ${
            isLogoShow ? "lg:justify-between justify-center" : "justify-center"
         }  items-center lg:px-30 md:px-20 px-5 gap-20 py-8`}
      >
         <motion.div
            className={`bg-white overflow-y-auto md:p-12 p-5 drop-shadow-xl shadow-2xl rounded-3xl ${
               isLogoShow ? "w-full" : "md:w-2/3 w-full"
            }`}
         >
            <AnimateHeightWrapper>{children}</AnimateHeightWrapper>
         </motion.div>
         {isLogoShow && (
            <div className="hidden lg:flex justify-center items-center w-2/5">
               <Image
                  onClick={() => router.push(routes.home.root)}
                  src="/LogoWhite.svg"
                  alt="Logo"
                  width={100}
                  height={100}
                  className="w-full h-full cursor-pointer"
               />
            </div>
         )}
      </div>
   );
};

export default AuthLayout;
