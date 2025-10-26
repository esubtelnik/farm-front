"use client";
import { FC, useEffect, useState } from "react";
// import DeliveryList from "@/components/mainComponents/lists/DeliveryList";
import ProductList from "@/components/mainComponents/lists/ProductList";
// import ExamplePage from "@/components/modals/ProductModal";
import CustomerInfo from "@/components/profileComponents/CustomerInfo";
import { useStores } from "@/hooks/useStores";
import Tabs from "@/components/ui/Tabs";
import { observer } from "mobx-react-lite";
import CustomerProfileEditPage from "./CustomerProfileEditPage";
import { useSearchParams } from "next/navigation";
import DeliveryList from "@/components/mainComponents/lists/DeliveryList";
import { IDisplayCard, IDisplayOrderCard } from "@/types/entities/Display";

type SectionError = {
   isError: boolean;
   message: string;
};

type Errors = {
   cart: SectionError;
   favourites: SectionError;
   deliveries: SectionError;
};

const createTabItems = (
   uncompletedOrders: IDisplayOrderCard[],
   cart: IDisplayCard[],
   favourites: IDisplayCard[],
   isLoading: boolean,
   errors: Errors
) =>  [
   {
      label: "Ближайшие доставки",
      render: () => (
         <div className="py-5">
            <DeliveryList
               orders={uncompletedOrders}
               isLoading={isLoading}
               isError={errors.deliveries.isError}
               errorMessage={errors.deliveries.message}
            />
         </div>
      ),
   },
   {
      label: "Избранное",
      render: () => (
         <div className="py-5">
            <ProductList
               products={favourites}
               isLoading={isLoading}
               isError={errors.favourites.isError}
               errorMessage={errors.favourites.message}
            />
         </div>
      ),
   },
   {
      label: "Корзина",
      render: () => (
         <div className="py-5">
             <ProductList
               products={cart}
               isLoading={isLoading}
               isError={errors.cart.isError}
               errorMessage={errors.cart.message}
            />
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

const CustomerProfilePage: FC = observer(() => {
   const { customerStore } = useStores();

   const [errors, setErrors] = useState<Errors>({
      cart: { isError: false, message: "" },
      favourites: { isError: false, message: "" },
      deliveries: { isError: false, message: "" },
   });
   const [isLoading, setIsLoading] = useState(true);
   const searchParams = useSearchParams();
   const isEdit = searchParams.get("edit") === "true";



   useEffect(() => {
      const fetchData = async () => {
         setIsLoading(true);
         try {
            await customerStore.fetchCustomerFavourites();

            if (customerStore.favourites.length === 0) {
               setErrors((prev) => ({
                  ...prev,
                  favourites: {
                     isError: true,
                     message: "Нет избранных товаров",
                  },
               }));
            } else {
               setErrors((prev) => ({
                  ...prev,
                  favourites: { isError: false, message: "" },
               }));
            }
         } catch (error) {
            console.error("Ошибка при загрузке избранного", error);
            setErrors((prev) => ({
               ...prev,
               favourites: {
                  isError: true,
                  message: "Ошибка при загрузке избранного",
               },
            }));
         }

         try {
            await customerStore.fetchCustomerCart();

            if (customerStore.cart.length === 0) {
               setErrors((prev) => ({
                  ...prev,
                  cart: { isError: true, message: "Нет товаров в корзине" },
               }));
            } else {
               setErrors((prev) => ({
                  ...prev,
                  cart: { isError: false, message: "" },
               }));
            }
         } catch (error) {
            console.error("Ошибка при загрузке корзины", error);
            setErrors((prev) => ({
               ...prev,
               cart: { isError: true, message: "Ошибка при загрузке корзины" },
            }));
         }

         try {
      
            await customerStore.getOrders("uncompleted");

            if (customerStore.uncompletedOrders.length === 0) {
               setErrors((prev) => ({
                  ...prev,
                  deliveries: { isError: true, message: "Нет ближайших доставки" },
               }));
            } else {
               setErrors((prev) => ({
                  ...prev,
                  deliveries: { isError: false, message: "" },
               }));
            }
         } catch (error) {
            console.error("Ошибка при загрузке ближайших доставки", error);
            setErrors((prev) => ({
               ...prev,
               deliveries: { isError: true, message: "Ошибка при загрузке ближайших доставки" },
            }));
         }

         setIsLoading(false);
      };

      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useEffect(() => {
      if (customerStore.cart.length === 0) {
         setErrors((prev) => ({
            ...prev,
            cart: { isError: true, message: "Нет товаров в корзине" },
         }));
      } else {
         setErrors((prev) => ({
            ...prev,
            cart: { isError: false, message: "" },
         }));
      }
   }, [customerStore.cart.length]);

   useEffect(() => {
      if (customerStore.favourites.length === 0) {
         setErrors((prev) => ({
            ...prev,
            favourites: { isError: true, message: "Нет избранных товаров" },
         }));
      } else {
         setErrors((prev) => ({
            ...prev,
            favourites: { isError: false, message: "" },
         }));
      }
   }, [customerStore.favourites.length]);

   const tabItems = createTabItems(
      customerStore.uncompletedOrders,
      customerStore.cart,
      customerStore.favourites,
      isLoading,
      errors
   );

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
