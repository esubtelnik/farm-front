"use client";
import { UserType } from "@/constants/UserTypeEnum";
import { useAuthContext } from "@/context/AuthContext";
// import { useAuthContext } from "@/context/AuthContext";
// import { useStores } from "@/hooks/useStores";
// import Navbar from "@/components/layouts/Navbar";
import { FC, ReactNode, useEffect } from "react";
import Navbar from "@/components/features/Navbar";
import Footer from "@/components/features/Footer";
import { useStores } from "@/hooks/useStores";
import { usePathname } from "next/navigation";
   

interface LayoutProps {
   //userType: string;
   children: ReactNode;
}

const MainLayout: FC<LayoutProps> = ({ children }) => {
   const { userType } = useAuthContext();
   const { customerStore, producerStore, courierStore } = useStores();


      useEffect(() => {
         if (!userType) return;

         switch (userType) {
            case UserType.CUSTOMER:
               customerStore.fetchCustomerData();
               break;
            case UserType.PRODUCER:
               producerStore.fetchProducerData();
               break;
            case UserType.COURIER:
               courierStore.fetchCourierData();
               break;
         }

         // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [userType]);

   
   // useEffect(() => {
   //    // if (!userType) return;
   //    switch (userType) {
   //       case UserType.CUSTOMER:
   //         console.log("CUSTOMER");
   //          break;
   //       case UserType.PRODUCER:
   //          console.log("PRODUCER");
   //          break;
   //       case UserType.COURIER:
   //          console.log("COURIER");
   //          break;
   //    }

   // }, [userType]);

   const pathname = usePathname();
   const isAdminPage = pathname.startsWith("/admin");

   return (
      <div className="flex flex-col min-h-screen">
         <Navbar userType={userType} />
         <main className={`grow ${isAdminPage ? "" : "lg:px-[100px] xl:px-[150px] px-0"}`}>{children}</main>
         <Footer />
      </div>
   );
};

export default MainLayout;
