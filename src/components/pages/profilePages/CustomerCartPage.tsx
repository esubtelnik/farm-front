"use client";
import { useEffect, useState } from "react";
import ProductList from "@/components/mainComponents/lists/ProductList";
import CustomerInfo from "@/components/profileComponents/CustomerInfo";
import Tabs from "@/components/ui/Tabs";
import { useStores } from "@/hooks/useStores";
import { observer } from "mobx-react-lite";
import { IDisplayCard } from "@/types/entities/Display";
import Loader from "@/components/ui/Loader";

type SectionError = {
   isError: boolean;
   message: string;
};

type Errors = {
   cart: SectionError;
   favourites: SectionError;
};

const createTabItems = (
   cart: IDisplayCard[],
   favourites: IDisplayCard[],
   isLoading: boolean,
   errors: Errors
) => [
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
];

const CustomerCartPage = observer(() => {
   const { customerStore } = useStores();

   const [errors, setErrors] = useState<Errors>({
      cart: { isError: false, message: "" },
      favourites: { isError: false, message: "" },
   });
   const [isLoading, setIsLoading] = useState(true);
   const [isLoadingPayment, setIsLoadingPayment] = useState(false);

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
      customerStore.cart,
      customerStore.favourites,
      isLoading,
      errors
   );

   return (
      <>
         {" "}
         {isLoadingPayment ? (
            <div className="flex justify-center items-center py-20 w-full h-full">
               <Loader />
            </div>
         ) : (
            <div className="min-h-screen font-geist">
               <CustomerInfo
                  isCart={true}
                  setIsLoadingPayment={setIsLoadingPayment}
               />
               <Tabs tabs={tabItems} />
            </div>
         )}
      </>
   );
});

export default CustomerCartPage;
