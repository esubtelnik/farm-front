"use client";
import { FC, useEffect, useState } from "react";
import { IProducerFromAdmin } from "@/types/entities/User";
import ProducerListItem from "@/components/adminComponents/ProducerListItem";
import { useStores } from "@/hooks/useStores";

const ProducerListPage: FC = () => {
   const [producers, setProducers] = useState<IProducerFromAdmin[]>([]);
   const { adminStore } = useStores();

   useEffect(() => {
      const fetchProducers = async () => {
         const res = await adminStore.getProducersFromAdmin();
         if (res.success) {
            setProducers(res.data || []);
         }
      };
      fetchProducers();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <div className="flex flex-col gap-4 p-4">
     
         {producers.map((producer) => (
            <ProducerListItem key={producer.id} producer={producer} />
         ))}
      </div>
   );
};

export default ProducerListPage;
