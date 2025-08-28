"use client";
import { FC } from "react";
import Image from "next/image";
import ReviewStars from "@/components/ui/ReviewStars";
import NextArrow from "@/components/ui/NextArrow";
import { IProducer, IProducerCard } from "@/types/entities/User";
import routes from "@/constants/routes";

interface ProducerItemProps {
   producer: IProducerCard | IProducer;
   isSmall?: boolean;
}

const ProducerItem: FC<ProducerItemProps> = ({ isSmall, producer }) => {
   return (
      <div
         className={`${
            isSmall
               ? "w-fit h-full flex gap-x-10 p-4"
               : "md:max-w-[500px] max-w-64 md:max-h-[450px] max-h-[300px] flex flex-col p-8"
         } bg-white rounded-xl md:shadow-lg/20 shadow-sm/20 border border-main-gray/20 overflow-hidden cursor-pointer`}
      >
         <div className={`${isSmall ? "w-[200px] h-[150px]" : "w-[400px] h-[300px]"} overflow-hidden rounded-xl`}>
            <Image
               src={producer.image ?? "/image.png"}
               alt="Фермер"
               width={1000}
               height={1000}
               className="w-full h-full object-cover"
            />
         </div>

         <div
            className={`${
               isSmall ? "my-1" : "my-4"
            }  flex flex-col justify-between flex-grow`}
         >
            <div>
               <h2 className="text-main-green font-bold text-lg mb-2">
                  {producer.title ?? "Название не указано"}
               </h2>
               <div className="flex items-center gap-2 mb-4">
                  <ReviewStars rating={producer.feedbackAv} />
                  <span className="text-gray-500 text-sm">Отзывы</span>
               </div>
               <p className="text-sm text-black min-h-[18px]">
                  {producer.description}
               </p>
            </div>
            <div className="flex justify-end mt-4">
               <NextArrow route={`${routes.items.producer(producer.id)}`} />
            </div>
         </div>
      </div>
   );
};

export default ProducerItem;
