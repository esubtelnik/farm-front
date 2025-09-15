"use client";
import { FC } from "react";
import ProducerItem from "../items/ProducerItem";
import { IProducerCard } from "@/types/entities/User";

interface ProducerListProps {
   producers: IProducerCard[];
   isLoading?: boolean;
}

const ProducerList: FC<ProducerListProps> = ({ producers, isLoading = false }) => {
   if (producers.length === 0) {
      return <div className="flex justify-center items-center my-5 h-full">
         <span className="text-main-gray">Поставщики не найдены</span>
      </div>;
   }
   return (
      <div className="grid md:grid-cols-3 grid-cols-2 gap-5 md:px-5 px-4 place-items-center w-full">
         {isLoading ? (
            <div className="flex justify-center items-center h-full">
               <span>Loading...</span>
            </div>
         ) : (
            producers.map((producer) => <ProducerItem key={producer.id} producer={producer} />)
         )}
      </div>
   );
};

export default ProducerList;
