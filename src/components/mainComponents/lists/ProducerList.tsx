"use client";
import { FC } from "react";
import ProducerItem from "../items/ProducerItem";
import { IProducerCard } from "@/types/entities/User";

interface ProducerListProps {
   producers: IProducerCard[];
   isLoading?: boolean;
}

const ProducerList: FC<ProducerListProps> = ({ producers, isLoading = false }) => {
   return (
      <div className="grid md:grid-cols-3 grid-cols-2 gap-10 md:px-10 px-4 place-items-center">
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
