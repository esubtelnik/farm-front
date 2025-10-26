"use client";

import { AuthContextProvider } from "@/context/AuthProvider";
import { ProductContextProvider } from "@/context/ProductContext";

export function Providers({
  children,
  initialUserType,
}: {
  children: React.ReactNode;
  initialUserType: string;
}) {
    console.log("Providers", initialUserType);
    console.trace("Providers trace");
  return (
    <AuthContextProvider initialUserType={initialUserType}>
    <ProductContextProvider>{children}</ProductContextProvider>

    </AuthContextProvider>
  );
}

{/* <ProductContextProvider>{children}</ProductContextProvider> */}