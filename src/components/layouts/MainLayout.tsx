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
   

interface LayoutProps {
   //userType: string;
   children: ReactNode;
}

const MainLayout: FC<LayoutProps> = ({ children }) => {
   const { userType } = useAuthContext();
   console.log(userType);
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

   
   useEffect(() => {
      // if (!userType) return;
      console.log("here");
      switch (userType) {
         case UserType.CUSTOMER:
           console.log("CUSTOMER");
            break;
         case UserType.PRODUCER:
            console.log("PRODUCER");
            break;
         case UserType.COURIER:
            console.log("COURIER");
            break;
      }

   }, [userType]);

   return (
      <div className="flex flex-col min-h-screen">
         <Navbar userType={userType} />
         <main className="grow">{children}</main>
         <Footer />
      </div>
   );
};

export default MainLayout;
