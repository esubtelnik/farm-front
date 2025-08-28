"use client";
import { createContext, useContext } from "react";
import type { AuthContextType } from "@/context/AuthProvider";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthContextProvider");
  }
  return context;
};
