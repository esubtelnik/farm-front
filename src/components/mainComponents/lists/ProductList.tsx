"use client";
import { FC, useEffect, useState, useCallback } from "react";
import { observer } from "mobx-react-lite";
import ProductItem from "../items/ProductItem";
import { IProductCard } from "../../../types/entities/Product";
import { useStores } from "@/hooks/useStores";
import { useAuthContext } from "@/context/AuthContext";
import { UserType } from "@/constants/UserTypeEnum";

interface ProductListProps {
   products: IProductCard[];
   isEditable?: boolean;
   isLoading?: boolean;
   isError?: boolean;
   errorMessage?: string;
}

const ProductList: FC<ProductListProps> = observer(
   ({
      products: initialProducts,
      isEditable = false,
      isLoading = false,
      isError = false,
      errorMessage = "",
   }) => {
      const { customerStore } = useStores();
      const { userType } = useAuthContext();
      const [syncedProducts, setSyncedProducts] =
         useState<IProductCard[]>(initialProducts);
      const [isInitialized, setIsInitialized] = useState(false);

      const syncProducts = useCallback(() => {
         if (userType !== UserType.CUSTOMER) {
            setSyncedProducts(initialProducts);
            return;
         }

         if (!isInitialized) {
            return;
         }

         const synced = customerStore.syncProductsWithUserData(initialProducts);

         setSyncedProducts(synced);
      }, [initialProducts, customerStore, userType, isInitialized]);

      useEffect(() => {
         const loadUserData = async () => {
            if (userType === UserType.CUSTOMER && !isInitialized) {
               try {
                  await customerStore.ensureUserDataLoaded();

                  setIsInitialized(true);
               // eslint-disable-next-line @typescript-eslint/no-unused-vars
               } catch (error) {
                  setSyncedProducts(initialProducts);
                  setIsInitialized(true);
               }
            } else if (userType !== UserType.CUSTOMER) {
               setSyncedProducts(initialProducts);
               setIsInitialized(true);
            }
         };

         loadUserData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [userType, customerStore, initialProducts]);

      useEffect(() => {
         if (isInitialized) {
            syncProducts();
         }
      }, [
         isInitialized,
         syncProducts,
         customerStore.cart.length,
         customerStore.favourites.length,
      ]);

      useEffect(() => {
         syncProducts();
      }, [initialProducts, syncProducts]);

      if (isLoading) {
         return (
            <div className="flex items-center justify-center h-[50vh]">
               <div className="text-main-gray">Загрузка...</div>
            </div>
         );
      }

      if (isError) {
         return (
            <div className="text-center text-main-gray">{errorMessage}</div>
         );
      }

      if (syncedProducts.length === 0) {
         return (
            <div className="flex justify-center items-center my-5 h-full">
               <span className="text-main-gray">Продукты не найдены</span>
            </div>
         );
      }

      return (
         <div className="grid lg:grid-cols-3 grid-cols-2 xl:gap-10 lg:gap-5 gap-4 md:py-10 py-5 md:px-8 px-4 place-items-center">
            {syncedProducts.map((product) => {
               return (
                  <ProductItem
                     key={product.id}
                     product={product}
                     isEditable={isEditable}
                  />
               );
            })}
         </div>
      );
   }
);

export default ProductList;
