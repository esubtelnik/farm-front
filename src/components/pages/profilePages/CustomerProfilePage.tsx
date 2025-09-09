"use client";
import { FC, useEffect } from "react";
// import DeliveryList from "@/components/mainComponents/lists/DeliveryList";
import ProductList from "@/components/mainComponents/lists/ProductList";
// import ExamplePage from "@/components/modals/ProductModal";
import CustomerInfo from "@/components/profileComponents/CustomerInfo";
import { useStores } from "@/hooks/useStores";
import Tabs from "@/components/ui/Tabs";
import { observer } from "mobx-react-lite";
import CustomerProfileEditPage from "./CustomerProfileEditPage";
import { useSearchParams } from "next/navigation";

const CustomerProfilePage: FC = observer(() => {
   const { customerStore } = useStores();
   const searchParams = useSearchParams();
   const isEdit = searchParams.get("edit") === "true";



   useEffect(() => {
      const fetchData = async () => {
         
         await customerStore.fetchCustomerFavourites();
         await customerStore.fetchCustomerCart();
      };
      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const tabItems = [
      {
         label: "Ближайшие доставки",
         render: () => (
            <div className="py-5">
               {/* <DeliveryList /> */}
               В разработке
            </div>
         ),
      },
      {
         label: "Избранное",
         render: () => (
            <div className="py-5">
               <ProductList products={customerStore.favourites} />
            </div>
         ),
      },
      {
         label: "Корзина",
         render: () => (
            <div className="py-5">
               <ProductList products={customerStore.cart} />
            </div>
         ),
      },
      {
         label: "История покупок",
         render: () => (
            <div className="py-5">
               {/* <ProductList products={customerStore.cart} /> */}
               В разработке
            </div>
         ),
      },
   ];

   return (
      <div className="min-h-screen font-geist">
         {isEdit ? (
               <CustomerProfileEditPage />
         ) : (
            <>
               <CustomerInfo />
               <Tabs tabs={tabItems} />
            </>
         )}
      </div>
   );
});

export default CustomerProfilePage;
