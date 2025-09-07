"use client";
import { useEffect, useState } from "react";
import ProductList from "@/components/mainComponents/lists/ProductList";
import CustomerInfo from "@/components/profileComponents/CustomerInfo";
import Tabs from "@/components/ui/Tabs";
import { useStores } from "@/hooks/useStores";
import { observer } from "mobx-react-lite";

type SectionError = {
   isError: boolean;
   message: string;
};

type Errors = {
   cart: SectionError;
   favourites: SectionError;
};

const CustomerCartPage = observer(() => {
   const { customerStore } = useStores();

   const [errors, setErrors] = useState<Errors>({
      cart: { isError: false, message: "" },
      favourites: { isError: false, message: "" },
   });
   const [isLoading, setIsLoading] = useState(true);

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

   const tabItems = [
      {
         label: "Корзина",
         render: () => (
            <div className="py-5">
               <ProductList
                  products={customerStore.cart}
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
                  products={customerStore.favourites}
                  isLoading={isLoading}
                  isError={errors.favourites.isError}
                  errorMessage={errors.favourites.message}
                />
            </div>
         ),
      },
   ];
   return (
      <div className="min-h-screen font-geist">
         <CustomerInfo isCart={true} />
         <Tabs tabs={tabItems} />
      </div>
   );
});

export default CustomerCartPage;
