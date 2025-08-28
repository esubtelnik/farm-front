import React, { createContext } from "react";
import customerStore from "@/stores/CustomerStore";
import producerStore from "@/stores/ProducerStore";
import courierStore from "@/stores/CourierStore";
import adminStore from "@/stores/AdminStore";


export const StoreContext = createContext({
   customerStore,
   producerStore,
   courierStore,
   adminStore,
});

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({
   children,
}) => (
   <StoreContext.Provider
      value={{ customerStore, producerStore, courierStore, adminStore }}
   >
      {children}
   </StoreContext.Provider>
);
