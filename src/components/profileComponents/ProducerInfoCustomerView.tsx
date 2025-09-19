"use client";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import Skeleton from "@/components/ui/Skeleton";
import { IProducer } from "@/types/entities/User";
import ReviewStars from "@/components/ui/ReviewStars";
import Image from "next/image";
import Link from "next/link";
import routes from "@/constants/routes";

interface ProducerInfoCustomerViewProps {
   producer: IProducer;
   goToReviews: () => void;
   isLoading: boolean;
}

const ProducerInfoCustomerView: FC<ProducerInfoCustomerViewProps> = observer(
   ({ producer, isLoading, goToReviews }) => {
      return (
         <div className="flex flex-col md:flex-row p-8 md:gap-x-8 gap-y-4 flex-1">
            {producer.image ? (
               <div className="relative lg:w-[400px] md:w-[300px] w-full h-[300px]">
                  <Image
                     alt={producer.title ?? "avatar"}
                     fill
                     src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${producer.image}`}
                     className="object-cover rounded-md"
                  />
               </div>
            ) : (
               <Skeleton className="lg:w-[400px] md:w-[300px] w-full h-[300px] rounded-md" />
            )}
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
                        {producer.title ?? "Имя не указано"}
                     </span>
                     <span className="text-main-gray">
                        {producer.category
                           ? producer.category
                                .split(";")
                                .map((cat, index, array) => (
                                   <span key={index}>
                                      <Link
                                         href={routes.items.category(
                                            cat.trim()
                                         )}
                                         className="hover:text-main-green transition-all duration-200 cursor-pointer"
                                      >
                                         {cat.trim()}
                                      </Link>
                                      {index < array.length - 1 && " | "}
                                   </span>
                                ))
                           : "Категория не указана"}
                     </span>
                     <span className="flex items-center gap-x-2">
                        <ReviewStars rating={producer.feedbackAv ?? 0} />
                        <button
                           onClick={goToReviews}
                           className="text-main-gray text-sm cursor-pointer"
                        >
                           Отзывы
                        </button>
                     </span>

                     <span className="text-main-gray">
                        Адрес: {producer.address ?? "Не указан"}
                     </span>
                     <span className="text-main-gray">
                        {producer.description ?? "Описание не указано"}
                     </span>
                  </>
               )}
            </div>
         </div>
      );
   }
);

export default ProducerInfoCustomerView;
