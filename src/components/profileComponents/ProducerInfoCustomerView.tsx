"use client";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import Skeleton from "@/components/ui/Skeleton";
import { IProducer } from "@/types/entities/User";
import ReviewStars from "@/components/ui/ReviewStars";

interface ProducerInfoCustomerViewProps {
   producer: IProducer | null;
   isLoading: boolean;
}


const ProducerInfoCustomerView: FC<ProducerInfoCustomerViewProps> = observer(({ producer, isLoading }) => {
   

   return (
      <div className="flex p-8 gap-x-8 flex-1">
         {/* <img src={import.meta.env.VITE_API_URL + producer?.image} className="object-cover w-[400px] h-[300px]" /> */}
         <div className="flex flex-col gap-y-3 flex-1 min-h-0">
            {isLoading ? (
               <>
                  <Skeleton className="h-12 w-48" />
                  <Skeleton className="h-10 w-40" />
                  <Skeleton className="h-12 w-64" />
                  <Skeleton className="h-10 w-64" />
                  <Skeleton className="h-full w-full" />
               </>
            ) : (
               <>
                  <span className="text-main-green font-bold text-2xl">
                     {producer?.title ?? "Имя не указано"}
                  </span>
                  <span className="text-main-gray">
                     {producer?.category ?? "Категория не указана"}
                  </span>
                  <span className="flex items-center gap-x-2">
                     <ReviewStars rating={producer?.feedbackAv ?? 0} />
                     <span className="text-main-gray text-sm">Отзывы</span>
                  </span>
        
                  <span className="text-main-gray">
                     Адрес: {producer?.address ?? "Не указан"}
                  </span>
                  <span className="text-main-gray">
                     {producer?.description ?? "Описание не указано"}
                  </span>
               </>
            )}
         </div>
   
      </div>
   );
});

export default ProducerInfoCustomerView;
