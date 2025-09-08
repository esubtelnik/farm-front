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
               ? "w-full md:w-fit h-full flex md:gap-x-10 gap-x-2 md:p-4 p-2"
               : "md:max-w-[500px] max-w-64 md:max-h-[450px] max-h-[350px] flex flex-col p-8"
         } bg-white rounded-xl md:shadow-lg/20 shadow-sm/20 border border-main-gray/20 overflow-hidden cursor-pointer relative`}
      >
         <div className={`relative ${isSmall ? "md:w-[200px] md:h-[150px] w-[100px] h-[150px]" : "md:w-[400px] md:h-[300px] w-full h-[100px]"} overflow-hidden rounded-xl`}>
            <Image
               src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${producer.image}`}
               alt="Фермер"
               fill
               className="w-full h-full object-cover"
            />
         </div>

         <div
            className={`${
               isSmall ? "my-1" : "md:my-4"
            }  flex flex-col justify-between flex-grow`}
         >
            <div>
               <h2 className="text-main-green font-semibold md:font-bold lg:text-xl md:text-lg text-base 
                 leading-tight h-[3.6rem] md:h-[4.2rem] lg:h-[4.8rem]"
                  style={{
                     display: "-webkit-box",
                     WebkitLineClamp: 3,
                     WebkitBoxOrient: "vertical",
                     overflow: "hidden",
                     textOverflow: "ellipsis",
                  }}>
                  {producer.title ?? "Название не указано"}
               </h2>
               <div className="flex items-center gap-2 mb-4">
                  <ReviewStars rating={producer.feedbackAv} size="small" />
                  <span className="text-gray-500 text-sm">Отзывы</span>
               </div>
               <p className="text-sm text-black min-h-[18px]">
                  {producer.description}
               </p>
            </div>
            <div className="absolute md:static bottom-1 right-1  flex justify-end mt-4">
               <NextArrow route={`${routes.items.producer(producer.id)}`} />
            </div>
         </div>
      </div>
   );
};

export default ProducerItem;
