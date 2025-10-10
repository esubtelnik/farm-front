"use client";
import { FC, useEffect, useState } from "react";
import BasketListItem from "@/components/adminComponents/BasketListItem";
import { useStores } from "@/hooks/useStores";
import { IReadyBasket } from "@/types/entities/Product";
import Loader from "@/components/ui/Loader";

const BasketsFromAdminListPage: FC = () => {
   const [isLoading, setIsLoading] = useState(true);
   const [readyBaskets, setReadyBaskets] = useState<IReadyBasket[]>([]);
   const { adminStore } = useStores();

   const fetchReadyBaskets = async () => {
      setIsLoading(true);
      const res = await adminStore.getReadyBasketsFromAdmin();
      if (res.success) {
         setReadyBaskets(res.data || []);
         setIsLoading(false);
      }
   };

   useEffect(() => {
      fetchReadyBaskets();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <div className="flex flex-col gap-4 p-4">
         <div className="grid grid-cols-5 w-full items-center justify-items-center p-4 border-2 rounded-full border-main-gray sticky top-0 bg-white z-10">
            <p>Название</p>
            <p>Цена</p>
            <p>Размер наценки</p>
            <p>Изменить</p>
            <p>Удалить</p>
         </div>
         {isLoading ? (
            <Loader />
         ) : (
            <div className="flex flex-col gap-4 overflow-y-auto ">
               {readyBaskets.map((basket) => (
                  <BasketListItem
                     key={basket.id}
                     basket={basket}
                     refetch={fetchReadyBaskets}
                  />
               ))}
            </div>
         )}
      </div>
   );
};

export default BasketsFromAdminListPage;
